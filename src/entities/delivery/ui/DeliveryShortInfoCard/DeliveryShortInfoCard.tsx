import { Delivery } from '@/shared/api';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
    Spacer,
} from '@nextui-org/react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedConfigLocale, sharedConfigRoutes } from '@/shared/config';
import { sharedServicesSubway } from '@/shared/services';

import { translationNS } from '../../config';
import locale_en from '../../locales/en.locale.json';
import locale_ru from '../../locales/ru.locale.json';

const { SubwayStationWithIcon } = sharedServicesSubway;
const { locale } = sharedConfigLocale;
const { RouteName } = sharedConfigRoutes;
const { DELIVERIES } = RouteName;

/**
 * Constants
 */

const DELIVERY_LABEL_ID = 'delivery.label.id';
const DELIVERY_LABEL_ADDRESS = 'delivery.label.address';
const DELIVERY_LABEL_WEIGHT = 'delivery.label.weight';
const DELIVERY_CHIP_EXPRESS = 'delivery.chip.express';
const DELIVERY_CHIP_ON_FOOT = 'delivery.chip.onFoot';
const DELIVERY_CHIP_ON_CAR = 'delivery.chip.onCar';
const DELIVERY_LABEL_STORAGE = 'delivery.label.storage';
const DELIVERY_LABEL_WEIGHT_KG = 'delivery.weight.kg';
const DELIVERY_BUTTON_SEE_MORE = 'delivery.button.seeMore';

/**
 * locale.ts
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * Components
 */
const ID: FunctionComponent<{ id: number | string }> = ({ id }) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex flex-col">
            <span className="text-md">{t(DELIVERY_LABEL_ID)}</span>
            <span className="text-md font-bold">{`# ${id}`}</span>
        </div>
    );
};

const Badges: FunctionComponent<{
    isExpress: boolean;
    isCar: boolean;
}> = ({ isExpress, isCar }) => {
    const { t } = useTranslation(translationNS);

    const expressLabel = t(DELIVERY_CHIP_EXPRESS);
    const onFootLabel = t(DELIVERY_CHIP_ON_FOOT);
    const onCarLabel = t(DELIVERY_CHIP_ON_CAR);

    return (
        <div className="flex justify-end gap-1">
            {isExpress ? (
                <Chip color="danger" size="sm" variant="solid">
                    {expressLabel}
                </Chip>
            ) : null}

            {isCar ? (
                <Chip color="success" size="sm" variant="dot">
                    {onFootLabel}
                </Chip>
            ) : (
                <Chip color="success" size="sm" variant="dot">
                    {onCarLabel}
                </Chip>
            )}
        </div>
    );
};

const PickupDateTime: FunctionComponent<{
    date: string;
    timeStart: string;
    timeEnd: string;
}> = ({ date, timeStart, timeEnd }) => {
    const deliveryDateFormatted = format(new Date(date), 'dd.MM.yyyy');
    return (
        <div>
            <span className="text-small text-default-500">{`${deliveryDateFormatted} ${timeStart} - ${timeEnd}`}</span>
        </div>
    );
};

const Storage: FunctionComponent<{ contents: string }> = ({
    contents = 'не описано',
}) => {
    const { t } = useTranslation(translationNS);

    /**
     * Locale
     */
    const storageLabel = `${t(DELIVERY_LABEL_STORAGE)}:`;

    return (
        <div>
            <div className="font-bold">{storageLabel}</div>
            <div className="text-sm">{contents}</div>
        </div>
    );
};

const Weight: FunctionComponent<{ weight: number | string }> = ({
    weight = 0,
}) => {
    const { t } = useTranslation(translationNS);

    /**
     * Values
     */
    const weightFormatted = Number(weight).toFixed(2);
    /**
     * Locale
     */
    const weightLabel = `${t(DELIVERY_LABEL_WEIGHT)}:`;
    const weightValue = `${weightFormatted} ${t(DELIVERY_LABEL_WEIGHT_KG)}`;

    return (
        <div className="min-w-16 flex-grow-0">
            <div className="font-bold">{weightLabel}</div>
            <div className="text-sm">{weightValue}</div>
        </div>
    );
};

const Address: FunctionComponent<{ address: string }> = ({
    address = 'не указан',
}) => {
    const { t } = useTranslation(translationNS);
    const addressLabel = `${t(DELIVERY_LABEL_ADDRESS)}:`;
    return (
        <div>
            <div className="font-bold">{addressLabel}</div>
            <div className="text-sm">{address}</div>
        </div>
    );
};

const SeeMoreButton: FunctionComponent<{
    onPress: () => void;
}> = ({ onPress }) => {
    const { t } = useTranslation(translationNS);
    return (
        <Button color="primary" fullWidth onPress={onPress}>
            {t(DELIVERY_BUTTON_SEE_MORE)}
        </Button>
    );
};

/**
 * View
 */
interface DeliveryPreviewCardProperties {
    delivery: Delivery;
    featureSlot?: ReactNode;
}

export const DeliveryShortInfoCard: FunctionComponent<
    DeliveryPreviewCardProperties
> = ({ delivery, featureSlot }) => {
    const navigate = useNavigate();
    const {
        id,
        car: isCar,
        express: isExpress,
        date: deliveryDate,
        contents,
        time_start: deliveryStartTime,
        time_end: deliveryEndTime,
        address: { address, metro },
        weight,
    } = delivery;

    const onPressPreviewHandle = (): void => {
        if (delivery) {
            navigate(`${DELIVERIES}/${id}`);
        }
    };

    const outputCardBodyClass = clsx('max-w-[600px] shadow-md', {
        'border-2': isExpress,
        'border-danger': isExpress,
    });

    return (
        <Card className={outputCardBodyClass}>
            <CardHeader className="flex justify-between gap-3">
                <ID id={id} />
                <div className="flex flex-col text-right">
                    <Badges isCar={isCar} isExpress={isExpress} />
                    <PickupDateTime
                        date={deliveryDate}
                        timeStart={deliveryStartTime}
                        timeEnd={deliveryEndTime}
                    />
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <Storage contents={contents} />
                <Spacer y={2} />
                <div className="flex gap-2">
                    <div className="flex-grow">
                        <Address address={address} />
                        <Spacer y={2} />
                        <SubwayStationWithIcon value={metro} />
                    </div>
                    <Weight weight={weight} />
                </div>
            </CardBody>
            <Divider />
            <CardFooter>
                <div className="flex w-full gap-2">
                    <div className="w-full">
                        <SeeMoreButton onPress={onPressPreviewHandle} />
                    </div>
                    {featureSlot ? (
                        <div className="flex-shrink">{featureSlot}</div>
                    ) : null}
                </div>
            </CardFooter>
        </Card>
    );
};
