import { Authorized } from '@/entities/viewer';

export const NotFoundPage: FunctionComponent = () => {
    return (
        <Authorized>
            <div>Not found</div>
        </Authorized>
    );
};
