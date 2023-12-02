import compose from 'compose-function';

import { withNextThemes } from './withNextThemes';
import { withRouter } from './withRouter';
import { withUi } from './withUi';

export const withProviders = compose(withRouter, withUi, withNextThemes);
