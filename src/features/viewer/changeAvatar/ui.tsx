import { Button } from '@nextui-org/react';
import { modelView } from 'effector-factorio';
import { factory } from './model';

export const UploadButton = modelView(factory, () => {
    const onPress = (): void => console.log('UploadButton');

    return (
        <Button onPress={onPress} variant="bordered" size="sm">
            Change avatar
        </Button>
    );
});
