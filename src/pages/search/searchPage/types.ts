export enum PageState {
    NotFound = 'NOT_FOUND',
    EmptyQuery = 'EMPTY_QUERY',
    Loading = 'LOADING',
    Search = 'SEARCH',
    Error = 'ERROR',
    Init = 'INIT',
}

export type SearchPageState = `${PageState}`;
