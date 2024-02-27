import { forwardRef, useState } from 'react';
import { Input } from '@nextui-org/react';
import { InputProps } from '@nextui-org/input/dist/input';
import { EyeFilledIcon, EyeSlashFilledIcon } from '../../../icons';

type PasswordFieldProperties = Omit<InputProps, 'type' | 'endContent'>;

export const PasswordField = forwardRef<
    HTMLInputElement,
    PasswordFieldProperties
>((properties, reference) => {
    const [isVisible, setIsVisible] = useState(false);
    const onToggleVisibility = (): void => setIsVisible(!isVisible);

    return (
        <Input
            ref={reference}
            type={isVisible ? 'text' : 'password'}
            endContent={
                <button
                    className="focus:outline-none"
                    type="button"
                    onClick={onToggleVisibility}
                >
                    {isVisible ? (
                        <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                    ) : (
                        <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                    )}
                </button>
            }
            {...properties}
        />
    );
});
