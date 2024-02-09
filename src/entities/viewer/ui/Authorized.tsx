import { PropsWithChildren } from 'react';
import { useUnit } from 'effector-react';
import { Navigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { sharedAuthEffects } from '@/shared/auth';
import { useEffectOnce } from 'usehooks-ts';
import { $$isAuthViewer } from '../model/sessionModel';

const { validateTokenFx } = sharedAuthEffects;
const { RouteName } = sharedConfigRoutes;
const { AUTH_PAGE } = RouteName;

export const Authorized: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const hasAuth = useUnit($$isAuthViewer);

    useEffectOnce(() => {
        void validateTokenFx();
    });

    return hasAuth ? children : <Navigate to={AUTH_PAGE} replace />;
};
