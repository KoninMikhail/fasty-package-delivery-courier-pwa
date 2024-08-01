import { Delivery } from '@/shared/api';
import { Button, Chip, Divider } from '@nextui-org/react';
import { sharedConfigRoutes } from '@/shared/config';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import {
    LABEL_ADDRESS,
    LABEL_COMMENT,
    LABEL_STORAGE,
    STATUS_CANCELLED,
    STATUS_CREATED,
    STATUS_DONE,
    STATUS_DELIVERING,
    translationNS,
    BUTTON_MORE,
    NO_COMMENT_TEXT,
} from '../../config';
import { getDeliveryContents } from '../../lib/utils/getDeliveryContents';
import { getDeliveryComment } from '../../lib/utils/getDeliveryComment';
import { getDeliveryId } from '../../lib/utils/getDeliveryId';
import { getDeliveryPickupDateTime } from '../../lib/utils/getDeliveryPickupDateTime';
import { getDeliveryAddress } from '../../lib/utils/getDeliveryAdress';

const { RouteName } = sharedConfigRoutes;
const { DELIVERIES } = RouteName;

const ID: FunctionComponent<{ id: string }> = ({ id }) => {
    return (
        <div className="mr-2 flex-grow font-medium text-default-900">
            {`# ${id}`}
        </div>
    );
};

const Address: FunctionComponent<{ address: string }> = ({ address }) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex flex-col">
            <span className="text-md  font-bold">{t(LABEL_ADDRESS)}</span>
            <span className="text-sm">{address}</span>
        </div>
    );
};

const Contents: FunctionComponent<{ contents: string }> = ({ contents }) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex flex-col">
            <span className="text-md  font-bold">{t(LABEL_STORAGE)}</span>
            <span className="text-sm">{contents}</span>
        </div>
    );
};

const Comment: FunctionComponent<{ comment: string }> = ({ comment }) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex flex-col">
            <span className="text-md  font-bold">{t(LABEL_COMMENT)}</span>
            <span className="text-sm">{comment || t(NO_COMMENT_TEXT)}</span>
        </div>
    );
};

const StateBadge: FunctionComponent<{ state: Delivery['state'] }> = ({
    state,
}) => {
    const { t } = useTranslation(translationNS);
    return {
        done: (
            <Chip color="success" variant="dot" size="sm">
                {t(STATUS_DONE)}
            </Chip>
        ),
        canceled: (
            <Chip color="danger" variant="dot" size="sm">
                {t(STATUS_CANCELLED)}
            </Chip>
        ),
        created: (
            <Chip color="default" variant="dot" size="sm">
                {t(STATUS_CREATED)}
            </Chip>
        ),
        delivering: (
            <Chip color="warning" variant="dot" size="sm">
                {t(STATUS_DELIVERING)}
            </Chip>
        ),
    }[state];
};

const ButtonMore: FunctionComponent<{ onPress: () => void }> = ({
    onPress,
}) => {
    const { t } = useTranslation(translationNS);
    return (
        <Button
            onClick={onPress}
            variant="bordered"
            fullWidth
            className="max-w-96"
        >
            {t(BUTTON_MORE)}
        </Button>
    );
};

interface DeliveryHistoryCardProperties {
    delivery: Delivery;
}

export const DeliveryHistoryCard: FunctionComponent<DeliveryHistoryCardProperties> =
    React.memo(({ delivery }) => {
        const { state } = delivery;
        const navigate = useNavigate();

        const id = getDeliveryId(delivery);
        const contents = getDeliveryContents(delivery);
        const comment = getDeliveryComment(delivery);
        const address = getDeliveryAddress(delivery);
        const date = getDeliveryPickupDateTime(delivery, true, true);

        const onPressButtonMore = useCallback((): void => {
            navigate(`${DELIVERIES}/${id}`);
        }, [id, navigate]);

        return (
            <div className="min-w-0 flex-1 py-0">
                <div className="text-md text-gray-500">
                    <div className="grid w-full grid-cols-[max-content_auto] justify-between">
                        <ID id={id} />
                        <StateBadge state={state} />
                    </div>
                    <span className="whitespace-nowrap text-sm">{date}</span>
                </div>
                <Divider className="my-4" />
                <div className="mt-2 flex flex-col gap-4">
                    <Address address={address} />
                    <Contents contents={contents} />
                    <Comment comment={comment} />
                    <ButtonMore onPress={onPressButtonMore} />
                </div>
            </div>
        );
    });
