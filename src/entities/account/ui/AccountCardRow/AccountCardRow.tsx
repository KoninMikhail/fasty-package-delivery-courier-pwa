import { Avatar } from '@nextui-org/react';

interface Account {
    name: string;
    email: string;
    avatar: string;
    deliveries: {
        delivered: number;
        inTransit: number;
        pending: number;
    };
}
interface IAccountCardRowProperties {
    account: Account;
    size?: 'lg' | 'md' | 'sm';
    avatarPosition?: 'left' | 'right';
}
export const AccountCardRow = ({
    account,
    size,
    avatarPosition = 'left',
}: IAccountCardRowProperties) => {
    if (avatarPosition === 'left') {
        return (
            <div className="flex items-center gap-5">
                <Avatar src={account.avatar} size={size} />
                <div className="flex flex-col items-start justify-center gap-1">
                    <span className="font-bold">{account.name}</span>
                    <span className="text-tiny text-default-500">
                        {account.email}
                    </span>
                </div>
            </div>
        );
    }
    return (
        <div className="flex items-center gap-5">
            <div className="flex flex-col items-end justify-center gap-1">
                <span className="font-bold">{account.name}</span>
                <span className="text-tiny text-default-500">
                    {account.email}
                </span>
            </div>
            <Avatar src={account.avatar} size={size} />
        </div>
    );
};
