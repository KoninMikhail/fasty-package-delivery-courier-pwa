import { Button, ButtonProps } from '@nextui-org/react';
import { FaFireAlt } from 'react-icons/fa';

interface ExpressFilterProperties extends ButtonProps {}

export const ExpressFilter: FunctionComponent<ExpressFilterProperties> = (
    properties,
) => {
    return (
        <div className="flex justify-center">
            <Button
                color="primary"
                size="sm"
                variant="bordered"
                className="rounded-full uppercase"
                onClick={() => {
                    console.log('ExpressButton');
                }}
            >
                <FaFireAlt />
                Срочная
            </Button>
        </div>
    );
};
