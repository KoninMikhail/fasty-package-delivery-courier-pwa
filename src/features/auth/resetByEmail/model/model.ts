import { combine, createEvent, createStore, Effect, sample } from 'effector';
import { modelFactory } from 'effector-factorio';
import { Email } from '@/shared/lib/type-guards/isEmail';
import isEmail from '@/shared/lib/type-guards/isEmail/isEmail';

interface FactoryOptions {
    resetFx: Effect<{ login: Email }, any>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const loginChanged = createEvent<string>();
    const submitPressed = createEvent();
    const reset = createEvent();

    const $login = createStore('');
    const $form = combine({ login: $login });

    const $allowedSend = createStore<boolean>(false);
    const $pending = options.resetFx.pending;
    const $done = createStore<boolean>(false);
    const $fail = createStore<boolean>(false);

    $login.on(loginChanged, (previous, next) => next).on(reset, () => '');

    sample({
        source: $login,
        clock: loginChanged,
        fn: (login) => {
            const nonEmpty = login.length > 0;
            const validEmail = isEmail(login);
            return !!(nonEmpty && validEmail);
        },
        target: $allowedSend,
    });

    sample({
        source: $form,
        clock: submitPressed,
        target: options.resetFx,
    });

    sample({
        clock: options.resetFx.done,
        fn: () => true,
        target: $done,
    });

    sample({
        clock: options.resetFx.fail,
        fn: () => true,
        target: $fail,
    });

    return {
        $login,
        $pending,
        $allowedSend,
        loginChanged,
        submitPressed,
        reset,
    };
});
