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

    const verticalClasses = 'flex flex-col items-center justify-center';
    const horizontalClasses = 'flex items-center';

    const baseClasses = clsx(
        'px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-200',
        {
            [horizontalClasses]: !vertical,
            [verticalClasses]: vertical,
        },
    );

    const activeClasses = 'bg-gray-900 text-white';

    return (
        <Link to={to} className={clsx(baseClasses, match && activeClasses)}>
            {icon ? (
                <span className={clsx(vertical ? 'mb-1' : 'mr-3')}>{icon}</span>
            ) : null}
            {label}
        </Link>
    );
};
