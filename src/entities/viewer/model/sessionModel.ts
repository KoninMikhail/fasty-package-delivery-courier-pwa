import { createStore } from 'effector';
import { createGate } from 'effector-react';

export const AuthGate = createGate();

export const $session = createStore<Session | null>(null);
export const $isAuthorized = $session.map((session) => session !== null);
