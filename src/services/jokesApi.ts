import { useQuery } from 'react-query';
import { Joke } from 'types/Joke';
import { apiClient } from './apiClient';

interface UseJokesParams {
  page: number;
  limit: number;
}

function getJokes({ page, limit }: UseJokesParams): Promise<Joke[]> {
  return apiClient<Joke[]>(`/jokes?_page=${page}&_limit=${limit}`);
}

export function useJokes({ page, limit }: UseJokesParams) {
  return useQuery({
    queryKey: ['jokes', { page, limit }],
    queryFn: () => getJokes({ page, limit }),
    keepPreviousData: true,
  });
}
