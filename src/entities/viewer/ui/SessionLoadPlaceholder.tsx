import { Spinner } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { $isAuthorized } from '../model/session';

export const SessionLoadPlaceholder: FunctionComponent = () => {
    const isAuth = useUnit($isAuthorized);
    if (isAuth) return null;
    return (
        <div className="fixed z-[9998] flex h-screen w-screen items-center justify-center bg-background">
            <Spinner />
        </div>
    );
};
