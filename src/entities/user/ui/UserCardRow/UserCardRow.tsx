import { Avatar } from '@nextui-org/react';
import { User } from '@/shared/api';
import {
    getFullUserName,
    getUserInitials,
    getUserRoleName,
    getUserAvatarSource,
} from '../../lib';

interface IUserCardRowProperties {
    user: Nullable<User>;
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
    user,
    size,
    avatarPosition = 'left',
}: IUserCardRowProperties) => {
    const name = getFullUserName(user);
    const initials = getUserInitials(user);
    const role = getUserRoleName(user);
    const avatarSource = getUserAvatarSource(user);

    return (
        <div className="flex items-center gap-2 lg:gap-4">
            {avatarPosition === 'left' ? (
                <>
                    <Avatar src={avatarSource} size={size} name={initials} />
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
                        src={avatarSource}
                        size={size}
                        name={initials}
                    />
                </>
            )}
        </div>
    );
};
