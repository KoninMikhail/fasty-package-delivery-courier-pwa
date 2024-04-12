import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
} from '@nextui-org/react';
import { Delivery } from '@/shared/api';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { SubwayStationWithIcon } from '@/shared/services/subway';
import { useEstimatedTime } from '../../lib/hooks/useEstimatedTime';
import { translationNS, EXPIRED, TIME_LEFT, ADDRESS } from '../../config';
import {
    getDeliveryAddress,
    getDeliveryId,
    getDeliveryMetro,
} from '../../lib/utils';

/**
 * Renders the address section of the delivery card.
 */
const AddressDisplay: FunctionComponent<{
    address: string;
}> = ({ address }) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex flex-col">
            <span className="text-md">{`${t(ADDRESS)}:`}</span>
            <span className="text-md font-bold">{address}</span>
        </div>
    );
};

/**
 * @name HeaderLayout
 * @description Represents the header layout of a card, showing the subway station and the countdown timer.
 */

interface HeaderLayoutProperties {
    station: ReactNode;
    countdown: ReactNode;
}

const HeaderLayout: FunctionComponent<HeaderLayoutProperties> = ({
    station,
    countdown,
}) => (
    <div className="flex w-full items-center gap-2">
        <div className="flex-grow">{station}</div>
        <div className="flex items-center gap-1.5">{countdown}</div>
    </div>
);

const DeliveryTimer: FunctionComponent<{
    date: Date;
}> = ({ date }) => {
    const { t } = useTranslation(translationNS);

    const EXPIRED_MINS_COUNT = 0;
    const MINUTES_IN_HOUR = 60;
    const CLOSE_TO_EXPIRED_THRESHOLD = 30; // Minutes before considered close to expired

    const estimatedMinutes = useEstimatedTime(date);
    const hoursLeft = Math.floor(estimatedMinutes / MINUTES_IN_HOUR);
    const minutesLeft = estimatedMinutes % MINUTES_IN_HOUR;

    const isExpired = estimatedMinutes <= EXPIRED_MINS_COUNT;
    const isCloseToExpired = estimatedMinutes <= CLOSE_TO_EXPIRED_THRESHOLD;

    if (isExpired)
        return (
            <Chip color="danger" size="sm">
                {t(EXPIRED)}
            </Chip>
        );

    return (
        <Chip color={isCloseToExpired ? 'warning' : 'default'}>
            {t(TIME_LEFT, {
                hours: hoursLeft,
                minutes: minutesLeft,
            })}
        </Chip>
    );
};

interface DeliveryMapCardProperties {
    delivery: Delivery;
    onPress?: (id: Delivery['id']) => void;
}

export const DeliveryMapCard: FunctionComponent<DeliveryMapCardProperties> = ({
    delivery,
    onPress,
}) => {
    const deadline = new Date(
        `${delivery?.date || '2024-01-01'}T${delivery?.time_end || '00:00:00'}.999`,
    );
    const id = getDeliveryId(delivery);
    const metro = getDeliveryMetro(delivery);
    const address = getDeliveryAddress(delivery);

    const onPressCard = (): void => {
        if (onPress) {
            onPress(Number.parseInt(id, 10));
        }
    };

    return (
        <Card className="h-[182px] w-[300px]">
            <Divider />
            <CardHeader>
                <HeaderLayout
                    countdown={<DeliveryTimer date={deadline} />}
                    station={<SubwayStationWithIcon value={metro} />}
                />
            </CardHeader>
            <CardBody>
                <AddressDisplay address={address} />
            </CardBody>
            <Divider />
            <CardFooter>
                <SubwayStationWithIcon value={metro} />
            </CardFooter>
        </Card>
    );
};
