import type { PropsWithChildren } from 'react';

export const Guest: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const isValidAuth = true;

    if (isValidAuth) {
        return null;
    }

    return children;
};
