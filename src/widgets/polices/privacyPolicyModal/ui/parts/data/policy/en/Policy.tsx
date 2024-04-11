import { sharedAssetsDocs } from '@/shared/assets';
import { sharedUiComponents } from '@/shared/ui';

const { enPrivacyPolicy } = sharedAssetsDocs;
const { Markdown } = sharedUiComponents;

const Policy: FunctionComponent = () => <Markdown content={enPrivacyPolicy} />;

export default Policy;
