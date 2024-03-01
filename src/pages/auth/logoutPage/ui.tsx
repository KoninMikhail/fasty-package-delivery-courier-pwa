import { Spinner } from '@nextui-org/react';
import { Navigate } from 'react-router-dom';

import { sharedConfigRoutes } from '@/shared/config';
import { useTimeout } from 'usehooks-ts';
import { useUnit } from 'effector-react';
import { $logoutCompleted, logoutPageInit } from './model';

const { RouteName } = sharedConfigRoutes;
const { AUTH_PAGE } = RouteName;

export const LogoutPage: FunctionComponent = () => {
    const initialReady = useUnit(logoutPageInit);
    const isComplete = useUnit($logoutCompleted);

    useTimeout(() => {
        initialReady();
    }, 500);

    if (isComplete) {
        return <Navigate to={AUTH_PAGE} replace />;
    }

    return (
        <div className="grid h-dvh w-screen items-center justify-center">
            <Spinner color="default" labelColor="foreground" size="lg" />
        </div>
    );
};
