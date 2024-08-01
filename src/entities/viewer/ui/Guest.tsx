import { PropsWithChildren } from 'react';
import { useUnit } from 'effector-react';
import { Navigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { $initSessionComplete, $isAuthorized } from '../model/session';

const { RouteName } = sharedConfigRoutes;
const { ROOT_PAGE } = RouteName;

interface IAuthorizedProperties extends PropsWithChildren {
    redirectToPathIfAuthorized?: string;
}

/**
 * @name Guest
 * @description Component for checking user authorization
 * @constructor
 */
export const Guest: FunctionComponent<IAuthorizedProperties> = ({
    redirectToPathIfAuthorized = null,
    children,
}) => {
    const isSessionReady = useUnit($initSessionComplete);
    const isAuthorized = useUnit($isAuthorized);

    if (isSessionReady && isAuthorized) {
        return (
            <Navigate to={redirectToPathIfAuthorized || ROOT_PAGE} replace />
        );
    }

    return children;
};
