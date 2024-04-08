import { useUnit } from 'effector-react';
import { RiBuildingFill } from 'react-icons/ri';
import { IoPersonSharp } from 'react-icons/io5';
import {
    $$deliveryClientType,
    $$deliveryClientTypeLocaled,
} from '../../../../model';

export const ClientType: FunctionComponent = () => {
    const type = useUnit($$deliveryClientType);
    const text = useUnit($$deliveryClientTypeLocaled);
    if (type === 'organization') {
        return (
            <div className="flex items-center gap-1">
                <span className="text-xl">
                    <RiBuildingFill />
                </span>
                {text}
            </div>
        );
    }
    return (
        <div className="flex items-center gap-1">
            <span className="text-xl">
                <IoPersonSharp />
            </span>
            {text}
        </div>
    );
};
