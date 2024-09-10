export enum SearchResultsStateDictionary {
    NotFound = 'NOT_FOUND',
    EmptyQuery = 'EMPTY_QUERY',
    Error = 'ERROR',
}

export type SearchResultsState = `${SearchResultsStateDictionary}`;
