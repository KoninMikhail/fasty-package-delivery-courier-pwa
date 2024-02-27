import {
    Button,
    ButtonProps,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import { useMemo, useState } from 'react';

interface DeliveryTypeFilterProperties extends ButtonProps {}

export const DeliveryTypeFilter: FunctionComponent<
    DeliveryTypeFilterProperties
> = (properties) => {
    const [selectedKeys, setSelectedKeys] = useState(new Set(['text']));

    const selectedValue = useMemo(
        () => [...selectedKeys].join(', ').replaceAll('_', ' '),
        [selectedKeys],
    );

    const dict = {
        unfiltered: 'Не выбрано',
        oncar: 'На машине',
        walk: 'Пешком',
    }[selectedValue];

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered">{selectedValue}</Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
            >
                <DropdownItem key="unfiltered">Не выбрано</DropdownItem>
                <DropdownItem key="oncar">На машине</DropdownItem>
                <DropdownItem key="walk">Пешком</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
