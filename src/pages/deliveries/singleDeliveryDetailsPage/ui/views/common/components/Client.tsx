import { useUnit } from 'effector-react';
import { $$deliveryClientName } from '../../../../model';

export const Client: FunctionComponent = () => {
    const name = useUnit($$deliveryClientName);
    return <p>{name}</p>;
};
