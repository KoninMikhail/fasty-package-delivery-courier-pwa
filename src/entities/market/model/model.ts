import { createStore } from 'effector';
import { Delivery } from '@/shared/api';

export const $upcommingDeliveries = createStore<Delivery[]>([]);
export const $deliveriesWithDatesRange = createStore<Delivery[]>([]);
