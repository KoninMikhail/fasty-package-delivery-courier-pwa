import { Avatar, AvatarProps } from '@nextui-org/react';
import { User } from '@/shared/api';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { getFullUserName } from '@/entities/user/lib/utils';
import { API_BASE_URL } from '@/shared/api/instance';

/* eslint-disable unicorn/prevent-abbreviations */

interface IUserAvatarProperties extends AvatarProps {
    user: User;
}

export const UserAvatar = forwardRef<HTMLButtonElement, IUserAvatarProperties>(
    ({ user, className, isDisabled, ...rest }, ref) => {
        const userFullName = getFullUserName(user);
        const userAvatar = user?.avatar_src;
        return (
            <Avatar
                ref={ref}
                name={userFullName}
                as="button"
                getInitials={(name) =>
                    name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                }
                className={clsx('transition-transform', className)}
                src={`${API_BASE_URL}${userAvatar}`}
                isDisabled={isDisabled}
                {...rest}
            />
        );
    },
);
