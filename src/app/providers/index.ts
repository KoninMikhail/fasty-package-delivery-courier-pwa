import compose from 'compose-function';

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
    withNextThemes,
);
