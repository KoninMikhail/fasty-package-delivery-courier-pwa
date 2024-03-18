import { Avatar } from '@nextui-org/react';
import { User } from '@/shared/api';

interface IUserCardRowProperties {
    account: User;
    size?: 'lg' | 'md' | 'sm';
    avatarPosition?: 'left' | 'right';
}

interface IUserInfoProperties {
    name: string;
    role: string;
    avatarPosition: 'left' | 'right';
}

const UserInfo: FunctionComponent<IUserInfoProperties> = ({
    name,
    role,
    avatarPosition,
}: IUserInfoProperties) => (
    <div
        className={`flex flex-col ${avatarPosition === 'left' ? 'items-start' : 'items-end'} justify-center gap-1`}
    >
        <span className="font-bold">{name}</span>
        <span className="text-tiny text-default-500">{role}</span>
    </div>
);

export const UserCardRow: FunctionComponent<IUserCardRowProperties> = ({
    account,
    size,
    avatarPosition = 'left',
}: IUserCardRowProperties) => {
    const name = `${account.first_name} ${account.last_name}`;
    const initials = `${account.first_name[0]}${account.last_name[0]}`;
    const role = account.user_role.name;

    return (
        <div className="flex items-center gap-2 lg:gap-4">
            {avatarPosition === 'left' ? (
                <>
                    <Avatar src={account.avatar} size={size} name={initials} />
                    <UserInfo
                        name={name}
                        role={role}
                        avatarPosition={avatarPosition}
                    />
                </>
            ) : (
                <>
                    <UserInfo
                        name={name}
                        role={role}
                        avatarPosition={avatarPosition}
                    />
                    <Avatar
                        isBordered
                        src={account.avatar}
                        size={size}
                        name={initials}
                    />
                </>
            )}
        </div>
    );
};
