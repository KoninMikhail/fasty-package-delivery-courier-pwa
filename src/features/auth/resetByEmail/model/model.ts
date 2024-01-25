import { combine, createEvent, createStore, Effect, sample } from 'effector';
import { modelFactory } from 'effector-factorio';

interface FactoryOptions {
    resetFx: Effect<{ login: string }, any>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const loginChanged = createEvent<string>();
    const submitPressed = createEvent();

    const $login = createStore('');
    const $form = combine({ login: $login });

    const $pending = options.resetFx.pending;

    $login.on(loginChanged, (previous, next) => next);

    sample({
        source: $form,
        clock: submitPressed,
        target: options.resetFx,
    });

    return {
        $login,
        $pending,
        loginChanged,
        submitPressed,
    };
});
