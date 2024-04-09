import { useTranslation } from 'react-i18next';
import { Spacer } from '@nextui-org/react';
import { ChangePassword } from '@/features/viewer/changePassword';
import {
    CHANGE_PASSWORD_DESCRIPTION,
    CHANGE_PASSWORD_LABEL,
    translationNS,
} from '../../../config';
import { changePasswordModel } from '../../../model';

export const PasswordTool: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div>
            <h2 className="text-xl font-bold">{t(CHANGE_PASSWORD_LABEL)}</h2>
            <Spacer y={2} />
            <p className="text-sm">{t(CHANGE_PASSWORD_DESCRIPTION)}</p>
            <Spacer y={4} />
            <div className="flex flex-col gap-4">
                <ChangePassword.Form model={changePasswordModel} />
            </div>
        </div>
    );
};
