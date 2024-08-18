import { API_BASE_URL, API_VERSION } from '@/shared/api/instance';

export const transformPathToUrl = (path: string): string => {
    if (path.startsWith('/')) {
        return `${API_BASE_URL}/${API_VERSION}${path}`;
    }
    return path;
};
