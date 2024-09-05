import { UpcomingDelivery } from '@/shared/api';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
    Spacer,
} from '@nextui-org/react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
// eslint-disable-next-line boundaries/element-types
import { SubwayStationWithIcon } from '@/entities/route/@subway';

import {
    BUTTON_MORE,
    LABEL_ADDRESS,
    LABEL_ID,
    LABEL_STORAGE,
    LABEL_WEIGHT,
    translationNS,
    TYPE_EXPRESS,
    TYPE_ON_CAR,
    TYPE_ON_FOOT,
    WEIGHT_VALUE,
} from '../../config';
import { getDeliveryNumber } from '../../lib/utils/getDeliveryNumber';
import { getDeliverySystemId } from '../../lib/utils/getDeliverySystemId';
import { getDeliveryAddress } from '../../lib/utils/getDeliveryAdress';
import { getDeliveryMetro } from '../../lib/utils/getDeliveryMetro';
import { getDeliveryContents } from '../../lib/utils/getDeliveryContents';
import { getDeliveryType } from '../../lib/utils/getDeliveryType';
import { getDeliveryExpressState } from '../../lib/utils/getDeliveryExpressState';
import { getDeliveryPickupDateTime } from '../../lib/utils/getDeliveryPickupDateTime';
import { getDeliveryWeight } from '../../lib/utils/getDeliveryWeight';

const { RouteName } = sharedConfigRoutes;
const { DELIVERIES } = RouteName;

/**
 * Components
 */
const DeliveryId: FunctionComponent<{ id: number | string }> = ({ id }) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex flex-col">
            <span className="text-md">{t(LABEL_ID)}</span>
            <span className="text-md font-bold">{`# ${id}`}</span>
        </div>
    );
};

const DeliveryChips: FunctionComponent<{
    type: string;
    express: boolean;
}> = ({ type, express }) => {
    const { t } = useTranslation(translationNS);

    const isCar = type === 'car';

    return (
        <div className="flex justify-end gap-1">
            {express ? (
                <Chip color="danger" size="sm" variant="solid">
                    {t(TYPE_EXPRESS)}
                </Chip>
            ) : null}

            <Chip color="success" size="sm" variant="dot">
                {t(isCar ? TYPE_ON_CAR : TYPE_ON_FOOT)}
            </Chip>
        </div>
    );
};

const DeliverySchedule: FunctionComponent<{
    value?: string;
}> = ({ value }) => (
    <div>
        <span className="text-small text-default-500">{value ?? ''}</span>
    </div>
);

const DeliveryContents: FunctionComponent<{ contents: string }> = ({
    contents = 'не описано',
}) => {
    const { t } = useTranslation(translationNS);
    return (
        <div>
            <div className="font-bold">{t(LABEL_STORAGE)}</div>
            <div className="text-sm">{contents}</div>
        </div>
    );
};

const DeliveryWeight: FunctionComponent<{ weight: string }> = ({ weight }) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="min-w-16 flex-grow-0">
            <div className="font-bold">{t(LABEL_WEIGHT)}</div>
            <div className="text-sm">{t(WEIGHT_VALUE, { weight })}</div>
        </div>
    );
};

const DeliveryAddress: FunctionComponent<{ address: string }> = ({
    address,
}) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="min-h-16">
            <div className="font-bold">{t(LABEL_ADDRESS)}</div>
            <div className="line-clamp-2 text-sm">{address}</div>
        </div>
    );
};

const MoreButton: FunctionComponent<{
    onPress: () => void;
}> = ({ onPress }) => {
    const { t } = useTranslation(translationNS);
    return (
        <Button color="primary" fullWidth onPress={onPress}>
            {t(BUTTON_MORE)}
        </Button>
    );
};

/**
 * View
 */
export const DeliveryMarketCard: FunctionComponent<{
    delivery: UpcomingDelivery;
    featureSlot?: ReactNode;
}> = ({ delivery, featureSlot }) => {
    const navigate = useNavigate();

    const id = getDeliverySystemId(delivery);
    const deliveryId = getDeliveryNumber(delivery);
    const address = getDeliveryAddress(delivery);
    const subway = getDeliveryMetro(delivery);
    const weight = getDeliveryWeight(delivery);
    const contents = getDeliveryContents(delivery);
    const type = getDeliveryType(delivery);
    const isExpress = getDeliveryExpressState(delivery);
    const pickupDateTime = getDeliveryPickupDateTime(delivery, true, true);

    const onPressMore = (): void => {
        if (delivery) {
            navigate(`${DELIVERIES}/${id}`);
        }
    };

    return (
        <Card
            className={clsx(
                'max-w-[800px] shadow-md',
                isExpress
                    ? 'border-2 border-danger'
                    : 'border-2 border-background',
            )}
        >
            <CardHeader className="flex justify-between gap-3">
                <DeliveryId id={deliveryId} />
                <div className="flex flex-col text-right">
                    <DeliveryChips type={type} express={isExpress} />
                    <DeliverySchedule value={pickupDateTime} />
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <DeliveryContents contents={contents} />
                <Spacer y={2} />
                <div className="flex gap-2">
                    <div className="flex-grow">
                        <DeliveryAddress address={address} />
                        <Spacer y={2} />
                    </div>
                    <DeliveryWeight weight={weight} />
                </div>
                <SubwayStationWithIcon value={subway} />
            </CardBody>
            <Divider />
            <CardFooter>
                <div className="flex w-full gap-2">
                    <div className="w-full">
                        <MoreButton onPress={onPressMore} />
                    </div>
                    {featureSlot ? (
                        <div className="flex-shrink">{featureSlot}</div>
                    ) : null}
                </div>
            </CardFooter>
        </Card>
    );
};
