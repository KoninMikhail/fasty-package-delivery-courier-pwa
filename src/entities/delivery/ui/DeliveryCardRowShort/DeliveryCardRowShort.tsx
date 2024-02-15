import type { ReactNode } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image,
    Divider,
} from '@nextui-org/react';
import { Link } from 'react-router-dom';

interface DeliveryDto {
    id: number;
}

interface IDeliveryCardRowShortProperties {
    delivery: DeliveryDto;
    size?: 'large' | 'medium' | 'small';
    featureSlotTop?: ReactNode | ReactNode[];
    featureSlotBottom?: ReactNode | ReactNode[];
    onPress?: () => void;
}

export const DeliveryCardRowShort: FunctionComponent<
    IDeliveryCardRowShortProperties
> = ({ delivery, size, featureSlotTop, featureSlotBottom, onPress }) => {
    return (
        <Card className="max-w-[600px] shadow-md " onPress={onPress}>
            <CardHeader className="flex gap-3">
                <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md">{delivery?.id}</p>
                    <p className="text-small text-default-500">{`${delivery?.time_start} - ${delivery?.time_end}`}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{delivery?.contents}</p>
            </CardBody>
            <Divider />
            <CardFooter>
                <Link href="https://github.com/nextui-org/nextui">
                    {delivery?.contact?.name}
                </Link>
            </CardFooter>
        </Card>
    );
};
