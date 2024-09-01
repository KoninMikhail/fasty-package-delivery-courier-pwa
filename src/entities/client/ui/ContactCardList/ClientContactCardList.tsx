import { Link } from '@nextui-org/react';
import { Contact } from '@/shared/api';
import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { sharedLibHelpers } from '@/shared/lib';
import { convertPhoneToTelLink, convertStringToEmailLink } from '../../lib';
import {
    LABEL_EMAIL,
    LABEL_JOB,
    LABEL_NAME,
    LABEL_PHONE,
    translationNS,
} from '../../config';

const { getMaskedPhone } = sharedLibHelpers;

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="flex flex-col gap-4">{children}</div>
);

const Name: FunctionComponent<{ value: string }> = ({ value }) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex gap-2">
            <div className="flex-grow">{t(LABEL_NAME)}</div>
            <div className="text-right">{value}</div>
        </div>
    );
};

const Job: FunctionComponent<{ value: string }> = ({ value }) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex gap-2">
            <div className="flex-grow">{t(LABEL_JOB)}</div>
            <div>{value}</div>
        </div>
    );
};

const Phone: FunctionComponent<{ value: string }> = ({ value }) => {
    const { t } = useTranslation(translationNS);
    const link = convertPhoneToTelLink(value);
    const phoneLabel = getMaskedPhone(value);

    return (
        <div className="flex gap-2">
            <div className="flex-grow">{t(LABEL_PHONE)}</div>
            <div>
                <Link isExternal href={link}>
                    {phoneLabel}
                </Link>
            </div>
        </div>
    );
};

const Email: FunctionComponent<{ value: string }> = ({ value }) => {
    const { t } = useTranslation(translationNS);
    const link = convertStringToEmailLink(value);
    return (
        <div className="flex gap-2">
            <div className="flex-grow">{t(LABEL_EMAIL)}</div>
            <div>
                <Link isExternal href={link} className="break-all text-right">
                    {value}
                </Link>
            </div>
        </div>
    );
};

interface IContactCardListProperties {
    contact: Contact;
}

export const ClientContactCardList: FunctionComponent<
    IContactCardListProperties
> = ({ contact }) => {
    const isHaveName = !!contact?.name;
    const isHaveJob = !!contact?.job;
    const isHavePhone = !!contact?.phone;
    const isHaveEmail = !!contact?.email;
    return (
        <Layout>
            {isHaveName ? <Name value={contact.name} /> : null}
            {isHaveJob ? <Job value={contact.job} /> : null}
            {isHavePhone ? <Phone value={contact.phone} /> : null}
            {isHaveEmail ? <Email value={contact.email || ''} /> : null}
        </Layout>
    );
};
