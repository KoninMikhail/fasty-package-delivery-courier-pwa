import { useUnit } from 'effector-react';
import { Link, Spacer } from '@nextui-org/react';
import { $$deliveryAddress } from '../../../../model';
import { generateYandexMapsLink } from '../../../../lib';

export const DeliveryAddress: FunctionComponent = () => {
    const address = useUnit($$deliveryAddress);
    return (
        <div>
            <p>{address}</p>
            <Spacer y={0.5} />
            <Link
                href={generateYandexMapsLink(address)}
                as={Link}
                color="primary"
                size="sm"
            >
                Перейти на Яндекс.Карты
            </Link>
        </div>
    );
};
