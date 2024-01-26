import { modelFactory } from 'effector-factorio';
import type { Effect } from 'effector';
import { combine, sample, createStore, createEvent } from 'effector';
import isEmail from '@/shared/lib/type-guards/isEmail/isEmail';
import { isPassword } from '@/shared/lib/type-guards/isPassword';

interface FactoryOptions {
    registerFx: Effect<{ login: string; password: string }, Error>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    /**
     * Form events
     */
    const loginChanged = createEvent<string>();
    const passwordChanged = createEvent<string>();
    const submitPressed = createEvent();
    const resetFormState = createEvent();

    /**
     * Form Data
     */
    const $login = createStore('')
        .on(loginChanged, (previous, next) => next)
        .reset(resetFormState, options.registerFx.done);
    const $password = createStore('')
        .on(passwordChanged, (_, nextPassword) => nextPassword)
        .reset(resetFormState, options.registerFx.done);

    const $form = combine({ login: $login, password: $password });

    /**
     * Form state
     */
    const $allowSubmit = $form.map(({ login, password }) => {
        console.log(isEmail(login));
        console.log(isPassword(password));
        return isEmail(login) && isPassword(password);
    });
    const $pending = options.registerFx.pending;
    const $done = createStore<boolean>(false)
        .on(options.registerFx.done, () => true)
        .reset(resetFormState, options.registerFx.fail);

    const $fail = createStore<boolean>(false)
        .on(options.registerFx.fail, () => true)
        .reset(resetFormState, options.registerFx.done);
    const $failMessage = createStore<string>('')
        .on(options.registerFx.failData, (state, error) => error.message)
        .reset(resetFormState)
        .reset(options.registerFx.done, resetFormState);

    /**
     * effects
     */
    sample({
        source: $form,
        clock: submitPressed,
        target: options.registerFx,
    });

    return {
        $login,
        $password,
        $allowSubmit,
        $pending,
        $done,
        $fail,
        $failMessage,
        loginChanged,
        passwordChanged,
        submitPressed,
        resetFormState,
    };
});
