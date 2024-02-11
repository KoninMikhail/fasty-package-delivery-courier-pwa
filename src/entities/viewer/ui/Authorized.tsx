import { PropsWithChildren, useEffect } from 'react';
import { useUnit } from 'effector-react';
import { Navigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { sharedAuthEffects } from '@/shared/auth';
import { couriersApi } from '@/shared/api';
import { $session, requestProtectedContent } from '../model/sessionModel';

const { revalidateTokenFx } = sharedAuthEffects;
const { RouteName } = sharedConfigRoutes;
const { AUTH_PAGE } = RouteName;

export const Authorized: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const session = useUnit($session);
    const validateSession = useUnit(requestProtectedContent);

    useEffect(() => {
        void couriersApi.getViewer().then((viewer) => {
            if (viewer) {
                console.log('me', viewer);
            }
        });
    }, []);

    return session ? children : <Navigate to={AUTH_PAGE} replace />;
};
