import React from 'react';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import clsx from 'clsx';

export interface MenuItemProperties {
    to: string;
    icon?: React.ReactNode;
    label?: string;
    vertical?: boolean;
}

export const MenuItem: FunctionComponent<MenuItemProperties> = ({
    to,
    icon,
    label,
    vertical = false,
}) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });

    // Определение классов для элемента
    const outputClasslist = clsx(
        'px-4 py-1.5 text-xs font-light',
        match
            ? 'text-black dark:text-white'
            : 'text-gray-500 dark:text-gray-800', // Условно добавляем 'text-black' если элемент активен
        {
            'flex items-center': !vertical,
            'flex flex-col items-center justify-center': vertical,
        },
    );

    // Определение классов для иконки
    const iconClasses = clsx(vertical ? 'mb-1 text-2xl' : 'mr-3');

    return (
        <Link to={to} className={outputClasslist}>
            {icon ? <span className={iconClasses}>{icon}</span> : null}
            {label}
        </Link>
    );
};
