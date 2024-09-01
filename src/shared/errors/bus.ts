import { createEvent, createStore } from 'effector';
import axios from 'axios';
import httpStatus from 'http-status';

/**
 * Event to add an error to the error store.
 * @event
 */
export const addError = createEvent<Error>();

/**
 * Event to clear network errors.
 * @event
 */
export const clearNetworkErrors = createEvent();

/**
 * Event to clear validation errors.
 * @event
 */
export const clearValidationErrors = createEvent();

/**
 * Event to clear all errors.
 * @event
 */
export const clearAllErrors = createEvent();

/**
 * Store to hold the list of errors.
 * @store
 */
export const $errors = createStore<Error[]>([])
    .on(addError, (state, error) => [...state, error]) // Adds a new error to the state.
    .on(clearNetworkErrors, (state) =>
        state.filter((error) => !axios.isAxiosError(error)),
    ) // Clears network errors.
    .reset(clearAllErrors); // Resets the state when clearAllErrors event is triggered.

/**
 * Derived store to check if there are any errors.
 * @store
 */
export const $$hasErrors = $errors.map((errors) => errors.length > 0);

/**
 * Derived store to check if there are any authentication errors.
 * @store
 */
export const $$hasAuthErrors = $errors.map((errors) =>
    errors.some((error) => {
        if (axios.isAxiosError(error) && !!error.response) {
            return error?.response.status === httpStatus.UNAUTHORIZED;
        }
        return false;
    }),
);

/**
 * Derived store to check if there are any critical errors.
 * @store
 */
export const $$hasCriticalErrors = $errors.map((errors) => {
    const criticalErrorCodes = new Set([
        httpStatus.INTERNAL_SERVER_ERROR,
        httpStatus.BAD_REQUEST,
        httpStatus.BAD_GATEWAY,
    ]) as Set<number>;
    return errors.some((error) => {
        if (axios.isAxiosError(error)) {
            return criticalErrorCodes.has(error.response?.status ?? 0);
        }
        return false;
    });
});
