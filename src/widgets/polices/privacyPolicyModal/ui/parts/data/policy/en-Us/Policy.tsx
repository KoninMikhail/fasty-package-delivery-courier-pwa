import { sharedAssetsDocs } from '@/shared/assets';
import { sharedUiComponents } from '@/shared/ui';

const { enPrivacyPolicy } = sharedAssetsDocs;
const { Markdown } = sharedUiComponents;

export const Policy: FunctionComponent = () => (
    <Markdown content={enPrivacyPolicy} />
);

export default Policy;
