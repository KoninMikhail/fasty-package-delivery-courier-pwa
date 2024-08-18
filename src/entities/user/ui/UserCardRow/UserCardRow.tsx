import { Avatar } from '@nextui-org/react';
import { User } from '@/shared/api';
import { forwardRef } from 'react';
import {
    getFullUserName,
    getUserInitials,
    getUserRoleName,
    getUserAvatarSource,
} from '../../lib';

/* eslint-disable react/jsx-props-no-spreading */

interface IUserCardRowProperties {
    user: Optional<User>;
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

export const UserCardRow = forwardRef<HTMLDivElement, IUserCardRowProperties>(
    ({ user, size, avatarPosition = 'left', ...rest }, reference) => {
        const name = getFullUserName(user);
        const initials = getUserInitials(user);
        const role = getUserRoleName(user);
        const avatarSource = getUserAvatarSource(user);

        return (
            <div
                ref={reference}
                className="flex items-center gap-2 lg:gap-4"
                {...rest}
            >
                {avatarPosition === 'left' ? (
                    <div className="flex gap-4">
                        <Avatar
                            ref={reference}
                            src={avatarSource}
                            size={size}
                            name={initials}
                            isBordered
                        />
                        <UserInfo
                            name={name}
                            role={role}
                            avatarPosition={avatarPosition}
                        />
                    </div>
                ) : (
                    <div className="flex gap-4">
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
                    </div>
                )}
            </div>
        );
    },
);
