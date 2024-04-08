import { useUnit } from 'effector-react';
import { Chip } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { $$isViewerDelivery } from '../../../../model';
import { LABEL_MY_DELIVERY, translationNS } from '../../../../config';

export const MyDeliveryChip: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const isMyDelivery = useUnit($$isViewerDelivery);
    return isMyDelivery ? (
        <Chip color="warning" size="sm">
            {t(LABEL_MY_DELIVERY)}
        </Chip>
    ) : null;
};
