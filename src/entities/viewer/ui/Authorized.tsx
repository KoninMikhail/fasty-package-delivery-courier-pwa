import { PropsWithChildren, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { useUnit } from 'effector-react';
import { Spinner } from '@nextui-org/react';
import { LOADING_PLACEHOLDER_TIMEOUT_BEFORE_LOGOUT } from '../config';
import { $isAuthorized } from '../model/session';

const { RouteName } = sharedConfigRoutes;
const { AUTH_PAGE } = RouteName;

/**
 * @name Authorized
 * @description Component for checking user authorization
 * @constructor
 */
export const Authorized: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const isAuthorized = useUnit($isAuthorized);
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

    const timeoutBeforeLogout =
        LOADING_PLACEHOLDER_TIMEOUT_BEFORE_LOGOUT * 1000;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isAuthorized) {
                setShouldRedirect(true);
            }
        }, timeoutBeforeLogout); // Замените 5000 на нужное время в мс

        return () => clearTimeout(timer);
    }, [isAuthorized, timeoutBeforeLogout]);

    if (shouldRedirect) {
        return <Navigate to={AUTH_PAGE} />;
    }

    if (isAuthorized === undefined || isAuthorized === null) {
        return (
            <div className="fixed bottom-0 left-0 right-0 top-0 z-[9998] flex h-screen w-screen flex-col items-center justify-center bg-background">
                <Spinner />
            </div>
        );
    }

    if (!isAuthorized) {
        return <Navigate to={AUTH_PAGE} />;
    }

    return children;
};
