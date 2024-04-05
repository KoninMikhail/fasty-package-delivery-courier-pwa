import { useUnit } from 'effector-react';
import { PropsWithChildren } from 'react';
import { $$isOnline } from '../model/session';

export const Offline: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const isOnline = useUnit($$isOnline);
    return isOnline ? null : children;
};
