import { createEvent, createStore, Effect, sample } from 'effector';
import { modelFactory } from 'effector-factorio';
import { Email } from '@/shared/lib/type-guards/isEmail';
import isEmail from '@/shared/lib/type-guards/isEmail/isEmail';
import { ResetUserPasswordRequest } from '@/shared/api/couriersApi';

interface FactoryOptions {
    resetFx: Effect<ResetUserPasswordRequest, void, Error>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const loginChanged = createEvent<string>();
    const submitPressed = createEvent();
    const resetFormState = createEvent();

    const $login = createStore<string>('')
        .on(loginChanged, (_, next) => next)
        .reset(resetFormState, options.resetFx.done);

    const $allowedSend = $login.map(
        (login) => login.length > 0 && isEmail(login),
    );
    const $pending = options.resetFx.pending;
    const $done = createStore<boolean>(false)
        .on(options.resetFx.done, () => true)
        .reset(resetFormState, options.resetFx.fail);

    const $fail = createStore<boolean>(false)
        .on(options.resetFx.fail, () => true)
        .reset(resetFormState, options.resetFx.done);
    const $failMessage = createStore<string>('')
        .on(options.resetFx.failData, (state, error) => error.message)
        .reset(resetFormState);

    // Create a form object that can be updated with a single handler
    const $form = createStore<{ login: Email }>({ login: '' }).on(
        $login,
        (state, login) => ({ ...state, login }),
    );

    // Only trigger the effect when allowed to send
    sample({
        source: $form,
        clock: submitPressed.filter({ fn: () => $allowedSend.getState() }),
        target: options.resetFx,
    });

    return {
        $login,
        $pending,
        $done,
        $fail,
        $failMessage,
        $allowedSend,
        loginChanged,
        submitPressed,
        resetFormState,
    };
});
