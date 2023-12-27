import { modelFactory } from 'effector-factorio';
import type { Effect } from 'effector';
import { combine, sample, createStore, createEvent } from 'effector';

interface FactoryOptions {
    registerFx: Effect<{ name: string; password: string }, any>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const loginChanged = createEvent<string>();
    const passwordChanged = createEvent<string>();
    const submitPressed = createEvent();

    const $login = createStore('');
    const $password = createStore('');

    const $form = combine({ login: $login, password: $password });

    const $disabled = options.registerFx.pending;

    $login.on(loginChanged, (previous, next) => next);
    $password.on(passwordChanged, (previous, next) => next);

    sample({
        source: $form,
        clock: submitPressed,
        target: options.registerFx,
    });

    return {
        $login,
        $password,
        $disabled,
        loginChanged,
        passwordChanged,
        submitPressed,
    };
});
