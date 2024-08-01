import { Delivery } from '@/shared/api';

export const initialDelivery: Delivery = {
    id: '',
    car: false,
    client_id: 0,
    comment: '',
    contact_id: 0,
    contents: '',
    deleted: false,
    date: new Date(),
    express: false,
    manager_id: 0,
    state: 'created',
    time_end: new Date(),
    time_start: new Date(),
    weight: 0,
    address: {
        id: 0,
        client_id: 0,
        delivery_type: 'courier',
        region: null,
        city: null,
        metro: '',
        address: '',
        point_id: null,
        cdek_type: null,
        default: false,
        deleted: false,
        longitude: null,
        latitude: null,
    },
    created_at: new Date(),
};
