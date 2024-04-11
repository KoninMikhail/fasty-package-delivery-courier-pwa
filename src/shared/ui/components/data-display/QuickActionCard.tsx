import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Spacer,
} from '@nextui-org/react';
import type { ReactNode } from 'react';
import { IoArrowForwardOutline } from 'react-icons/io5';

interface IQuickActionCardProperties {
    title: ReactNode;
    icon: ReactNode;
    backgroundColor: string;
}

export const QuickActionCard: FunctionComponent<IQuickActionCardProperties> = ({
    title,
    icon,
    backgroundColor,
}) => {
    return (
        <Card
            isPressable
            isHoverable
            className="h-44 w-44 rounded-3xl bg-gray-200 p-1"
        >
            <CardHeader className="text-left">{title}</CardHeader>
            <CardBody>
                <Spacer y={1} />
            </CardBody>
            <CardFooter>
                <div className="flex w-full items-center justify-between">
                    <div className="relative h-10 w-10 text-[2.55rem]">
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                            {icon}
                        </span>
                    </div>
                    <div className="relative h-10 w-10 rounded-full bg-white">
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                            <IoArrowForwardOutline className="h-6 w-6" />
                        </span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};
