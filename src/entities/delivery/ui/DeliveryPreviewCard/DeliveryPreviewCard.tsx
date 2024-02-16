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
import { format } from 'date-fns';
import { MdAssignmentAdd } from 'react-icons/md';

const ID: FunctionComponent<{ id: number | string }> = ({ id }) => {
    return (
        <div className="flex flex-col">
            <span className="text-md">Номер доставки</span>
            <span className="text-md font-bold">{`# ${id}`}</span>
        </div>
    );
};

const Badges: FunctionComponent<{
    isExpress: boolean;
    isCar: boolean;
}> = ({ isExpress, isCar }) => {
    return (
        <div className="flex justify-end gap-1">
            {isExpress ? (
                <Chip color="danger" size="sm" variant="solid">
                    Срочно
                </Chip>
            ) : null}

            {isCar ? (
                <Chip color="success" size="sm" variant="dot">
                    Пешком
                </Chip>
            ) : (
                <Chip color="success" size="sm" variant="dot">
                    На авто
                </Chip>
            )}
        </div>
    );
};

const PickupDateTime: FunctionComponent<{
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

const Storage: FunctionComponent<{ contents: string }> = ({
    contents = 'не описано',
}) => {
    return (
        <div>
            <div className="font-bold">Содержимое:</div>
            <div>{contents}</div>
        </div>
    );
};

const Weight: FunctionComponent<{ weight: number | string }> = ({
    weight = 0,
}) => {
    return (
        <div className="min-w-16 flex-grow-0">
            <div className="font-bold">Вес:</div>
            <div>{`${weight} кг`}</div>
        </div>
    );
};

const Address: FunctionComponent<{ address: string }> = ({
    address = 'не указан',
}) => {
    return (
        <div>
            <div className="font-bold">Адрес:</div>
            <div>{address}</div>
        </div>
    );
};

interface DeliveryPreviewCardProperties {
    delivery: Delivery;
    onPressPreview?: (deliveryId: Delivery['id']) => void;
    onPressAssign?: (deliveryId: Delivery['id']) => void;
}

export const DeliveryPreviewCard: FunctionComponent<
    DeliveryPreviewCardProperties
> = ({ delivery, onPressPreview, onPressAssign }) => {
    const isExpress = delivery?.express;
    const isCar = delivery?.car;

    const onPressPreviewHandle = (): void => {
        if (onPressPreview) {
            onPressPreview(delivery.id);
        }
    };

    const onPressAssignHandle = (): void => {
        if (onPressAssign) {
            onPressAssign(delivery.id);
        }
    };

    const outputCardBodyClass = clsx('max-w-[600px] shadow-md', {
        'border-2': isExpress,
        'border-danger': isExpress,
    });

    return (
        <Card className={outputCardBodyClass}>
            <CardHeader className="flex justify-between gap-3">
                <ID id={delivery?.id} />
                <div className="flex flex-col text-right">
                    <Badges isCar={isCar} isExpress={isExpress} />
                    <PickupDateTime
                        date={delivery?.date}
                        timeStart={delivery?.time_start}
                        timeEnd={delivery?.time_end}
                    />
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <Storage contents={delivery?.contents} />
                <Spacer y={2} />
                <div className="flex gap-2">
                    <div className="flex-grow">
                        <Address address={delivery?.address?.address} />
                    </div>
                    <Weight weight={delivery?.weight} />
                </div>
            </CardBody>
            <Divider />
            <CardFooter>
                <div className="flex w-full gap-2">
                    <div className="w-full">
                        <Button
                            fullWidth
                            color="primary"
                            onPress={onPressPreviewHandle}
                        >
                            Посмотреть
                        </Button>
                    </div>
                    <div className="flex-shrink">
                        <Button
                            color="secondary"
                            onPress={onPressAssignHandle}
                            isIconOnly
                        >
                            <MdAssignmentAdd className="text-lg" />
                        </Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};
