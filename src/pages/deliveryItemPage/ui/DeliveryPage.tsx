import { useParams } from 'react-router-dom';

export const DeliveryItemPage: FunctionComponent = () => {
    const { deliveryId } = useParams();
    return <div>{`Delivery item:${deliveryId}`}</div>;
};
