import { Button, ButtonProps } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { IoExitOutline } from 'react-icons/io5';
import { $pending, logout } from '../model';
import { translationNS } from '../config';

const BUTTON_TEXT_KEY = 'button.text';

export const LogoutButton: FunctionComponent<
    Pick<ButtonProps, 'fullWidth'>
> = ({ fullWidth }) => {
    const { t } = useTranslation(translationNS);
    const logoutEvent = useUnit(logout);
    const pending = useUnit($pending);

    const onPressLogout = (): void => {
        logoutEvent();
    };

    return (
        <Button
            isLoading={pending}
            fullWidth={fullWidth}
            onPress={onPressLogout}
            startContent={<IoExitOutline />}
        >
            {t(BUTTON_TEXT_KEY)}
        </Button>
    );
};
