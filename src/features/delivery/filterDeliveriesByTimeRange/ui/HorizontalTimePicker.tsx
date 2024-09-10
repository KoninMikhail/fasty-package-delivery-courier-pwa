import { HorizontalScroll } from '@/shared/ui/layouts';
import { useUnit } from 'effector-react';
import { modelView } from 'effector-factorio';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import { Button } from '@nextui-org/react';
import { factory } from '../model';

interface HorizontalTimePickerProperties {
    containerProps?: HTMLAttributes<HTMLDivElement>;
}

export const HorizontalTimePicker = modelView(
    factory,
    ({ containerProps }: HorizontalTimePickerProperties) => {
        const model = factory.useModel();
        const [range, selected, pick] = useUnit([
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
                        {range.map((time) => {
                            const onClickChip = (): void => {
                                pick(time);
                            };
                            const isSelected = selected.includes(time);

                            return (
                                <Button
                                    key={time}
                                    onClick={onClickChip}
                                    size="md"
                                    variant={isSelected ? 'solid' : 'bordered'}
                                    className="rounded-full"
                                    color={isSelected ? 'primary' : 'default'}
                                >
                                    {time}
                                </Button>
                            );
                        })}
                    </div>
                </HorizontalScroll>
            </div>
        );
    },
);
