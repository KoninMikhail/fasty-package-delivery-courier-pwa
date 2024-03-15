import {createEffect} from "effector";

export const uploadNewAvatarFx = createEffect<File, void, Error>(async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    try {
        await fetch('/api/user/avatar', {
            method: 'POST',
            body: formData,
        });
    } catch (error) {
        console.log(error);
    }
}