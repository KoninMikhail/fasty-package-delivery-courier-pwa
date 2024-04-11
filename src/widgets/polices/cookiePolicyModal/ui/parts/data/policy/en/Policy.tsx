import { sharedAssetsDocs } from '@/shared/assets';
import { sharedUiComponents } from '@/shared/ui';

const { enCookiePolicy } = sharedAssetsDocs;
const { Markdown } = sharedUiComponents;

const Policy: FunctionComponent = () => <Markdown content={enCookiePolicy} />;

export default Policy;
