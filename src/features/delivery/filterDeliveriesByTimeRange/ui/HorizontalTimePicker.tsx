import { HorizontalScroll } from '@/shared/ui/layouts';
import { Chip } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { modelView } from 'effector-factorio';
import { factory } from '../model';

export const HorizontalTimePicker = modelView(factory, () => {
    const model = factory.useModel();
    const [timesRange, selected, pick] = useUnit([
        model.$readOnlyTimesRange,
        model.$selectedTimeRange,
        model.timePicked,
    ]);

    return (
        <div className="relative grid grid-cols-1 gap-1">
            <HorizontalScroll>
                <div className="flex gap-1">
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
});
