import compose from 'compose-function';

import { withNetworkInfo } from './withNetworkInfo';
import { withDeviceInfo } from './withDeviceInfo';
import { withNextThemes } from './withNextThemes';
import { withRouter } from './withRouter';
import { withUi } from './withUi';
import { withLocale } from './withLocale';
import { withAppInitGate } from './withAppInitGate';

export const withProviders = compose(
    withRouter,
    withAppInitGate,
    withLocale,
    withUi,
    withDeviceInfo,
    withNetworkInfo,
    withNextThemes,
);
