import { Button, Divider } from '@nextui-org/react';
import { Delivery } from '@/shared/api';
import { SubwayStationWithIcon } from '@/shared/services/subway';
import { useTranslation } from 'react-i18next';
import { getDeliveryContents } from '../../lib/utils/getDeliveryContents';
import { getDeliveryPickupDateTime } from '../../lib/utils/getDeliveryPickupDateTime';
import {
    ADDRESS,
    BUTTON_MORE,
    LABEL_DATE,
    LABEL_DELIVERY_WITH_ID,
    LABEL_STORAGE,
    LABEL_SUBWAY,
    translationNS,
} from '../../config';
import { getDeliverySystemId } from '../../lib/utils/getDeliverySystemId';
import { getDeliveryAddress } from '../../lib/utils/getDeliveryAdress';
import { getDeliveryMetro } from '../../lib/utils/getDeliveryMetro';
import { getDeliveryId } from '../../lib/utils/getDeliveryId';

interface DeliveryMapCardProperties {
    delivery: Delivery;
    onPressDetailsPageLink?: (id: Delivery['id']) => void;
}

export const DeliveryMapBaloonCard: FunctionComponent<
    DeliveryMapCardProperties
> = ({ delivery, onPressDetailsPageLink }) => {
    const { t } = useTranslation(translationNS);
    const systemId = getDeliverySystemId(delivery);
    const id = getDeliveryId(delivery);
    const subway = getDeliveryMetro(delivery);
    const address = getDeliveryAddress(delivery);
    const contents = getDeliveryContents(delivery);
    const pickupDateTime = getDeliveryPickupDateTime(delivery, true, true);

    const onPressMore = (): void => {
        if (onPressDetailsPageLink) {
            onPressDetailsPageLink(systemId);
        }
    };

    return (
        <div className="relative flex w-[300px] flex-col gap-1 font-bold">
            <div className="!font-4xl font-bold">
                {t(LABEL_DELIVERY_WITH_ID, {
                    id: id.padStart(6, '0'),
                })}
            </div>
            <Divider className="my-1 invert" />
            <div>
                <div>{t(LABEL_STORAGE)}</div>
                <div>{contents}</div>
            </div>
            <div>
                <div>{t(LABEL_SUBWAY)}</div>
                <div>
                    <SubwayStationWithIcon value={subway} />
                </div>
            </div>
            <div>
                <div>{t(ADDRESS)}</div>
                <div>{address}</div>
            </div>
            <div>
                <div>{t(LABEL_DATE)}</div>
                <div>{pickupDateTime}</div>
            </div>
            <Divider className="my-1 invert" />
            <Button onPress={onPressMore} size="sm">
                {t(BUTTON_MORE)}
            </Button>
        </div>
    );
};
