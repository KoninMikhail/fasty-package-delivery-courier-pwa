import { useUnit } from 'effector-react';
import {
    getSubwayStationIconSourceByName,
    SubwayLineID,
} from '@/shared/services/subway/providers';
import { $subwayStationsList } from './model';
import { findSubwayByName } from './utils';

interface SubwayViewProperties {
    value?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const SubwayStationWithIcon: FunctionComponent<SubwayViewProperties> = ({
    value = 'неизвестно',
}) => {
    const subways = useUnit($subwayStationsList);
    const foundSubway = findSubwayByName(subways, value);
    const iconSource = getSubwayStationIconSourceByName(
        foundSubway?.line_id as SubwayLineID,
    );

    return (
        <div className="inline-flex items-center gap-1.5">
            <img src={iconSource} alt={foundSubway?.name} className="h-5 w-5" />
            <span className="truncate">{foundSubway?.name || value}</span>
        </div>
    );
};
