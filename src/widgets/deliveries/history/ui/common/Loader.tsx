import { FunctionComponent } from 'react';
import { Skeleton } from '@nextui-org/react';

export const Loader: FunctionComponent = () => (
    <div className="flex h-full w-full flex-col gap-3 px-2 py-4">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
    </div>
);
