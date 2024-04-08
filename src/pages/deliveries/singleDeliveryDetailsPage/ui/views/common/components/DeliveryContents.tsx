import { useUnit } from 'effector-react';
import { $$deliveryContents } from '../../../../model';

export const DeliveryContents: FunctionComponent = () => {
    const contents = useUnit($$deliveryContents);
    return <p>{contents}</p>;
};
