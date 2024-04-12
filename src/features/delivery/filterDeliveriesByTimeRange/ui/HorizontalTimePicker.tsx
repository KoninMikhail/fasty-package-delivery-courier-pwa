import { HorizontalScroll } from '@/shared/ui/layouts';
import { Chip } from '@nextui-org/react';
import { useList, useUnit } from 'effector-react';
import { modelView } from 'effector-factorio';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import { factory } from '../model';

interface HorizontalTimePickerProperties {
    containerProps?: HTMLAttributes<HTMLDivElement>;
}

export const HorizontalTimePicker = modelView(
    factory,
    ({ containerProps }: HorizontalTimePickerProperties) => {
        const model = factory.useModel();
        const [selected, pick] = useUnit([
            model.$selectedTimeRange,
            model.timePicked,
        ]);

        const times = useList(model.$readOnlyTimesRange, (time) => {
            const onClickChip = (): void => {
                pick(time);
            };
            const isSelected = selected.includes(time);

            return (
                <Chip
                    onClick={onClickChip}
                    size="lg"
                    color={isSelected ? 'primary' : 'default'}
                >
                    {time}
                </Chip>
            );
        });

        return (
            <div className="relative grid grid-cols-1 gap-1">
                <HorizontalScroll>
                    <div
                        className={clsx(
                            'flex gap-1',
                            containerProps && `${containerProps.className}`,
                        )}
                    >
                        {times}
                    </div>
                </HorizontalScroll>
            </div>
        );
    },
);
