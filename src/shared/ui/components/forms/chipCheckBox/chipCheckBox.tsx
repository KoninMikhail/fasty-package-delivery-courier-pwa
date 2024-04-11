import {
    useCheckbox,
    Chip,
    VisuallyHidden,
    tv,
    CheckboxProps,
} from '@nextui-org/react';

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

const checkbox = tv({
    slots: {
        base: 'border-default hover:bg-default-200',
        content: 'text-default-500',
    },
    variants: {
        isSelected: {
            true: {
                base: 'border-primary bg-primary hover:bg-primary-500 hover:border-primary-500',
                content: 'text-primary-foreground pl-1',
            },
        },
        isFocusVisible: {
            true: {
                base: 'outline-none ring-2 ring-focus ring-offset-2 ring-offset-background',
            },
        },
    },
});

/**
 * chipCheckBox
 * @param properties
 */
export const ChipCheckBox: FunctionComponent<CheckboxProps> = (properties) => {
    const {
        children,
        isSelected,
        isFocusVisible,
        getBaseProps,
        getLabelProps,
        getInputProps,
    } = useCheckbox({
        ...properties,
    });

    const styles = checkbox({ isSelected, isFocusVisible });

    return (
        <label {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <Chip
                classNames={{
                    base: styles.base(),
                    content: styles.content(),
                }}
                {...getLabelProps()}
            >
                {children || (isSelected ? 'Enabled' : 'Disabled')}
            </Chip>
        </label>
    );
};
