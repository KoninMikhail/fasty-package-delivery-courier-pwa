import { Select, SelectItem } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { settingsModel } from '@/entities/viewer';
import { ChangeEventHandler } from 'react';
import { ALLOWED_COUNTS } from './config';

export const UpcomingItemsCountDropdown: FunctionComponent = () => {
    const currentCount = useUnit(settingsModel.$homeUpcomingDeliveriesCount);
    const setCount = useUnit(settingsModel.countChanged);

    const onSelectionChange: ChangeEventHandler<HTMLSelectElement> = (
        event,
    ): void => {
        const selectedCount = Number(event.target.value);
        setCount(selectedCount);
    };

    return (
        <Select
            aria-label="Upcoming items count"
            labelPlacement="outside-left"
            className="w-20"
            selectedKeys={[currentCount.toString()]}
            onChange={onSelectionChange}
        >
            {ALLOWED_COUNTS.map((item) => (
                <SelectItem key={item} value={item}>
                    {item.toString()}
                </SelectItem>
            ))}
        </Select>
    );
};
