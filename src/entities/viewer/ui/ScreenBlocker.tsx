import { Button, Spacer } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { IoReloadSharp } from 'react-icons/io5';
import clsx from 'clsx';
import { $$isDesktop, $initSessionComplete } from '../model/session';
import {
    ERROR_SCREEN_RELOAD_BUTTON_TEXT,
    ERROR_SCREEN_HEADING,
    translationNS,
    ERROR_SCREEN_DESCRIPTION,
} from '../config';

const ReloadButton: FunctionComponent<{
    onClick: () => void;
    buttonText: string;
}> = ({ onClick, buttonText }) => (
    <Button onPress={onClick} color="primary">
        <IoReloadSharp />
        {buttonText}
    </Button>
);

const ErrorContent: FunctionComponent<{
    heading: string;
    description: string;
    onClick: () => void;
    buttonText: string;
}> = ({ heading, description, onClick, buttonText }) => (
    <div className="flex flex-col gap-4 text-center">
        <h3 className="text-3xl font-bold">{heading}</h3>
        <span>{description}</span>
        <Spacer y={6} />
        <ReloadButton onClick={onClick} buttonText={buttonText} />
    </div>
);

export const ScreenBlocker: FunctionComponent = () => {
    const { isDesktop, isInit } = useUnit({
        isDesktop: $$isDesktop,
        isInit: $initSessionComplete,
    });
    const { t } = useTranslation(translationNS);

    const onClick = () => window.location.reload();

    if (!isInit) return null;

    return (
        <div
            className={clsx(
                'fixed z-[9999] h-screen w-screen items-center justify-center bg-background',
                {
                    'flex lg:hidden': isDesktop,
                    'hidden xl:flex': !isDesktop,
                },
            )}
        >
            <div
                className={clsx('text-center', {
                    'w-2/3': isDesktop,
                    'w-1/3': !isDesktop,
                })}
            >
                <ErrorContent
                    heading={t(ERROR_SCREEN_HEADING)}
                    description={t(ERROR_SCREEN_DESCRIPTION)}
                    onClick={onClick}
                    buttonText={t(ERROR_SCREEN_RELOAD_BUTTON_TEXT)}
                />
            </div>
        </div>
    );
};
