import { Skeleton } from '@nextui-org/react';
import { HorizontalScroll } from '@/shared/ui/layouts';

interface LoadingProperties {
    skeletonCount?: number;
}

export const Loading: FunctionComponent<LoadingProperties> = ({
    skeletonCount,
}) => {
    const count = skeletonCount ?? 3;

    const skeletons = Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className="rounded-lg">
            <div className="h-[175px] w-[300px]" />
        </Skeleton>
    ));

    return (
        <div className="block py-4">
            <HorizontalScroll>
                <div className="flex flex-nowrap justify-start gap-4 px-4">
                    {skeletons}
                </div>
            </HorizontalScroll>
        </div>
    );
};
