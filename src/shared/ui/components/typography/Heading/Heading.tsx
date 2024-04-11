import React from 'react';
import clsx from 'clsx';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProperties extends React.HTMLAttributes<HTMLHeadingElement> {
    tag?: Tag; // позволяет выбрать HTML тег для компонента
    size?: 'small' | 'medium' | 'large';
    color?: string;
    weight?: 'light' | 'normal' | 'bold';
}

export const Heading: FunctionComponent<HeadingProperties> = ({
    tag: Tag = 'h1', // установить h1 по умолчанию
    size,
    color,
    weight,
    children,
    className,
    ...properties
}) => {
    const sizeClasses = {
        small: 'text-sm',
        medium: 'text-lg',
        large: 'text-xl',
    };

    // переменная для веса шрифта
    const weightClasses = {
        light: 'font-light',
        normal: 'font-normal',
        bold: 'font-bold',
    };

    // Здесь используются обновленные стили
    const headingClasses = clsx(
        size ? sizeClasses[size] : sizeClasses.medium,
        weight ? weightClasses[weight] : weightClasses.normal,
        color && `text-${color}-700`,
        className,
    );

    return (
        // Применение переменной Tag для создания компонента с нужным тегом }
        <Tag className={headingClasses} {...properties}>
            {children}
        </Tag>
    );
};
