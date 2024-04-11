import type { ReactNode } from 'react';
import clsx from 'clsx';

interface IMenuProperties<T> {
    orientation: 'horizontal' | 'vertical';
    items: T[];
    renderItem: (properties: T) => ReactNode;
    stretch?: boolean;
}

export const Menu = <T extends object>({
    items,
    renderItem,
    orientation = 'horizontal',
    stretch = false,
    ...properties
}: IMenuProperties<T>): ReactNode => {
    const outputCSSClasslist = clsx('flex', {
        'flex-row': orientation === 'horizontal',
        'flex-col': orientation === 'vertical',
        'justify-between': stretch,
    });

    return (
        <nav className={outputCSSClasslist} {...properties}>
            {items.map((item) => renderItem(item))}
        </nav>
    );
};
