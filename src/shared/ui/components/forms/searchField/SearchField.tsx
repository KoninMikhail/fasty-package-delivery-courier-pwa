import { InputProps } from '@nextui-org/input/dist/input';
import { forwardRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Input } from '@nextui-org/react';

interface SearchFieldProperties
    extends Omit<InputProps, 'startContent' | 'endContent'> {}
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProperties>(
    (properties, reference) => {
        const [value, setValue] = useState('');

        return (
            <Input
                ref={reference}
                placeholder={properties.placeholder}
                labelPlacement="outside"
                isClearable
                startContent={
                    <FiSearch className="pointer-events-none flex-shrink-0 text-xl text-default-400" />
                }
                endContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-small text-default-400">
                            @gmail.com
                        </span>
                    </div>
                }
            />
        );
    },
);
