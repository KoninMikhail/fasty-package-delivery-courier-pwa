import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';

const SuspenseLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <Suspense
            fallback={
                <div>
                    <div>loading</div>
                </div>
            }
        >
            {children}
        </Suspense>
    );
};

export default SuspenseLayout;
