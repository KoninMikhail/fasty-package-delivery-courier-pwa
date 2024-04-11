import { Spinner } from '@nextui-org/react';

export const Loading: FunctionComponent = () => {
    return (
        <div className="flex h-dvh w-screen flex-col items-center justify-center gap-8">
            <Spinner color="default" size="lg" />
        </div>
    );
};
