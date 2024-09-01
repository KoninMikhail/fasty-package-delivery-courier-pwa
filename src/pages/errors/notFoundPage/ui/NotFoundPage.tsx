import { Authorized } from '@/entities/viewer';
import { Button, Spacer } from '@nextui-org/react';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { sharedConfigConstants, sharedConfigRoutes } from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { useGate } from 'effector-react';
import { useDocumentTitle } from 'usehooks-ts';
import { TbError404 } from 'react-icons/tb';
import {
    ERROR_MESSAGE,
    GO_TO_MAIN_PAGE_TEXT,
    PAGE_TITLE,
    translationNS,
} from '../config';
import { NotFoundGate } from '../model/model';

const { APP_NAME, APP_DESCRIPTION } = sharedConfigConstants;

const { RouteName } = sharedConfigRoutes;
const { ROOT_PAGE } = RouteName;

export const NotFoundPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation(translationNS);
    const appLanguage = i18n.language as keyof typeof APP_DESCRIPTION;

    const onPressButton = (): void => {
        navigate(ROOT_PAGE, { replace: true });
    };

    useDocumentTitle(
        t(PAGE_TITLE, {
            appName: APP_NAME,
            appDescription: APP_DESCRIPTION[appLanguage],
        }),
    );

    useGate(NotFoundGate);

    return (
        <Authorized>
            <div className="h-dvh w-full">
                <div className="flex h-full w-full flex-col items-center justify-center">
                    <TbError404 className="text-9xl" />
                    <Spacer y={4} />
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
