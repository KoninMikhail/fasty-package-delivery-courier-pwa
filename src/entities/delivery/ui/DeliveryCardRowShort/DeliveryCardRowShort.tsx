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

interface DeliveryDto {}

interface IDeliveryCardRowShortProperties {
    delivery: DeliveryDto;
    size?: 'large' | 'medium' | 'small';
    featureSlotTop?: ReactNode | ReactNode[];
    featureSlotBottom?: ReactNode | ReactNode[];
}

export const DeliveryCardRowShort: FunctionComponent<
    IDeliveryCardRowShortProperties
> = ({ delivery, size, featureSlotTop, featureSlotBottom }) => {
    return (
        <Card className="max-w-[600px] shadow-md ">
            <CardHeader className="flex gap-3">
                <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md">NextUI</p>
                    <p className="text-small text-default-500">nextui.org</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>
                    Make beautiful websites regardless of your design
                    experience.
                </p>
            </CardBody>
            <Divider />
            <CardFooter>
                <Link href="https://github.com/nextui-org/nextui">
                    Visit source code on GitHub.
                </Link>
            </CardFooter>
        </Card>
    );
};
