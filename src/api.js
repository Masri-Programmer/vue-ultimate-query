import axios from 'axios';
import { useStorage, useSessionStorage } from "@vueuse/core";
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { useToast } from "vue-toastification";
import { i18n } from "./config.js";

const toast = useToast();
const userStorage = useStorage("user", {});
const userSessionStorage = useSessionStorage("user", {});
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const apiRequest = async (method, url, data = {}, params = {}) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${userSessionStorage.value.token || userStorage.value.token || ''}`;

    const resource = url.split('/').pop();
    const methodToMessage = {
        get: i18n.global.t("validation.api.get.error", { resource }),
        post: i18n.global.t("validation.api.post.error", { resource }),
        put: i18n.global.t("validation.api.put.error", { resource }),
        delete: i18n.global.t("validation.api.delete.error", { resource })
    };

    try {
        const response = await axios({ method, url, data, params });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || methodToMessage[method] || i18n.global.t("validation.api.error"));
    }
};

const handleError = (error, resource, action = 'error') => {
    if (error.errors) {
        Object.values(error?.errors).flat().forEach(err => toast.error(err));
    } else {
        toast.error(error?.message || i18n.global.t(`api.${action}.error`, { resource }));
    }
};

const handleSuccess = (resource, action) => {
    toast.success(i18n.global.t(`validation.api.${action}.success`, { resource }));
};

export const createApiResource = (resource) => ({
    get: (params = {}) => apiRequest('get', `/${resource}`, {}, params),
    getById: (id) => apiRequest('get', `/${resource}/${id}`),
    store: (data) => apiRequest('post', `/${resource}`, data),
    update: (id, data) => apiRequest('put', `/${resource}/${id}`, data),
    delete: (id) => apiRequest('delete', `/${resource}/${id}`)
});

export const apiQuery = (resource) => {
    const api = createApiResource(resource);
    const queryClient = useQueryClient();

    return {
        useGet: (params) => useQuery({
            queryKey: [resource, params],
            queryFn: () => api.get(params?.value),
            keepPreviousData: true,
            staleTime: 1000 * 60 * 5,
            refetchOnReconnect: "always",
            refetchOnWindowFocus: "always"
        }),

        useGetById: (id) => useQuery({
            queryKey: [resource, id],
            queryFn: () => api.getById(id),
            cacheTime: 0,
            staleTime: 0,
        }),

        useStore: () => useMutation({
            mutationFn: (params) => api.store(params),
            onSuccess: () => {
                handleSuccess(resource, 'post');
                queryClient.invalidateQueries([resource]);
            },
            onError: (error) => handleError(error, resource, 'post'),
        }),

        useDelete: () => useMutation({
            mutationFn: (id) => api.delete(id),
            onSuccess: () => {
                const confirmed = window.confirm(i18n.global.t("validation.api.delete.confirm"));
                if (!confirmed) throw new Error(i18n.global.t("validation.api.delete.cancel"));
                handleSuccess(resource, 'delete');
                queryClient.invalidateQueries([resource]);
            },
            onError: (error) => handleError(error, resource, 'delete'),
        }),

        useUpdate: () => useMutation({
            mutationFn: ({ id, data }) => api.update(id, data),
            onSuccess: () => {
                handleSuccess(resource, 'put');
                queryClient.invalidateQueries([resource]);
            },
            onError: (error) => handleError(error, resource, 'put'),
        }),
    };
};
