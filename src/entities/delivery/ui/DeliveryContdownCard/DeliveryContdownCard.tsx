import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
} from '@nextui-org/react';
import { Delivery } from '@/shared/api';
import { differenceInMinutes, isPast } from 'date-fns';
import { APP_TIMEZONE } from '@/shared/config/constants';

const Address: FunctionComponent<{ address: string }> = ({ address }) => {
    return (
        <div className="flex flex-col">
            <span className="text-md">Address</span>
            <span className="text-md font-bold">{address}</span>
        </div>
    );
};

function calculateDifference(deadline) {
    const now = new Date();
    const deadlineDate = new Date(deadline);

    if (isPast(deadlineDate)) return ''; // Deadline has passed

    const diffMinutes = differenceInMinutes(deadlineDate, now);

    return diffMinutes;
}

const convertMinutesToHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const hoursString = hours < 10 ? `0${hours}` : hours;
    const remainingMinutes = minutes % 60;
    const remainingMinutesString =
        remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
    return `${hoursString} : ${remainingMinutesString}`;
};

interface IDeliveryCountdownCardProperties {
    delivery?: Delivery;
}

export const DeliveryCountdownCard: FunctionComponent<
    IDeliveryCountdownCardProperties
> = ({ delivery }) => {
    const deadline = new Date(
        new Date('2024-02-21T15:30:59.999Z').toLocaleString('en', {
            timeZone: APP_TIMEZONE,
        }),
    );

    return (
        <Card className="px min-w-[300px] max-w-[600px]">
            <CardHeader className="flex gap-3">
                <div className="flex gap-2">
                    <Chip size="sm">
                        {convertMinutesToHours(
                            Number(calculateDifference(deadline)),
                        )}
                    </Chip>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <Address
                    address={delivery?.address.address || 'sdsdsdsdsdsdsd'}
                />
            </CardBody>
            <Divider />
            <CardFooter>
                <div className="flex w-full justify-between gap-2">
                    <div className="flex flex-grow">даные о клиенте</div>
                    <div className="flex">звоноке</div>
                </div>
            </CardFooter>
        </Card>
    );
};
