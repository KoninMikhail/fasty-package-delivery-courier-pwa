import { Avatar, AvatarProps, Skeleton } from '@nextui-org/react';
import { User } from '@/shared/api';
import { getUserInitials } from '../../lib/utils';

interface IUserAvatarProperties {
    user: Nullable<User>;
    isBordered?: AvatarProps['isBordered'];
}

export const UserAvatar: FunctionComponent<IUserAvatarProperties> = ({
    user,
    isBordered,
}) => {
    const userInitials = (user && getUserInitials(user)) || undefined;
    const userAvatar = user?.avatar || undefined;

    const isLoaded = !!user;

    return (
        <Skeleton isLoaded={isLoaded} className="rounded-full">
            <Avatar
                isBordered={isBordered}
                name={userInitials}
                as="button"
                className="transition-transform"
                src={userAvatar}
            />
        </Skeleton>
    );
};
