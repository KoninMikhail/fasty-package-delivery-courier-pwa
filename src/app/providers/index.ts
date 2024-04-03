import compose from 'compose-function';

import { withNetworkInfo } from './withNetworkInfo';
import { withDeviceInfo } from './withDeviceInfo';
import { withNextThemes } from './withNextThemes';
import { withRouter } from './withRouter';
import { withUi } from './withUi';
import { withLocale } from './withLocale';
import { withAppGate } from './withAppGate';

export const withProviders = compose(
    withRouter,
    withAppGate,
    withLocale,
    withUi,
    withDeviceInfo,
    withNetworkInfo,
    withNextThemes,
);
