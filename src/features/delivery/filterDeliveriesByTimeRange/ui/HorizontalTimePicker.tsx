import { HorizontalScroll } from '@/shared/ui/layouts';
import { Chip } from '@nextui-org/react';
import { useUnit } from 'effector-react';
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
        const [timesRange, selected, pick] = useUnit([
            model.$readOnlyTimesRange,
            model.$selectedTimeRange,
            model.timePicked,
        ]);

        return (
            <div className="relative grid grid-cols-1 gap-1">
                <HorizontalScroll>
                    <div
                        className={clsx(
                            'flex gap-1',
                            containerProps && `${containerProps.className}`,
                        )}
                    >
                        {timesRange.map((time) => {
                            const onClickChip = (): void => {
                                pick(time);
                            };
                            const isSelected = selected.includes(time);
                            return (
                                <Chip
                                    key={time}
                                    color={isSelected ? 'primary' : 'default'}
                                    size="lg"
                                    onClick={onClickChip}
                                >
                                    {time}
                                </Chip>
                            );
                        })}
                    </div>
                </HorizontalScroll>
            </div>
        );
    },
);
