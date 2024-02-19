import { modelView } from 'effector-factorio';
import { useUnit } from 'effector-react';
import { Button, ButtonProps } from '@nextui-org/react';
import { sharedUiComponents } from '@/shared/ui';
import { factory } from './model';

const { PasswordField } = sharedUiComponents;

const Password: FunctionComponent = () => {
    const model = factory.useModel();
    const [value, onChange] = useUnit([model.$password, model.passwordChanged]);

    return (
        <PasswordField
            autoComplete="off"
            value={value}
            variant="bordered"
            label="Придумайте пароль"
            placeholder="Введите ваш пароль"
            onValueChange={onChange}
        />
    );
};

const PasswordAgain: FunctionComponent = () => {
    const model = factory.useModel();
    const [value, onChange] = useUnit([
        model.$passwordRepeat,
        model.passwordRepeatChanged,
    ]);
    return (
        <PasswordField
            autoComplete="off"
            value={value}
            variant="bordered"
            label="Повторите пароль"
            placeholder="Введите ваш пароль"
            onValueChange={onChange}
        />
    );
};

const ResetPasswordButton: FunctionComponent<Omit<ButtonProps, 'onPress'>> = (
    properties,
) => {
    const model = factory.useModel();
    const onPress = useUnit(model.submitPressed);
    return (
        <Button color="primary" onPress={onPress} {...properties}>
            Change password
        </Button>
    );
};

export const Form = modelView(factory, () => {
    return (
        <div className="flex flex-col gap-4">
            <Password />
            <PasswordAgain />
            <ResetPasswordButton />
        </div>
    );
});
