import { createGate } from "effector-react";
import { createEvent, createStore } from "effector";

export const AppInitGate = createGate();
export const $isAppStarted = createStore<boolean>(false).on(AppInitGate.open, () => true);
