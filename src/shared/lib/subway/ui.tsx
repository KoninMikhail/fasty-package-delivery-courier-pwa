import { useUnit } from 'effector-react';
import { $subwayStationsList } from './model';
import { findSubwayByName } from "./utils";
import {getSubwayStationIconSourceByName, SubwayLineID} from "@/shared/lib/subway/providers";

interface SubwayViewProperties {
    value: string;
    size?: 'sm' | 'md' | 'lg';
}

export const SubwayStationWithIcon: FunctionComponent<SubwayViewProperties> = ({
    value = 'неизвестно',
}) => {
    const subways = useUnit($subwayStationsList);
    const foundSubway = findSubwayByName(subways, value);
    const iconSrc = getSubwayStationIconSourceByName(foundSubway?.line_id as SubwayLineID);
    return (
        <div className="inline-flex items-center gap-1.5">
            <img
                src={iconSrc}
                alt={foundSubway?.name}
                className="w-5 h-5"/>
            <span>{foundSubway?.name || value}</span>
        </div>
    );
};
