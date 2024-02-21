import { useUnit } from 'effector-react';
import { $subwayStationsList } from './model';
import { findSubwayByName } from "./utils";

interface SubwayViewProperties {
    value: string;
}

export const SubwayStationWithIcon: FunctionComponent<SubwayViewProperties> = ({
    value,
}) => {
    const subways = useUnit($subwayStationsList);
    const foundSubway = findSubwayByName(subways, value);

    if (!foundSubway) return value;

    return (
        <div className="inline-flex items-center gap-2">
            {/* <Icon
                    as={foundSubway.icon}
                    h={5}
                    w={5}
                    userSelect="none"
                    verticalAlign="center"
                /> */}
            <span>{foundSubway?.name}</span>
        </div>
    );
};
