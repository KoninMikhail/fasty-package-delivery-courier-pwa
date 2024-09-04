import { PropsWithChildren } from 'react';
import { useUnit } from 'effector-react';
import { $isOffline } from '@/widgets/deliveries/market/model';

export const OfflineBlock: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const isOffline = useUnit($isOffline);

    if (!isOffline) return children;

    return (
        <div className="relative w-full">
            <div className="absolute bottom-0 left-0 right-0 top-0 z-50 h-full w-full bg-background bg-opacity-50" />
            {children}
        </div>
    );
};
