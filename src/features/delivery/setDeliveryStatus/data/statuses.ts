import { DeliveryStates } from '@/shared/api';

type Statuses = {
    id: DeliveryStates;
    label: string;
}[];

export const statuses: Statuses = [
    {
        id: 'created',
        label: 'label.status.created',
    },
    {
        id: 'delivering',
        label: 'label.status.delivering',
    },
    {
        id: 'canceled',
        label: 'label.status.canceled',
    },
    {
        id: 'done',
        label: 'label.status.done',
    },
];
