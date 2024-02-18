import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Image,
} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { Delivery } from '@/shared/api';

const Address: FunctionComponent<{ address: string }> = ({ address }) => {
    return (
        <div className="flex flex-col">
            <span className="text-md">Address</span>
            <span className="text-md font-bold">{address}</span>
        </div>
    );
};

interface IDeliveryCountdownCardProperties {
    delivery?: Delivery;
}

export const DeliveryCountdownCard: FunctionComponent<
    IDeliveryCountdownCardProperties
> = ({ delivery }) => {
    return (
        <Card className="max-w-[600px]">
            <CardHeader className="flex gap-3">
                <div className="flex gap-2">
                    <div className="flex gap-2">
                        <Image
                            alt="nextui logo"
                            height={40}
                            radius="sm"
                            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                            width={40}
                        />
                        <div className="flex flex-col">
                            <p className="text-md">NextUI</p>
                        </div>
                    </div>
                    <div>0:12:12</div>
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
                <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                >
                    Visit source code on GitHub.
                </Link>
            </CardFooter>
        </Card>
    );
};
