import { createI18n } from 'vue-i18n';
import de from './locales/de/index'
import en from './locales/en/index'

export const createI18nInstance = (createI18n, savedLocale = localStorage.getItem('lang') || 'de', messages) => {
    return createI18n({
        locale: savedLocale,
        fallbackLocale: savedLocale,
        messages,
    });
};
const savedLocale = localStorage.getItem('lang') || 'de';
export const i18n = createI18n({
    locale: savedLocale,
    fallbackLocale: savedLocale,
    messages: { en, de },
});

// Shared function to change language
export const changeLanguage = (i18n, lang) => {
    i18n.global.locale = lang;
    localStorage.setItem('lang', lang);
};

// Shared Vue Query client configuration
export const createQueryClient = (QueryClient) => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 1000 * 60 * 5,
                cacheTime: 1000 * 60 * 10,
                retry: 2,
            },
        },
    });
};

// Shared Toast options
export const toastOptions = {
    position: 'top-right',
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: 'button',
    icon: true,
    rtl: false,
    transition: 'Vue-Toastification__bounce',
    maxToasts: 20,
    newestOnTop: true,
};