import { Link } from '@nextui-org/react';
import { Contact } from '@/shared/api';
import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { convertPhoneToTelLink, convertStringToEmailLink } from '../../lib';
import { translationNS } from '../../config';

const TRANSLATION = {
    LABEL_NAME: 'client.card.label.name',
    LABEL_JOB: 'client.card.label.job',
    LABEL_PHONE: 'client.card.label.phone',
    LABEL_EMAIL: 'client.card.label.email',
};

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="flex flex-col gap-4">{children}</div>
);

const Name: FunctionComponent<{ value: string }> = ({ value }) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex gap-2">
            <div className="flex-grow">{t(TRANSLATION.LABEL_NAME)}</div>
            <div className="text-right">{value}</div>
        </div>
    );
};

const Job: FunctionComponent<{ value: string }> = ({ value }) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex gap-2">
            <div className="flex-grow">{t(TRANSLATION.LABEL_JOB)}</div>
            <div>{value}</div>
        </div>
    );
};

const Phone: FunctionComponent<{ value: string }> = ({ value }) => {
    const { t } = useTranslation(translationNS);
    const link = convertPhoneToTelLink(value);

    return (
        <div className="flex gap-2">
            <div className="flex-grow">{t(TRANSLATION.LABEL_PHONE)}</div>
            <div>
                <Link isExternal href={link}>
                    {value}
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
            <div className="flex-grow">{t(TRANSLATION.LABEL_EMAIL)}</div>
            <div>
                <Link isExternal href={link}>
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
