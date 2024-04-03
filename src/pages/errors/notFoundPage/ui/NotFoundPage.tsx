import { Authorized } from '@/entities/viewer';
import { Button, Image, Spacer } from '@nextui-org/react';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { ERROR_MESSAGE, GO_TO_MAIN_PAGE_TEXT, translationNS } from '../config';

const { RouteName } = sharedConfigRoutes;
const { ROOT_PAGE } = RouteName;

export const NotFoundPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(translationNS);

    const onPressButton = (): void => {
        navigate(ROOT_PAGE, { replace: true });
    };

    return (
        <Authorized>
            <div className="h-dvh w-full">
                <div className="flex h-full w-full flex-col items-center justify-center">
                    <Image
                        src="/assets/images/not-found.png"
                        alt="404"
                        width={200}
                        height={200}
                    />
                    <Spacer y={8} />
                    <div className="px-4 text-center">
                        <h1 className="whitespace-pre-line text-2xl font-bold">
                            {t(ERROR_MESSAGE)}
                        </h1>
                    </div>
                    <Spacer y={8} />
                    <Button
                        color="primary"
                        variant="flat"
                        onPress={onPressButton}
                        startContent={<GoArrowLeft />}
                    >
                        {t(GO_TO_MAIN_PAGE_TEXT)}
                    </Button>
                </div>
            </div>
        </Authorized>
    );
};
