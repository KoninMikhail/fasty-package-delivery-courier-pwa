import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { Text } from '@/shared/ui/components/typography';

export const AccountDeliveriesMapStats: FunctionComponent = () => {
    return (
        <Card
            shadow="sm"
            className="py-2"
            isPressable
            onPress={() => console.log('item pressed')}
        >
            <CardHeader>
                <Text size="small">Статистика</Text>
            </CardHeader>
            <CardBody className="h-12 w-48" />
            <CardFooter className="justify-between text-small">
                <Text size="small">{2000}</Text>
            </CardFooter>
        </Card>
    );
};
