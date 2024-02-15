import { mergeApis, Zodios } from '@zodios/core';
import { instance } from './instance';
import { deliveriesApi } from './parts/deliveriesApi';
import { usersApi } from './parts/usersApi';

export const apis = mergeApis({
    '/deliveries': deliveriesApi,
    '/users': usersApi,
});

export const apiClient = new Zodios(apis, {
    axiosInstance: instance,
});

export * from './schemas/ClientSchema';
export * from './schemas/ContactSchema';
export * from './schemas/DeliverySchema';
export * from './schemas/OrderSchema';
export * from './schemas/UserSchema';
