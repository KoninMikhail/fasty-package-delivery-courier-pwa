import { User } from '@/shared/api';

export type SearchQueryHistoryItem = {
    id: User['id'];
    query: string;
    timestamp: number;
};
