import { DeliveryStates } from '@/shared/api';

type Statuses = {
    id: DeliveryStates;
    label: string;
    message?: boolean;
    requireMessage?: boolean;
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
        id: 'done',
        label: 'label.status.done',
        message: true,
    },
    {
        id: 'canceled',
        label: 'label.status.canceled',
        message: true,
        requireMessage: true,
    },
];
