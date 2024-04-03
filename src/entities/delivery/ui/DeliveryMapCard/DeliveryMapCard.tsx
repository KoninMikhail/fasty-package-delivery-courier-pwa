import { Button, Card, CardBody, Divider } from '@nextui-org/react';
import { Delivery } from '@/shared/api';
import { getDeliveryId } from '@/entities/delivery';

interface DeliveryMapCardProperties {
    delivery: Delivery;
    onPress?: (id: Delivery['id']) => void;
}

export const DeliveryMapCard: FunctionComponent<DeliveryMapCardProperties> = ({
    delivery,
    onPress,
}) => {
    const id = getDeliveryId(delivery);

    const onPressCard = () => {
        if (onPress) {
            onPress(id);
        }
    };

    return (
        <Button onPress={onPressCard}>
            <Card className="w-[200px]">
                <Divider />
                <CardBody>
                    <p>
                        Make beautiful websites regardless of your design
                        experience.
                    </p>
                </CardBody>
                <Divider />
            </Card>
        </Button>
    );
};
