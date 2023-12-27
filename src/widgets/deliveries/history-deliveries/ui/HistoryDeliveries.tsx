import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';

export const HistoryDeliveries: FunctionComponent = () => {
    return (
        <Card
            shadow="sm"
            isPressable
            onPress={() => console.log('item pressed')}
        >
            <CardBody className="overflow-visible p-0">
                <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt="DeliveriesHistory"
                    className="h-[140px] w-full object-cover"
                    src="https://nextui.org/images/fruit-1.jpeg"
                />
            </CardBody>
            <CardFooter className="justify-between text-small">
                <b>Deliveries History</b>
                <p className="text-default-500">{2000}</p>
            </CardFooter>
        </Card>
    );
};
