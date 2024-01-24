import { Spacer } from '@nextui-org/react';
import { sharedUiComponents } from '@/shared/ui';
import { ReactNode } from 'react';

const { Text } = sharedUiComponents;

/**
 * @name Greetings
 * @description Common component for greetings
 * @returns {ReactNode}
 */
export const Greetings: FunctionComponent<{
    heading: string;
    description: string;
    align?: 'center' | 'left' | 'right';
}> = ({ heading, description, align = 'left' }): ReactNode => {
    const alignClass = {
        center: 'text-center',
        left: 'text-left',
        right: 'text-right',
    }[align];

    return (
        <div className={`relative ${alignClass}`}>
            <Text size="large" weight="bold">
                {heading}
            </Text>
            <Spacer y={1} />
            <Text as="span" size="small">
                {description}
            </Text>
        </div>
    );
};

export default Greetings;
