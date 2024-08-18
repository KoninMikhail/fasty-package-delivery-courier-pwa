import { useGate } from 'effector-react';
import { RefreshToken } from '@/features/auth/refreshToken';

export const AppAuth: FunctionComponent = () => {
    useGate(RefreshToken.InitGate);
    return null;
};
