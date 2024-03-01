import { useNavigate } from 'react-router-dom';
import { instance } from '@/shared/api/instance';

import { sharedConfigRoutes } from '@/shared/config';

const { RouteName } = sharedConfigRoutes;
const { AUTH_PAGE } = RouteName;

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log('logoutWhen401');
            useNavigate()(AUTH_PAGE);
        }
        return Promise.reject(error);
    },
);
