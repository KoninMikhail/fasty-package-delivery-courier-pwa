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
import { SubwayStationWithIcon } from '@/shared/lib/subway';
import { sharedConfigLocale } from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';
import { useEstimatedTime } from '../../lib/hooks/useEstimatedTime';
import { translationNS } from '../../config';
import locale_en from '../../locales/en.locale.json';
import locale_ru from '../../locales/ru.locale.json';

const { locale } = sharedConfigLocale;

/**
 * Constants
 */
const DELIVERY_EXPIRED_CHIP_LABEL = 'delivery.chip.expired';
const DELILERY_COUNTDOWN_CHIP_LABEL = 'delivery.chip.timeLeft';
const DELIVERY_ADDRESS_LABEL = 'delivery.label.address';
const DELIVERY_ADDRESS_NOT_FOUND = 'delivery.label.address.notFound';
const DLIVERY_CLIENT_NOT_FOUND = 'delivery.client.name.notFound';

/**
 * locale.ts
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * layout
 */

const HeaderLayout: FunctionComponent<{
    station: ReactNode;
    countdown: ReactNode;
}> = ({ station, countdown }) => (
    <div className="flex w-full items-center gap-2">
        <div className="flex-grow">{station}</div>
        <div className="flex items-center gap-1.5">{countdown}</div>
    </div>
);

/**
 * Components
 * @param address
 */
const Address: FunctionComponent<{ address: string }> = ({ address }) => {
    const { t } = useTranslation(translationNS);
    const addressLabel = `${t(DELIVERY_ADDRESS_LABEL)}:`;
    const addressValue = address || t(DELIVERY_ADDRESS_NOT_FOUND);
    return (
        <div className="flex flex-col">
            <span className="text-md">{addressLabel}</span>
            <span className="text-md font-bold">{addressValue}</span>
        </div>
    );
};

const ClientContact: FunctionComponent<{ name?: string; phone?: string }> = ({
    name,
    phone,
}) => {
    const { t } = useTranslation(translationNS);

    if (!name || !phone) {
        return (
            <div className="text-md font-bold">
                {t(DLIVERY_CLIENT_NOT_FOUND)}
            </div>
        );
    }

    return (
        <div className="flex w-full justify-between gap-2">
            <div className="flex-grow">
                <div className="text-sm font-bold">{name}</div>
                <div className="text-sm">{phone}</div>
            </div>
            <Button
                as={Link}
                href={`tel:${phone}`}
                isIconOnly
                color="success"
                className="text-lg text-content1"
            >
                <IoCall />
            </Button>
        </div>
    );
};

const Time: FunctionComponent<{
    date: Date;
}> = ({ date }) => {
    const { t } = useTranslation(translationNS);

    const estimatedMinutes = useEstimatedTime(date);
    const hoursLeft = Math.floor(estimatedMinutes / 60);
    const minutesLeft = estimatedMinutes % 60;

    const isExpired = estimatedMinutes <= 0;
    const isCloseToExpired = estimatedMinutes <= 30;

    if (isExpired) {
        const expiredLabel = t(DELIVERY_EXPIRED_CHIP_LABEL);
        return (
            <Chip color="danger" size="sm">
                {expiredLabel}
            </Chip>
        );
    }

    return (
        <Chip color={isCloseToExpired ? 'warning' : 'default'}>
            {t(DELILERY_COUNTDOWN_CHIP_LABEL, {
                hours: hoursLeft,
                minutes: minutesLeft,
            })}
        </Chip>
    );
};

/**
 * View
 */
export const DeliveryCountdownCard: FunctionComponent<{
    delivery?: Delivery;
}> = ({ delivery }) => {
    const deadline = new Date(
        `${delivery?.date || '2024-01-01'}T${delivery?.time_end || '00:00'}:00.999`,
    );
    const address = delivery?.address;
    const contact = delivery?.contact;

    return (
        <Card className="px min-w-[300px] max-w-[600px]">
            <CardHeader className="flex gap-3">
                <HeaderLayout
                    countdown={<Time date={deadline} />}
                    station={
                        <SubwayStationWithIcon
                            value={address?.metro || '-------'}
                        />
                    }
                />
            </CardHeader>
            <Divider />
            <CardBody>
                <Address address={address?.address} />
            </CardBody>
            <Divider />
            <CardFooter>
                <ClientContact name={contact?.name} phone={contact?.phone} />
            </CardFooter>
        </Card>
    );
};
