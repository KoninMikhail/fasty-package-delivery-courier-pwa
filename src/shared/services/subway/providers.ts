export type SubwayLineID = keyof typeof sourceList;

const sourceList = {
    '1': '/icons/subway/Moskwa_Metro_Line_1.svg',
    '2': '/icons/subway/Moskwa_Metro_Line_2.svg',
    '3': '/icons/subway/Moskwa_Metro_Line_3.svg',
    '4': '/icons/subway/Moskwa_Metro_Line_4.svg',
    '5': '/icons/subway/Moskwa_Metro_Line_5.svg',
    '6': '/icons/subway/Moskwa_Metro_Line_6.svg',
    '7': '/icons/subway/Moskwa_Metro_Line_7.svg',
    '8': '/icons/subway/Moskwa_Metro_Line_8.svg',
    '9': '/icons/subway/Moskwa_Metro_Line_9.svg',
    '10': '/icons/subway/Moskwa_Metro_Line_10.svg',
    '11': '/icons/subway/Moskwa_Metro_Line_11.svg',
    '12': '/icons/subway/Moskwa_Metro_Line_12.svg',
    '13': '/icons/subway/Moskwa_Metro_Line_13.svg',
    '14': '/icons/subway/Moskwa_Metro_Line_14.svg',
    '15': '/icons/subway/Moskwa_Metro_Line_15.svg',
    '16': '/icons/subway/Moskwa_Metro_Line_16.svg',
    '17': '/icons/subway/Moskwa_Metro_Line_17.svg',
    '18': '/icons/subway/Moskwa_Metro_Line_18.svg',
    D1: '/icons/subway/Moskwa_Metro_Line_D1.svg',
    D2: '/icons/subway/Moskwa_Metro_Line_D2.svg',
    D3: '/icons/subway/Moskwa_Metro_Line_D3.svg',
    D4: '/icons/subway/Moskwa_Metro_Line_D4.svg',
    D5: '/icons/subway/Moskwa_Metro_Line_D5.svg',
    unknown: '/icons/subway/Moskwa_Metro_Unknown.svg',
};

export const getSubwayStationIconSourceByName = (lineId?: SubwayLineID) => {
    if (!lineId || !sourceList[lineId]) {
        return sourceList.unknown;
    }
    return sourceList[lineId];
};
