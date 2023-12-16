import compose from 'compose-function';

import { withDeviceInfo } from './withDeviceInfo';
import { withNextThemes } from './withNextThemes';
import { withRouter } from './withRouter';
import { withUi } from './withUi';

export const withProviders = compose(
    withRouter,
    withUi,
    withDeviceInfo,
    withNextThemes,
);
