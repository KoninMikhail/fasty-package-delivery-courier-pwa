import { User } from '@/shared/api';
import { createEvent, createStore, Effect, StoreWritable } from 'effector';
import { modelFactory } from 'effector-factorio';

interface FactoryOptions {
    targetUser: StoreWritable<User>;
    updateUserFx: Effect<User, void, Error>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const { targetUser, updateUserFx } = options;
    const changePassword = updateUserFx;

    const passwordChanged = createEvent<string>();
    const passwordRepeatChanged = createEvent<string>();
    const submitPressed = createEvent<void>();

    /**
     * Form Data
     */
    const $password = createStore('');
    const $passwordRepeat = createStore('');
    $password.on(passwordChanged, (_, password) => password);
    $passwordRepeat.on(passwordRepeatChanged, (_, password) => password);

    /**
     * Form state
     */

    return {
        changePassword,
        targetUser,
        $password,
        $passwordRepeat,
        passwordChanged,
        passwordRepeatChanged,
        submitPressed,
    };
});
