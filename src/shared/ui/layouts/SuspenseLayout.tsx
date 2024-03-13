import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';
import { Spinner } from '@nextui-org/react';

const SuspenseLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <Suspense
            fallback={
                <div className="flex h-full w-full items-center justify-center">
                    <Spinner color="default" className="m-2" />
                </div>
            }
        >
            {children}
        </Suspense>
    );
};

export default SuspenseLayout;
