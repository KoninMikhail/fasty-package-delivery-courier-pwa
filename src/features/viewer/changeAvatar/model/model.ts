import { modelFactory } from 'effector-factorio';
import { combine, createEvent, createStore, Effect, sample } from 'effector';
import { User } from '@/shared/api';

interface FactoryOptions {
    user: User;
    changeAvatarFx: Effect<{ avatar: string; userId: User['id'] }, any>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const cancelPressed = createEvent();
    const confirmPressed = createEvent();
    const dataUrlChanged = createEvent<string>();

    const $isPending = options.changeAvatarFx.pending;

    const $dataUrl = createStore<string>('');
    $dataUrl.on(dataUrlChanged, (_, dataUrl) => dataUrl);

    sample({
        clock: confirmPressed,
        source: combine($dataUrl, options.user.id, (avatar, userId) => ({
            avatar,
            userId,
        })),
        target: options.changeAvatarFx,
    });

    return {
        $isPending,
        cancelPressed,
        confirmPressed,
        $dataUrl,
        dataUrlChanged,
    };
});
