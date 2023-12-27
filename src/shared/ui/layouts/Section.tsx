import { PropsWithChildren } from 'react';

export const Section: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <section className="grid gap-4 p-4">{children}</section>
);
