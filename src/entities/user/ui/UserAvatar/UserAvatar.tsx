import { Avatar, AvatarProps } from '@nextui-org/react';
import { User } from '@/shared/api';
import { forwardRef } from 'react';
import clsx from 'clsx';

/* eslint-disable unicorn/prevent-abbreviations */

interface IUserAvatarProperties extends AvatarProps {
    user: Nullable<User>;
}

export const UserAvatar = forwardRef<HTMLButtonElement, IUserAvatarProperties>(
    ({ user, className, ...rest }, ref) => {
        const name = `${user?.first_name} ${user?.last_name}`;
        const userAvatar = user?.avatar || undefined;

        const outClasslist = clsx('transition-transform', className);

        return (
            <Avatar
                ref={ref}
                name={name}
                as="button"
                getInitials={(name) =>
                    name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                }
                className={outClasslist}
                src={userAvatar}
                {...rest}
            />
        );
    },
);
