import { DeliveryMarketCard } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { Spinner } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { $$empty, $$hasError, $$loading, $deliveriesList } from '../../model';

/**
 * Сomponents
 */
const Loader: FunctionComponent = () => {
    return (
        <div className="flex w-full justify-center gap-4">
            <Spinner size="sm" color="primary" />
            <span>Обновляем данные</span>
        </div>
    );
};

const Error: FunctionComponent = () => {
    return <div>Ошибка</div>;
};

export const MyDeliveriesList: FunctionComponent = () => {
    const [isLoading, hasError, isEmpty] = useUnit([
        $$loading,
        $$hasError,
        $$empty,
    ]);

    const items = useList($deliveriesList, (delivery, index) => (
        <motion.div key={delivery.date} whileTap={{ scale: 0.9 }}>
            <DeliveryMarketCard delivery={delivery} />
        </motion.div>
    ));

    if (isEmpty) {
        return <div>Нет активных доставок</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {isLoading ? <Loader /> : null}
            {hasError ? <Error /> : null}
            <div className="flex flex-col gap-4">
                <AnimatePresence>{items}</AnimatePresence>
            </div>
        </div>
    );
};
