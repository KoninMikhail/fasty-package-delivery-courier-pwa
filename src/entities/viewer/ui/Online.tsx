import { useUnit } from 'effector-react';
import { PropsWithChildren } from 'react';
import { $$isOnline } from '../model/network';

export const Online: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const isOnline = useUnit($$isOnline);
    return isOnline ? children : null;
};
