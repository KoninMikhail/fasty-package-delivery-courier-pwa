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

interface DeliveryPreviewCardProperties {
    delivery: Delivery;
    onPress?: () => void;
}

export const DeliveryPreviewCard: FunctionComponent<
    DeliveryPreviewCardProperties
> = ({ delivery, onPress }) => {
    console.log(delivery);
    return (
        <Card className="max-w-[600px] shadow-md " onPress={onPress}>
            <CardHeader className="flex justify-between gap-3">
                <div className="flex flex-col">
                    <p className="text-md font-bold">Номер доставки</p>
                    <p className="text-md font-bold">{delivery?.id}</p>
                </div>
                <div className="flex flex-col text-right">
                    <div className="flex justify-end gap-1">
                        {delivery?.express ? (
                            <Chip color="danger" size="sm" variant="solid">
                                Срочно
                            </Chip>
                        ) : null}

                        {delivery.car ? (
                            <Chip color="success" size="sm" variant="dot">
                                Пешком
                            </Chip>
                        ) : (
                            <Chip color="success" size="sm" variant="dot">
                                На авто
                            </Chip>
                        )}
                    </div>
                    <p className="text-small text-default-500">{`${delivery?.time_start} - ${delivery?.time_end}`}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <div>
                    <div className="font-bold">Содержимое:</div>
                    <div>{delivery?.contents}</div>
                </div>
                <Spacer y={2} />
                <div className="flex gap-2">
                    <div className="flex-grow">
                        {delivery?.address?.delivery_type === 'courier' && (
                            <>
                                <div className="font-bold">Адрес:</div>
                                <div>{delivery?.address?.address}</div>
                            </>
                        )}
                    </div>
                    <div className="min-w-16 flex-grow-0">
                        <div className="font-bold">Вес:</div>
                        <div>{`${delivery?.weight} кг`}</div>
                    </div>
                </div>
            </CardBody>
            <Divider />
            <CardFooter>
                <Button fullWidth color="primary">
                    Взять в работу
                </Button>
            </CardFooter>
        </Card>
    );
};
