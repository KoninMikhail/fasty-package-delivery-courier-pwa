import { Delivery } from '@/shared/api';
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
import { format } from 'date-fns';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { sharedServicesSubway } from '@/shared/services';

import { translationNS } from '../../config';

const { SubwayStationWithIcon } = sharedServicesSubway;
const { RouteName } = sharedConfigRoutes;
const { DELIVERIES } = RouteName;

/**
 * Constants
 */
const TRANSLATION = {
    LABEL_ID: 'delivery.card.label.id',
    TYPE_ON_CAR: 'delivery.type.onCar',
    TYPE_ON_FOOT: 'delivery.type.onFoot',
    TYPE_EXPRESS: 'delivery.type.express',
    LABEL_ADDRESS: 'delivery.card.label.address',
    LABEL_WEIGHT: 'delivery.card.label.weight',
    LABEL_STORAGE: 'delivery.card.label.storage',
    LABEL_WEIGHT_KG: 'delivery.card.weight.kg',
    BUTTON_MORE: 'delivery.card.button.more',
};

/**
 * Components
 */
const DeliveryId: FunctionComponent<{ id: number | string }> = ({ id }) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex flex-col">
            <span className="text-md">{t(TRANSLATION.LABEL_ID)}</span>
            <span className="text-md font-bold">{`# ${id}`}</span>
        </div>
    );
};

const DeliveryChips: FunctionComponent<{
    isExpress: boolean;
    isCar: boolean;
}> = ({ isExpress, isCar }) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex justify-end gap-1">
            {isExpress ? (
                <Chip color="danger" size="sm" variant="solid">
                    {t(TRANSLATION.TYPE_EXPRESS)}
                </Chip>
            ) : null}

            <Chip color="success" size="sm" variant="dot">
                {t(isCar ? TRANSLATION.TYPE_ON_CAR : TRANSLATION.TYPE_ON_FOOT)}
            </Chip>
        </div>
    );
};

const DeliverySchedule: FunctionComponent<{
    date: string;
    timeStart: string;
    timeEnd: string;
}> = ({ date, timeStart, timeEnd }) => {
    const deliveryDateFormatted = format(new Date(date), 'dd.MM.yyyy');
    return (
        <div>
            <span className="text-small text-default-500">{`${deliveryDateFormatted} ${timeStart} - ${timeEnd}`}</span>
        </div>
    );
};

const DeliveryContents: FunctionComponent<{ contents: string }> = ({
    contents = 'не описано',
}) => {
    const { t } = useTranslation(translationNS);

    /**
     * Locale
     */
    const storageLabel = `${t(TRANSLATION.LABEL_STORAGE)}:`;

    return (
        <div>
            <div className="font-bold">{storageLabel}</div>
            <div className="text-sm">{contents}</div>
        </div>
    );
};

const DeliveryWeight: FunctionComponent<{ weight: number | string }> = ({
    weight = 0,
}) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="min-w-16 flex-grow-0">
            <div className="font-bold">{t(TRANSLATION.LABEL_WEIGHT)}</div>
            <div className="text-sm">
                {t(TRANSLATION.LABEL_WEIGHT_KG, {
                    weight: Number(weight).toFixed(2),
                })}
            </div>
        </div>
    );
};

const DeliveryAddress: FunctionComponent<{ address: string }> = ({
    address = 'не указан',
}) => {
    const { t } = useTranslation(translationNS);
    return (
        <div>
            <div className="font-bold">{t(TRANSLATION.LABEL_ADDRESS)}</div>
            <div className="text-sm">{address}</div>
        </div>
    );
};

const MoreButton: FunctionComponent<{
    onPress: () => void;
}> = ({ onPress }) => {
    const { t } = useTranslation(translationNS);
    return (
        <Button color="primary" fullWidth onPress={onPress}>
            {t(TRANSLATION.BUTTON_MORE)}
        </Button>
    );
};

/**
 * View
 */
export const DeliveryMarketCard: FunctionComponent<{
    delivery: Delivery;
    featureSlot?: ReactNode;
}> = ({ delivery, featureSlot }) => {
    const navigate = useNavigate();
    const {
        id,
        car: isCar,
        express: isExpress,
        date: deliveryDate,
        contents,
        time_start: deliveryStartTime,
        time_end: deliveryEndTime,
        address: { address, metro },
        weight,
    } = delivery;

    const onPressMore = (): void => {
        if (delivery) {
            navigate(`${DELIVERIES}/${id}`);
        }
    };

    return (
        <Card
            className={clsx(
                'max-w-[600px] shadow-md',
                isExpress && 'border-2 border-danger',
            )}
        >
            <CardHeader className="flex justify-between gap-3">
                <DeliveryId id={id} />
                <div className="flex flex-col text-right">
                    <DeliveryChips isCar={isCar} isExpress={isExpress} />
                    <DeliverySchedule
                        date={deliveryDate}
                        timeStart={deliveryStartTime}
                        timeEnd={deliveryEndTime}
                    />
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
                <SubwayStationWithIcon value={metro} />
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
