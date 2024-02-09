import { Avatar } from '@nextui-org/react';

interface User {
    name: string;
    email: string;
    avatar: string;
}
interface IUserCardRowProperties {
    account: User;
    size?: 'lg' | 'md' | 'sm';
    avatarPosition?: 'left' | 'right';
}
export const UserCardRow = ({
    account,
    size,
    avatarPosition = 'left',
}: IUserCardRowProperties) => {
    if (avatarPosition === 'left') {
        return (
            <div className="flex items-center gap-5">
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
