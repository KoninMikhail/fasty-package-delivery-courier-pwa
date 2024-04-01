import { createEvent, createStore } from 'effector';
import { getMyDeliveriesFx } from '@/entities/delivery';

const clearAllErrors = createEvent();

export const $error = createStore<Error[]>([])
    .on(getMyDeliveriesFx.failData, (state, error) => [...state, error])
    .reset(clearAllErrors);
export const $$hasError = $error.map((error) => error.length > 0);
