import { ICONS_SOURCE_LIST } from "../config";
import { SubwayLineID } from "../types";



export const getSubwayStationIconSourceByName = (
  lineId?: SubwayLineID,
): string => {
  if (!lineId || !ICONS_SOURCE_LIST[lineId]) {
    return ICONS_SOURCE_LIST.unknown;
  }
  return ICONS_SOURCE_LIST[lineId];
};
