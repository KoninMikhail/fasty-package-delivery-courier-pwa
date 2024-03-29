import { sharedAssetsDocs } from '@/shared/assets';
import { sharedUiComponents } from '@/shared/ui';

const { enTermsOfUse } = sharedAssetsDocs;
const { Markdown } = sharedUiComponents;

export const Policy: FunctionComponent = () => (
    <Markdown content={enTermsOfUse} />
);

export default Policy;
