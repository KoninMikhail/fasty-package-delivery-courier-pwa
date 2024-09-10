import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { reformatToTranslit } from '@/entities/route/lib/reformatToTranslit';
import { $subwayStationsList } from '../model/subwayModel';
import { getSubwayStationIconSourceByName } from '../lib/getSubwayStationIconSourceByName';
import { findSubwayLineByName } from '../lib/findSubwayLineByName';
import { SubwayLineID } from '../types';

interface SubwayViewProperties {
    value?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const SubwayStationWithIcon: FunctionComponent<SubwayViewProperties> = ({
    value = 'неизвестно',
}) => {
    const { i18n } = useTranslation();

    const subways = useUnit($subwayStationsList);
    const foundSubway = findSubwayLineByName(subways, value);
    const iconSource = getSubwayStationIconSourceByName(
        foundSubway?.line_id as SubwayLineID,
    );

    const subwayName =
        foundSubway?.name && i18n.language === 'en'
            ? reformatToTranslit(foundSubway?.name)
            : value;

    return (
        <div className="inline-flex items-center gap-1.5">
            <img src={iconSource} alt={subwayName} className="h-5 w-5" />
            <span className="truncate">{subwayName}</span>
        </div>
    );
};
