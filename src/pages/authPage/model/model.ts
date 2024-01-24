import { createEffect } from 'effector';
import { AuthByEmail } from '@/features/auth/authByEmail';

const registerUserFx = createEffect((e) => console.log(e));

export const authUserByEmailModel = AuthByEmail.factory.createModel({
    registerFx: registerUserFx,
});
