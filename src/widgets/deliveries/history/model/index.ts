import { createStore } from 'effector';
import { getDeliveriesHistoryFx } from '../api';

export const $deliveriesHistoryList = createStore([]);

$deliveriesHistoryList.on(getDeliveriesHistoryFx.doneData, (_, data) => data);
