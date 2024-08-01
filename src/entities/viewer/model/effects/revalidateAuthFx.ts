import { createEffect } from 'effector';
import { Fail } from 'effector-storage';
import { getViewerProfileFx, logoutFx, refreshAuthTokensFx } from '.';

export const revalidateAuthFx = createEffect<Fail<Error>, void>(async () => {
    await refreshAuthTokensFx()
        .then(async () => getViewerProfileFx())
        .catch(async () => logoutFx());
});
