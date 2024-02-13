import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { useGate, useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { $isAuthorized, AuthGate } from '../model/sessionModel';

const { RouteName } = sharedConfigRoutes;
const { AUTH_PAGE } = RouteName;

const DEFAULT_AWAIT_SESSION_TIMEOUT = 5000;

interface IAuthorizedProperties extends PropsWithChildren {
    awaitSessionTimeout?: number;
    fallback?: Nullable<ReactNode>;
}

/**
 * @name Authorized
 * @description Component for checking user authorization
 * @constructor
 */
export const Authorized: FunctionComponent<IAuthorizedProperties> = ({
    awaitSessionTimeout = DEFAULT_AWAIT_SESSION_TIMEOUT,
    fallback = null,
    children,
}) => {
    const navigate = useNavigate();
    const isAuthorized = useUnit($isAuthorized);

    // Initialize the AuthGate only once when the component is mounted
    useGate(AuthGate);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (!isAuthorized) {
            // Set timeout only if not authorized
            timeout = setTimeout(() => {
                navigate(AUTH_PAGE, { replace: true });
            }, awaitSessionTimeout);
        }

        // Clear timeout when the component unmounts or if isAuthorized changes
        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [awaitSessionTimeout, isAuthorized, navigate]);

    return isAuthorized ? children : fallback;
};
