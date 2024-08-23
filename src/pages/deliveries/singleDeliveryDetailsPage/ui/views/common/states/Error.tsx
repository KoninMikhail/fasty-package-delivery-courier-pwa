import { Button, Spacer } from '@nextui-org/react';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { TbAlertSquare, TbReload } from 'react-icons/tb';
import { useUnit } from 'effector-react/compat';
import { useTranslation } from 'react-i18next';
import { $isOnline } from '../../../../model/model';
import {
    PAGE_ERROR_BUTTON_BACK,
    PAGE_ERROR_BUTTON_RELOAD,
    PAGE_ERROR_MESSAGE,
    PAGE_ERROR_TITLE,
    translationNS,
} from '../../../../config';

const { RouteName } = sharedConfigRoutes;
const { DELIVERIES } = RouteName;

export const Error: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const navigate = useNavigate();
    const isOnline = useUnit($isOnline);

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const onPressRetryButton = (): void => window.location.reload();
    const onPressBackButton = (): void => navigate(DELIVERIES);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-12 px-6">
            <Spacer y={8} />
            <TbAlertSquare className="text-9xl text-content1" />

            <header className="text-center">
                <h1 className="text-center text-xl font-bold">
                    {t(PAGE_ERROR_TITLE)}
                </h1>
                <p>{t(PAGE_ERROR_MESSAGE)}</p>
            </header>

            <div className="flex flex-col gap-4">
                <Button
                    variant="bordered"
                    onPress={onPressRetryButton}
                    startContent={<TbReload />}
                    isDisabled={!isOnline}
                >
                    {t(PAGE_ERROR_BUTTON_RELOAD)}
                </Button>
                <Button
                    color="primary"
                    onPress={onPressBackButton}
                    startContent={<GoArrowLeft />}
                >
                    {t(PAGE_ERROR_BUTTON_BACK)}
                </Button>
            </div>
        </div>
    );
};
