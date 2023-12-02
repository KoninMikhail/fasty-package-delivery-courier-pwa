import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from '@nextui-org/react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

interface IAccountDeliveriesProperties {
    template?: 'horizontal' | 'vertical';
}

const data = [
    {
        label: 'Delivered',
        value: 10,
    },
    {
        label: 'In Transit',
        value: 20,
    },
    {
        label: 'Pending',
        value: 30,
    },
];

const Container = ({
    children,
    template,
}: PropsWithChildren<IAccountDeliveriesProperties>) => {
    if (template === 'horizontal') {
        return (
            <div className="block w-full">
                <div className="flex gap-5 overflow-x-auto">{children}</div>
            </div>
        );
    }
    return <div className="flex flex-col gap-5">{children}</div>;
};

export const AccountDeliveries = ({
    template = 'vertical',
}: IAccountDeliveriesProperties) => {
    return (
        <Container template={template}>
            {data.map((delivery) => {
                const [isFollowed, setIsFollowed] = useState(false);

                return (
                    <Card key={delivery.label} className="max-w-[340px]">
                        <CardHeader className="justify-between">
                            <div className="flex gap-5">
                                <Avatar
                                    isBordered
                                    radius="full"
                                    size="md"
                                    src="/avatars/avatar-1.png"
                                />
                                <div className="flex flex-col items-start justify-center gap-1">
                                    <h4 className="text-small font-semibold leading-none text-default-600">
                                        Zoey Lang
                                    </h4>
                                    <h5 className="text-small tracking-tight text-default-400">
                                        @zoeylang
                                    </h5>
                                </div>
                            </div>
                            <Button
                                className={
                                    isFollowed
                                        ? 'border-default-200 bg-transparent text-foreground'
                                        : ''
                                }
                                color="primary"
                                radius="full"
                                size="sm"
                                variant={isFollowed ? 'bordered' : 'solid'}
                                onPress={() => setIsFollowed(!isFollowed)}
                            >
                                {isFollowed ? 'Unfollow' : 'Follow'}
                            </Button>
                        </CardHeader>
                        <CardBody className="px-3 py-0 text-small text-default-400">
                            <p>
                                Frontend developer and UI/UX enthusiast. Join me
                                on this coding adventure!
                            </p>
                            <span className="pt-2">
                                #FrontendWithZoey
                                <span
                                    className="py-2"
                                    aria-label="computer"
                                    role="img"
                                >
                                    💻
                                </span>
                            </span>
                        </CardBody>
                        <CardFooter className="gap-3">
                            <div className="flex gap-1">
                                <p className="text-small font-semibold text-default-400">
                                    4
                                </p>
                                <p className=" text-small text-default-400">
                                    Following
                                </p>
                            </div>
                            <div className="flex gap-1">
                                <p className="text-small font-semibold text-default-400">
                                    97.1K
                                </p>
                                <p className="text-small text-default-400">
                                    Followers
                                </p>
                            </div>
                        </CardFooter>
                    </Card>
                );
            })}
        </Container>
    );
};
