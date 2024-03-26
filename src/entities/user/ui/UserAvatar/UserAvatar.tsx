import { Avatar, AvatarProps } from '@nextui-org/react';
import { User } from '@/shared/api';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { getFullUserName, getUserAvatarUrl } from '../../lib';

/* eslint-disable react/jsx-props-no-spreading */

interface IUserAvatarProperties extends AvatarProps {
    user: User;
}

export const UserAvatar = forwardRef<HTMLButtonElement, IUserAvatarProperties>(
    ({ user, className, ...rest }, reference) => {
        const userFullName = getFullUserName(user);
        const userAvatar = getUserAvatarUrl(user);
        return (
            <Avatar
                ref={reference}
                name={userFullName}
                as="button"
                getInitials={(name) =>
                    name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                }
                className={clsx('transition-transform', className)}
                src={userAvatar}
                {...rest}
            />
        );
    },
);
