import { useTranslation } from 'react-i18next';
import { getFullUserName } from '@/entities/user/lib';
import { Button, Spacer } from '@nextui-org/react';
import { IoPencil } from 'react-icons/io5';
import { useUnit } from 'effector-react';
import { sessionModel } from '@/entities/viewer';
import { memo } from 'react';
import { sharedLibHelpers } from '@/shared/lib';
import {
    EMAIL_LABEL,
    FULL_NAME_LABEL,
    PERSONAL_INFO_LABEL,
    PHONE_LABEL,
    translationNS,
    UNKNOWN_LABEL,
} from '../../../config';

const { getMaskedPhone } = sharedLibHelpers;

// Defining a TypeScript type for keys representing user information.
type UserInfoKey = 'fullName' | 'email' | 'phone';

// Defining props for the InformationSection component.
interface InformationSectionProperties {
    labelKey: string; // Key for the label to display.
    value: string; // Value associated with the label.
}

// A memoized component displaying a specific piece of user information.
const InformationSection: FunctionComponent<InformationSectionProperties> =
    memo(({ labelKey, value }) => {
        const { t } = useTranslation(translationNS); // Hook for translation.
        return (
            <div className="w-full max-w-xs">
                <div className="mb-0.5 block text-xs text-default-400">
                    {/* Translates labelKey to display the corresponding label */}
                    {t(labelKey)}
                </div>
                <div>{value}</div>{' '}
                {/* Displays the value passed to the component */}
            </div>
        );
    });

/**
 * PersonalInfo component displays the personal information of the logged-in user,
 * such as full name, email, and phone number. It utilizes internationalization for
 * labels and gracefully handles unknown values.
 */
export const PersonalInfo: FunctionComponent = () => {
    const user = useUnit(sessionModel.$viewerProfileData); // Fetches the user's profile data.
    const { t } = useTranslation(translationNS); // Hook for translation functionalities.

    // Holds user's personal information with fallbacks for unknown values.
    const userInfo: Record<UserInfoKey, string> = {
        fullName: getFullUserName(user) || t(UNKNOWN_LABEL), // Attempts to get full name or defaults to 'Unknown'.
        email: user?.email ?? t(UNKNOWN_LABEL), // Uses the email if available or defaults to 'Unknown'.
        phone: user?.phone ? getMaskedPhone(user.phone) : t(UNKNOWN_LABEL), // Uses the phone number if available or defaults to 'Unknown'.
    };

    // Mapping from user info keys to their respective label translation keys.
    const labelKeys: Record<UserInfoKey, string> = {
        fullName: FULL_NAME_LABEL, // Full Name label
        email: EMAIL_LABEL, // Email label
        phone: PHONE_LABEL, // Phone label
    };

    return (
        <div className="w-full rounded-xl border-2 p-4">
            <div className="flex justify-between gap-2">
                <h2 className="text-xl font-bold">{t(PERSONAL_INFO_LABEL)}</h2>{' '}
                {/* Displays 'Personal Information' title */}
                <Button size="sm" isDisabled isIconOnly>
                    {/* Disabled edit button */}
                    <IoPencil />
                </Button>
            </div>
            <Spacer y={4} /> {/* Adds vertical space for layout purposes */}
            <div className="flex flex-col gap-2 md:flex-row">
                {/* Iterates over the userInfo object and renders an InformationSection for each entry */}
                {Object.entries(userInfo).map(([key, value]) => (
                    <InformationSection
                        key={key} // Unique key for React's rendering algorithm.
                        labelKey={labelKeys[key as UserInfoKey]} // Translates the key to a readable label.
                        value={value} // The actual value to display.
                    />
                ))}
            </div>
        </div>
    );
};
