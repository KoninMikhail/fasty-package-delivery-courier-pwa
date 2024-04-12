import { ChangeEvent, forwardRef } from 'react';
import { Input, InputProps } from '@nextui-org/react';
import { sharedLibHelpers } from '@/shared/lib';

const { padCharacters, clearPaddedCharacters } = sharedLibHelpers;

type IdentifierFieldProperties = Omit<InputProps, 'type' | 'startContent'> & {
    padLength?: number;
};

export const IdentifierField = forwardRef<
    HTMLInputElement,
    IdentifierFieldProperties
>(
    (
        { onChange, padLength, onValueChange, value, placeholder, ...rest },
        reference,
    ) => {
        const extractNumbers = (inputValue: InputProps['value']): string => {
            if (!inputValue) return '';
            return inputValue.replaceAll(/\D/g, '');
        };

        const sanitizeValue = (inputValue: string): string => {
            if (!inputValue) return '';
            return clearPaddedCharacters(extractNumbers(inputValue));
        };

        const onValueChangeHandler = (inputValue: string): void => {
            onValueChange?.(sanitizeValue(inputValue));
        };
        const onChangeHandler = (
            event: ChangeEvent<HTMLInputElement>,
        ): ChangeEvent<HTMLInputElement> => {
            return {
                ...event,
                target: {
                    ...event.target,
                    value: sanitizeValue(event.target.value),
                },
            };
        };

        return (
            <Input
                ref={reference}
                type="number"
                min={0}
                step={1}
                value={value}
                placeholder={placeholder}
                onValueChange={onValueChangeHandler}
                onChange={onChangeHandler}
                {...rest}
            />
        );
    },
);
