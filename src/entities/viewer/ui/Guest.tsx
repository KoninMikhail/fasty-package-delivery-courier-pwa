import { PropsWithChildren, ReactNode } from 'react';
import { useUnit } from 'effector-react';
import { $initSessionComplete, $isAuthorized } from '../model/session';

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
    const isSessionReady = useUnit($initSessionComplete);
    const isAuthorized = useUnit($isAuthorized);
    if (isSessionReady && isAuthorized) return fallback;
    return children;
};
