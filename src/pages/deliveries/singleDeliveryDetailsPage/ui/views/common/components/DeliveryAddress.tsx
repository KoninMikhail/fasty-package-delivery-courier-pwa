import { useUnit } from 'effector-react';
import { Link, Spacer } from '@nextui-org/react';
import { getDeliveryAddress } from '@/entities/delivery';
import { useTranslation } from 'react-i18next';
import {
    LABEL_MAPS_OPEN_IN_EXTERNAL_APP,
    translationNS,
} from '../../../../config';
import { $pageDeliveryDetails } from '../../../../model/stores';

import { generateYandexMapsLink } from '../../../../lib';

export const DeliveryAddress: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const delivery = useUnit($pageDeliveryDetails);
    const address = getDeliveryAddress(delivery);
    return (
        <div>
            <p>{address}</p>
            <Spacer y={0.5} />
            <Link
                href={generateYandexMapsLink(address)}
                as={Link}
                color="primary"
                size="sm"
            >
                {t(LABEL_MAPS_OPEN_IN_EXTERNAL_APP)}
            </Link>
        </div>
    );
};
