import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import type { SwitchProps } from '@nextui-org/react';
import { Switch } from '@nextui-org/react';
import { sharedUiIcons } from '@/shared/ui';

const { SunIcon, MoonIcon } = sharedUiIcons;

interface ISwitchThemeModeProperties {
    size?: SwitchProps['size'];
    color?: SwitchProps['color'];
}

export const SwitchThemeMode: FunctionComponent<ISwitchThemeModeProperties> = ({
    size = 'lg',
    color = 'success',
}) => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    const onClickThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setTheme(event.target.checked ? 'dark' : 'light');
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Switch
            defaultSelected={theme === 'dark'}
            size={size}
            color={color}
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
            onChange={onClickThemeChange}
        />
    );
};
