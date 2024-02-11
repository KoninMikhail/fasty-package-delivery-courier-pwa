import { useTheme } from 'next-themes';
import { ChangeEvent, FunctionComponent } from 'react';
import type { SwitchProps } from '@nextui-org/react';
import { Switch } from '@nextui-org/react';
import { sharedUiIcons } from '@/shared/ui';
import { useIsMounted } from 'usehooks-ts';

const { SunIcon, MoonIcon } = sharedUiIcons;

/**
 * Components
 */
interface ThumbIconProperties {
    isSelected: boolean;
    className: string;
}

const ThumbIcon: FunctionComponent<ThumbIconProperties> = ({
    isSelected,
    className,
}) => {
    return isSelected ? (
        <SunIcon className={className} />
    ) : (
        <MoonIcon className={className} />
    );
};

interface IChangeColorModeSwitchButtonProperties {
    size?: SwitchProps['size'];
    color?: SwitchProps['color'];
}

/**
 * View
 */
export const ChangeColorModeSwitchButton: FunctionComponent<
    IChangeColorModeSwitchButtonProperties
> = ({ size = 'lg', color = 'success' }) => {
    const isMounted = useIsMounted();
    const { theme, setTheme } = useTheme();

    const onClickThemeChange = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        setTheme(event.target.checked ? 'light' : 'dark');
    };

    if (!isMounted()) return null;

    return (
        <Switch
            defaultSelected={theme === 'light'}
            size={size}
            color={color}
            thumbIcon={ThumbIcon}
            onChange={onClickThemeChange}
        />
    );
};
