import { modelView } from 'effector-factorio';
import { Button } from '@nextui-org/react';
import { factory } from '../model/model';

export const AssignRequestButton = modelView(factory, () => {
    return <Button>Assign</Button>;
});
