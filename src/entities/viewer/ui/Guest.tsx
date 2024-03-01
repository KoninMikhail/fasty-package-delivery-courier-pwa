import { PropsWithChildren, ReactNode } from 'react';
import { useUnit } from 'effector-react';
import { $isSessionAuthorized } from '../model/sessionModel';

interface IAuthorizedProperties extends PropsWithChildren {
    fallback?: Nullable<ReactNode>;
}

/**
 * @name Guest
 * @description Component for checking user authorization
 * @constructor
 */
export const Guest: FunctionComponent<IAuthorizedProperties> = ({
    fallback = null,
    children,
}) => {
    const isAuthorized = useUnit($isSessionAuthorized);
    return isAuthorized ? fallback : children;
};
