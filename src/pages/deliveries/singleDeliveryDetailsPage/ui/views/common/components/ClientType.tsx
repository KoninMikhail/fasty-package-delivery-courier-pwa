import { useUnit } from 'effector-react';
import { RiBuildingFill } from 'react-icons/ri';
import { IoPersonSharp } from 'react-icons/io5';
import { getClientType, getClientTypeLocale } from '@/entities/client';
import { $delivery } from '../../../../model';

export const ClientType: FunctionComponent = () => {
    const { client } = useUnit($delivery);
    const clientType = getClientType(client);
    const clientTypeLocaled = getClientTypeLocale(client);

    const isOrganization = clientType === 'organization';

    if (isOrganization) {
        return (
            <div className="flex items-center gap-1">
                <span className="text-xl">
                    <RiBuildingFill />
                </span>
                {clientTypeLocaled}
            </div>
        );
    }
    return (
        <div className="flex items-center gap-1">
            <span className="text-xl">
                <IoPersonSharp />
            </span>
            {clientTypeLocaled}
        </div>
    );
};
