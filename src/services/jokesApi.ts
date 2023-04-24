import { useQuery } from 'react-query';
import { Joke } from 'types/Joke';
import { SortOrder } from 'types/SortOrder';
import { toQueryString } from 'common/utils';
import { apiClient } from './apiClient';

export type JokesFilterKey = 'Views' | 'CreatedAt';
export type JokesFilters = {
  [key in JokesFilterKey]: string;
};

interface UseJokesParams {
  page: number;
  limit: number;
  sort?: string;
  order?: SortOrder;
  filters: JokesFilters;
}

function getJokes({
  page,
  limit,
  sort,
  order,
  filters,
}: UseJokesParams): Promise<Joke[]> {
  const query = toQueryString([
    { key: '_page', value: page },
    { key: '_limit', value: limit },
    { key: '_sort', value: sort },
    { key: '_order', value: order },
    ...Object.entries(filters || []).map(([key, value]) => ({ key, value })),
  ]);
  return apiClient<Joke[]>(`/jokes?${query}`);
}

export function useJokes(queryParams: UseJokesParams) {
  return useQuery({
    queryKey: ['jokes', queryParams],
    queryFn: () => getJokes(queryParams),
    keepPreviousData: true,
  });
}
