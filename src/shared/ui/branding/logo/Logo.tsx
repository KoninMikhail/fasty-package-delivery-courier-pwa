import { Link } from 'react-router-dom';
import { sharedConfigConstants } from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { CompanyLogoIcon } from '../../icons/CompanyLogoIcon';

const { APP_NAME, APP_DESCRIPTION } = sharedConfigConstants;

interface ILogoProperties {
    size?: 'lg' | 'md' | 'sm';
    link?: string;
    onlyIcon?: boolean;
}

export const Logo: FunctionComponent<ILogoProperties> = ({
    size = 'md',
    link,
    onlyIcon = false,
}) => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language as keyof typeof APP_DESCRIPTION;

    const logoIcon = <CompanyLogoIcon className="text-5xl" width="0.7em" />;
    const appNameAndDescription = (
        <div>
            <div className="font-bold drop-shadow-xl">{APP_NAME}</div>
            <div className="text-xs">{APP_DESCRIPTION[currentLanguage]}</div>
        </div>
    );

    const logoContent = onlyIcon ? (
        logoIcon
    ) : (
        <>
            {logoIcon}
            {appNameAndDescription}
        </>
    );

    return link ? (
        <Link to={link}>
            <div className="flex place-content-start items-center gap-2">
                {logoContent}
            </div>
        </Link>
    ) : (
        <div className="flex place-content-start items-center gap-2">
            {logoContent}
        </div>
    );
};
