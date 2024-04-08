import React from 'react';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import clsx from 'clsx';

export interface MenuItemProperties {
    to: string;
    icon?: React.ReactNode;
    label?: string;
    vertical?: boolean;
    classNames?: {
        item?: string;
        icon?: string;
    };
}

export const MenuItem: FunctionComponent<MenuItemProperties> = ({
    to,
    icon,
    label,
    vertical = false,
    classNames,
}) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });

    // Определение классов для элемента
    const outputClasslist = clsx(
        'py-1.5 text-xs font-light xl:text-xl',
        match ? 'text-default-600' : 'text-default', // Условно добавляем 'text-black' если элемент активен
        {
            'flex items-center': !vertical,
            'flex flex-col items-center justify-center': vertical,
        },
        classNames?.item,
    );

    // Определение классов для иконки
    const iconClasses = clsx(
        vertical
            ? clsx('mb-1 text-2xl xl:text-3xl', classNames?.icon)
            : clsx('mr-3 xl:text-3xl', classNames?.icon),
    );

    return (
        <Link to={to} className={outputClasslist}>
            {icon ? <span className={iconClasses}>{icon}</span> : null}
            {label}
        </Link>
    );
};
