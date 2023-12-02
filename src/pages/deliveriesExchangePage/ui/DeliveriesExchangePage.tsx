import { Textarea } from '@nextui-org/react';

import { SwitchTheme } from '@/features/switchTheme';

/**
 * @name DeliveriesExchangePage
 * @description Page for deliveries exchange
 * @constructor
 */
export const DeliveriesExchangePage: FunctionComponent = () => {
    return (
        <>
            <div className={'flex'}>
                <SwitchTheme />
                <Textarea label="Description" placeholder="Enter your description" className="max-w-xs" />
            </div>
        </>
    );
};
