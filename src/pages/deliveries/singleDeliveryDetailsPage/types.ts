export type PageGateState = {
    deliveryId?: string;
};

export enum PageState {
    INIT = 'init',
    Done = 'done',
    Error = 'error',
    NotFound = 'notFound',
    NotFoundOffline = 'notFoundOffline',
}
