import { Button, Spacer } from '@nextui-org/react';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { IoCloudOfflineOutline } from 'react-icons/io5';
import {
    PAGE_ERROR_BUTTON_BACK,
    PAGE_NOT_FOUND_IN_CACHE_TITLE,
    translationNS,
} from '../../../../config';

const { RouteName } = sharedConfigRoutes;
const { DELIVERIES } = RouteName;

export const NotFoundOffline: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const navigate = useNavigate();

    const onPressBackButton = (): void => navigate(DELIVERIES);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-12 px-6">
            <Spacer y={8} />
            <IoCloudOfflineOutline className="text-9xl text-content1" />

            <header className="text-center">
                <h1 className="text-center text-xl font-bold">
                    {t(PAGE_NOT_FOUND_IN_CACHE_TITLE)}
                </h1>
            </header>

            <div className="flex flex-col gap-4">
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
