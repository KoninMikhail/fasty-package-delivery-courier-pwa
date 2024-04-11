import { sharedAssetsDocs } from '@/shared/assets';
import { sharedUiComponents } from '@/shared/ui';

const { ruCookiePolicy } = sharedAssetsDocs;
const { Markdown } = sharedUiComponents;

const Policy: FunctionComponent = () => <Markdown content={ruCookiePolicy} />;

export default Policy;
