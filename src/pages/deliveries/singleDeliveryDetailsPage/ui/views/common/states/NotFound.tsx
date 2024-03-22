import { Button } from '@nextui-org/react';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';

const { RouteName } = sharedConfigRoutes;
const { DELIVERIES } = RouteName;

export const NotFound: FunctionComponent = () => {
    const navigate = useNavigate();

    const onPressButton = (): void => {
        navigate(DELIVERIES);
    };

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-8">
            <img
                src="/assets/images/delivery-not-exist.png"
                className="h-64 w-full object-contain"
                alt="Delivery not found"
            />
            <h3 className="text-center text-2xl font-bold">
                Доставка не найдена
            </h3>
            <Button color="primary" variant="flat" onPress={onPressButton}>
                <GoArrowLeft />В мои доставки
            </Button>
        </div>
    );
};
