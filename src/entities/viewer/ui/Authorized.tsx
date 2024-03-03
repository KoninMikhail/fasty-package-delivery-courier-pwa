import { PropsWithChildren, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { useGate, useUnit } from 'effector-react';
import { sharedLibInit } from '@/shared/lib';
import {
    $isSessionAuthorized,
    $isSessionPending,
    SessionInitGate,
} from '../model/sessionModel';

const { RouteName } = sharedConfigRoutes;
const { AUTH_PAGE } = RouteName;
const { $isAppStarted } = sharedLibInit;

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
    children,
    fallback = null,
}) => {
    const isStarted = useUnit($isAppStarted);
    const isPending = useUnit($isSessionPending);
    const isAuthorized = useUnit($isSessionAuthorized);

    useGate(SessionInitGate);

    if (!isStarted || isPending) {
        return fallback;
    }

    if (!isAuthorized && isStarted) {
        return <Navigate to={AUTH_PAGE} />;
    }

    return children;
};
