import { sharedAssetsDocs } from '@/shared/assets';
import { sharedUiComponents } from '@/shared/ui';

const { enTermsOfUse } = sharedAssetsDocs;
const { Markdown } = sharedUiComponents;

const Policy: FunctionComponent = () => <Markdown content={enTermsOfUse} />;

export default Policy;
