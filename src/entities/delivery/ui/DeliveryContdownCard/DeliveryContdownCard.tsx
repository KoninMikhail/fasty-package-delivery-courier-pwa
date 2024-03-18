import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
    Link,
} from '@nextui-org/react';
import { Delivery } from '@/shared/api';
import { IoCall } from 'react-icons/io5';
import { sharedServicesSubway } from '@/shared/services';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';
import { getDeliveryAddress, getDeliveryMetro } from '../../lib';
import { useEstimatedTime } from '../../lib/hooks/useEstimatedTime';
import { translationNS } from '../../config';

const { SubwayStationWithIcon } = sharedServicesSubway;

/**
 * Constants
 */
const TRANSLATIONS = {
    EXPIRED: 'delivery.card.chip.expired',
    TIME_LEFT: 'delivery.card.chip.timeLeft',
    ADDRESS: 'delivery.card.label.address',
    CLIENT_NOT_FOUND: 'delivery.card.client.name.notFound',
};

/**
 * @name HeaderLayout
 * @description Represents the header layout of a card, showing the subway station and the countdown timer.
 */

interface HeaderLayoutProperties {
    station: ReactNode;
    countdown: ReactNode;
}

export const HeaderLayout: FunctionComponent<HeaderLayoutProperties> = ({
    station,
    countdown,
}) => (
    <div className="flex w-full items-center gap-2">
        <div className="flex-grow">{station}</div>
        <div className="flex items-center gap-1.5">{countdown}</div>
    </div>
);

/**
 * Renders the address section of the delivery card.
 */
export const AddressDisplay: FunctionComponent<{
    address: string;
}> = ({ address }) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex flex-col">
            <span className="text-md">{`${t(TRANSLATIONS.ADDRESS)}:`}</span>
            <span className="text-md font-bold">{address}</span>
        </div>
    );
};

/**
 * Displays the contact information of the client, including name and phone number, with a direct call action button.
 */
export const ContactDetails: FunctionComponent<{
    name?: string;
    phone?: string;
}> = ({ name, phone }) => {
    const { t } = useTranslation(translationNS);

    if (!name || !phone)
        return (
            <div className="text-md font-bold">
                {t(TRANSLATIONS.CLIENT_NOT_FOUND)}
            </div>
        );

    return (
        <div className="flex w-full justify-between gap-2">
            <div className="flex-grow">
                <div className="truncate text-sm font-bold">{name}</div>
                <div className="text-sm">
                    {phone.replace('(', ' (').replace(')', ') ')}
                </div>
            </div>
            <Button
                as={Link}
                role="link"
                href={`tel:+${phone.replaceAll(/\D/g, '')}`}
                isIconOnly
                color="success"
                className="text-lg text-content1"
            >
                <IoCall />
            </Button>
        </div>
    );
};

/**
 * Renders a time chip that shows either the estimated time until delivery or indicates that the delivery is expired.
 */
export const DeliveryTimer: FunctionComponent<{
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
                {t(TRANSLATIONS.EXPIRED)}
            </Chip>
        );

    return (
        <Chip color={isCloseToExpired ? 'warning' : 'default'}>
            {t(TRANSLATIONS.TIME_LEFT, {
                hours: hoursLeft,
                minutes: minutesLeft,
            })}
        </Chip>
    );
};

/**
 * A card component that displays a countdown to a delivery date, along with relevant delivery information.
 *
 * @param {Delivery} [delivery] - Optional. The delivery details including date, time end, address, and contact information.
 * @returns {JSX.Element} The delivery countdown card with delivery information.
 */
interface DeliveryCountdownCardProperties {
    delivery: Delivery;
}

export const DeliveryCountdownCard: FunctionComponent<
    DeliveryCountdownCardProperties
> = ({ delivery }) => {
    const deadline = new Date(
        `${delivery?.date || '2024-01-01'}T${delivery?.time_end || '00:00'}:00.999`,
    );
    const address = getDeliveryAddress(delivery);
    const contact = delivery?.contact;
    const metro = getDeliveryMetro(delivery);

    return (
        <Card className="min-w-[300px] max-w-[600px]">
            <CardHeader className="flex gap-3">
                <HeaderLayout
                    countdown={<DeliveryTimer date={deadline} />}
                    station={<SubwayStationWithIcon value={metro} />}
                />
            </CardHeader>
            <Divider />
            <CardBody>
                <AddressDisplay address={address} />
            </CardBody>
            <Divider />
            <CardFooter>
                <ContactDetails name={contact?.name} phone={contact?.phone} />
            </CardFooter>
        </Card>
    );
};
