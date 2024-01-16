import { useUnit } from 'effector-react';
import { modelView } from 'effector-factorio';

import { factory } from './model';
import type { ChangeEvent } from 'react';
import { useKeyPress } from '@/shared/lib';

const KEYBOARD_SEND_KEY = ['Enter'];

const LoginField: FunctionComponent = () => {
    const model = factory.useModel();
    const login = useUnit(model.$login);

    const onStateChangeHandler = (
        event_: ChangeEvent<HTMLInputElement>,
    ): void => {
        model.loginChanged(event_.target.value);
    };

    return (
        <input
            value={login}
            placeholder="Login"
            onChange={onStateChangeHandler}
        />
    );
};

const PasswordField: FunctionComponent = () => {
    const model = factory.useModel();
    const password = useUnit(model.$password);

    const onStateChangeHandler = (
        event_: ChangeEvent<HTMLInputElement>,
    ): void => {
        model.passwordChanged(event_.target.value);
    };

    return (
        <input
            value={password}
            placeholder="Password"
            onChange={onStateChangeHandler}
        />
    );
};

const RegisterButton: FunctionComponent = () => {
    const model = factory.useModel();
    const disabled = useUnit(model.$disabled);

    const onPressSubmitHandler = (): void => {
        model.submitPressed();
    };

    useKeyPress(KEYBOARD_SEND_KEY, onPressSubmitHandler);

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onPressSubmitHandler}
        >
            Save
        </button>
    );
};

export const Form = modelView(factory, () => {
    return (
        <div className="flex flex-col gap-2">
            <LoginField />
            <PasswordField />
            <RegisterButton />
        </div>
    );
});
