import { createStore } from 'effector';
import { Delivery } from '@/shared/api';

export const $deliveries = createStore<Delivery[]>([]);
export const $deliveriesWithDatesRange = createStore<Delivery[]>([]);
