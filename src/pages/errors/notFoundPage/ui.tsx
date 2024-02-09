import { viewerUi } from '@/entities/viewer';

const { Authorized } = viewerUi;

export const NotFoundPage: FunctionComponent = () => {
    return (
        <Authorized>
            <div>Not found</div>
        </Authorized>
    );
};
