import { useTheme } from 'next-themes';
import { FunctionComponent, useMemo, useState } from 'react';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    SwitchProps,
    Selection,
} from '@nextui-org/react';
import { RiArrowDownSFill } from 'react-icons/ri';
import {
    DarkText,
    LightText,
    SystemText,
} from '@/features/viewer/changeColorMode/ui/common';

interface IChangeColorModeSwitchButtonProperties {
    size?: SwitchProps['size'];
    color?: SwitchProps['color'];
}

/**
 * View
 */
export const ChangeColorModeSwitchButton: FunctionComponent<
    IChangeColorModeSwitchButtonProperties
> = ({ size, color }) => {
    const { theme, setTheme } = useTheme();
    const [selectedKeys, setSelectedKeys] = useState<Selection>(
        new Set([theme || 'system']),
    );

    const selectedValue = useMemo(() => {
        const themeKey = [...selectedKeys].join(', ').replaceAll('_', ' ');
        setTheme(themeKey);
        if (themeKey === 'system') {
            return <SystemText />;
        }
        if (themeKey === 'light') {
            return <LightText />;
        }
        if (themeKey === 'dark') {
            return <DarkText />;
        }
        return themeKey;
    }, [selectedKeys, setTheme]);
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="light"
                    className="bg-transparent bg-none pr-unit-0 capitalize data-[hover=true]:bg-transparent"
                    color={color}
                    size={size}
                    endContent={<RiArrowDownSFill />}
                >
                    {selectedValue}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
            >
                <DropdownItem key="system">
                    <SystemText />
                </DropdownItem>
                <DropdownItem key="light">
                    <LightText />
                </DropdownItem>
                <DropdownItem key="dark">
                    <DarkText />
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
