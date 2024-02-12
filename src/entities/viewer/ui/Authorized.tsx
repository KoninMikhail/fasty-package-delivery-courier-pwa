import { PropsWithChildren } from 'react';
import { useGate, useUnit } from 'effector-react';
import { Navigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { $session, AuthGate } from '../model/sessionModel';

const { RouteName } = sharedConfigRoutes;
const { AUTH_PAGE } = RouteName;

export const Authorized: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const session = useUnit($session);
    useGate(AuthGate);
    return session ? children : <Navigate to={AUTH_PAGE} replace />;
};
