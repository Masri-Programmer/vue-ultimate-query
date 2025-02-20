import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toastification";
import { i18n } from "./config.js";

const toast = useToast();

// Allow users to provide their own Axios instance
let axiosInstance = axios.create({
    headers: { "Content-Type": "application/json" },
});

// Function to set user-provided Axios instance
export const setAxiosInstance = (instance) => {
    axiosInstance = instance;
};

// Handle API Errors with Vue Toastification
const handleError = (error, resource, action = "error") => {
    const errorMessage =
        error.response?.data?.message ||
        i18n.global.t(`validation.api.${action}.error`, { resource });

    if (error.response?.data?.errors) {
        Object.values(error.response.data.errors)
            .flat()
            .forEach((err) => toast.error(err));
    } else {
        toast.error(errorMessage);
    }
};

// Handle Success Messages
const handleSuccess = (resource, action) => {
    toast.success(i18n.global.t(`validation.api.${action}.success`, { resource }));
};

// API Request Wrapper
export const apiRequest = async (method, url, data = {}, params = {}) => {
    try {
        const response = await axiosInstance({ method, url, data, params });
        return response.data;
    } catch (error) {
        handleError(error, url.split("/").pop(), method);
        throw error;
    }
};

// Create API Resource Functions
export const createApiResource = (resource) => ({
    get: (params = {}) => apiRequest("get", `/${resource}`, {}, params),
    getById: (id) => apiRequest("get", `/${resource}/${id}`),
    store: (data) => apiRequest("post", `/${resource}`, data),
    update: (id, data) => apiRequest("put", `/${resource}/${id}`, data),
    delete: async (id) => {
        const confirmed = window.confirm(
            i18n.global.t("validation.api.delete.confirm")
        );
        if (!confirmed) {
            toast.info(i18n.global.t("validation.api.delete.cancel"));
            throw new Error(i18n.global.t("validation.api.delete.cancel"));
        }
        return apiRequest("delete", `/${resource}/${id}`);
    },
});

// Vue Query Hooks for API Calls
export const apiQuery = (resource) => {
    const api = createApiResource(resource);
    const queryClient = useQueryClient();

    return {
        useGet: (params) =>
            useQuery({
                queryKey: [resource, params],
                queryFn: () => api.get(params?.value),
                keepPreviousData: true,
                staleTime: 1000 * 60 * 5,
                refetchOnReconnect: "always",
                refetchOnWindowFocus: "always",
            }),

        useGetById: (id) =>
            useQuery({
                queryKey: [resource, id],
                queryFn: () => api.getById(id),
                cacheTime: 0,
                staleTime: 0,
            }),

        useStore: () =>
            useMutation({
                mutationFn: (params) => api.store(params),
                onSuccess: () => {
                    handleSuccess(resource, "post");
                    queryClient.invalidateQueries([resource]);
                },
                onError: (error) => handleError(error, resource, "post"),
            }),

        useDelete: () =>
            useMutation({
                mutationFn: (id) => api.delete(id),
                onSuccess: () => {
                    handleSuccess(resource, "delete");
                    queryClient.invalidateQueries([resource]);
                },
                onError: (error) => handleError(error, resource, "delete"),
            }),

        useUpdate: () =>
            useMutation({
                mutationFn: ({ id, data }) => api.update(id, data),
                onSuccess: () => {
                    handleSuccess(resource, "put");
                    queryClient.invalidateQueries([resource]);
                },
                onError: (error) => handleError(error, resource, "put"),
            }),
    };
};
