import React from 'react';
import clsx from 'clsx';

type HTMLTextElement = 'p' | 'span' | 'div' | 'label' | 'strong' | 'em';

interface TextProperties extends React.HTMLAttributes<HTMLElement> {
    as?: HTMLTextElement;
    size?: 'small' | 'base' | 'large';
    color?: string;
    weight?: 'light' | 'normal' | 'bold';
}

export const Text: FunctionComponent<TextProperties> = ({
    as: Component = 'p', // Значение 'p' по умолчанию
    size,
    color,
    weight,
    children,
    className,
    ...properties
}) => {
    const sizeClasses = {
        small: 'text-sm',
        base: 'text-base',
        large: 'text-lg',
    };

    const weightClasses = {
        light: 'font-light',
        normal: 'font-normal',
        bold: 'font-bold',
    };

    const textClasses = clsx(
        sizeClasses[size] || sizeClasses.base,
        weightClasses[weight] || weightClasses.normal,
        color && `text-${color}-700`,
        className,
    );

    return (
        <Component className={textClasses} {...properties}>
            {children}
        </Component>
    );
};
