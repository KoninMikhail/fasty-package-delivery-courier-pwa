import { sharedAssetsDocs } from '@/shared/assets';
import { sharedUiComponents } from '@/shared/ui';

const { ruPrivacyPolicy } = sharedAssetsDocs;
const { Markdown } = sharedUiComponents;

const Policy: FunctionComponent = () => <Markdown content={ruPrivacyPolicy} />;

export default Policy;
