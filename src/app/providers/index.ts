import compose from 'compose-function';

import { withDeviceInfo } from './withDeviceInfo';
import { withNextThemes } from './withNextThemes';
import { withRouter } from './withRouter';
import { withUi } from './withUi';
import { withLocale } from './withLocale';

export const withProviders = compose(
    withRouter,
    withLocale,
    withUi,
    withDeviceInfo,
    withNextThemes,
);
