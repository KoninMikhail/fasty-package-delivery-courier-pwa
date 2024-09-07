import { ChangePassword } from '@/features/viewer/changePassword';
import { useUnit } from 'effector-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Spacer } from '@nextui-org/react';
import { RiWifiOffLine } from 'react-icons/ri';
import { LABEL_NOT_AVAILABLE_OFFLINE, translationNS } from '../config';
import { $isOffline, changePasswordModel } from '../model/model';

const BlockWhenOffline: FunctionComponent<{
    children: ReactNode;
}> = ({ children }) => {
    const { t } = useTranslation(translationNS);
    const isOffline = useUnit($isOffline);

    return isOffline ? (
        <div className="relative block">
            <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-background opacity-85">
                <div className="text-center">
                    <Spacer y={4} />
                    <RiWifiOffLine className="mx-auto text-5xl text-danger" />
                    <Spacer y={4} />
                    <span className="text-danger">
                        {t(LABEL_NOT_AVAILABLE_OFFLINE)}
                    </span>
                </div>
            </div>
            {children}
        </div>
    ) : (
        children
    );
};

export const SelectPassword: FunctionComponent = () => {
    return (
        <BlockWhenOffline>
            <div className="relative flex flex-col gap-4">
                <ChangePassword.Form model={changePasswordModel} />
            </div>
        </BlockWhenOffline>
    );
};
