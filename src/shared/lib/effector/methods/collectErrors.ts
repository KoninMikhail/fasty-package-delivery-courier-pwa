import { createEvent, createStore, Effect, sample, Unit } from "effector";

interface Options {
  effects: Effect<any, any, any> | Effect<any, any, any>[];
  reset?: Unit<any> | Unit<any>[];
}

export const collectEffectErrors = ({ effects, reset }: Options) => {
  const addError = createEvent<Error>();
  const clearErrors = reset ?? createEvent();

  const $errors = createStore<Error[]>([]).on(addError, (state, payload) => {
    return [...state, payload];
  }).reset(Array.isArray(clearErrors) ? clearErrors : [clearErrors]);

  if (Array.isArray(effects)) {
    effects.forEach(effect => {
      sample({
        clock: effect.failData,
        target: addError
      });
    });
  } else {
    sample({
      clock: effects.failData,
      target: addError
    });
  }

  return {
    $errors
  };
};