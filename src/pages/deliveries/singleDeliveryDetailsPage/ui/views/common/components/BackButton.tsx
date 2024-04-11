import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { LuArrowLeft } from 'react-icons/lu';

export const BackButton: FunctionComponent = () => {
    const navigate = useNavigate();
    const onClick = (): void => {
        navigate(-1);
    };
    return (
        <Button isIconOnly color="default" aria-label="Like" onPress={onClick}>
            <LuArrowLeft />
        </Button>
    );
};
