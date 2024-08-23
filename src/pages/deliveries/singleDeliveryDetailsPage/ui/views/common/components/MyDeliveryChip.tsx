import { useUnit } from 'effector-react';
import { Chip } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { isDeliveryAssignedToCourier } from '@/entities/delivery';
import { sessionModel } from '@/entities/viewer';
import { LABEL_MY_DELIVERY, translationNS } from '../../../../config';
import { $pageDeliveryDetails } from '../../../../model/stores';

export const MyDeliveryChip: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const delivery = useUnit($pageDeliveryDetails);
    const viewer = useUnit(sessionModel.$viewerProfileData);
    const isMyDelivery =
        delivery && viewer && isDeliveryAssignedToCourier(delivery, viewer);
    return isMyDelivery ? (
        <Chip color="warning" size="sm">
            {t(LABEL_MY_DELIVERY)}
        </Chip>
    ) : null;
};
