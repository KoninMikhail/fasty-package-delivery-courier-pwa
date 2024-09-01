import { useUnit } from 'effector-react';
import { PropsWithChildren } from 'react';
import { $$isOnline } from '../model/network';

export const Offline: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const isOnline = useUnit($$isOnline);
    return isOnline ? null : children;
};
