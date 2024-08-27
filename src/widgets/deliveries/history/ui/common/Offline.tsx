import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import {
    LABEL_OFFLINE,
    translationNS,
} from '@/widgets/deliveries/market/config';
import { RiWifiOffLine } from 'react-icons/ri';

export const Offline: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="block p-4">
            <div className="flex h-56 w-full flex-col items-center justify-center gap-4 pb-24">
                <RiWifiOffLine className="text-5xl text-content3" />
                <div className="text-content3">{t(LABEL_OFFLINE)}</div>
            </div>
        </div>
    );
};
