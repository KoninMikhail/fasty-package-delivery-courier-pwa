import { useState } from 'react';
import { Avatar } from '@nextui-org/react';

export const AccountDataEditor: FunctionComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onPressButton = (): void => setIsOpen(true);
    const onClosePopup = (): void => setIsOpen(false);

    return (
        <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
    );
};
