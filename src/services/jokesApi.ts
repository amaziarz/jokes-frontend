import { useQuery } from 'react-query';
import { apiClient } from './apiClient';
import { Joke } from '../types/Joke';

interface UseJokesParams {
  page: number;
  limit: number;
}

function getJokes({ page, limit }: UseJokesParams): Promise<Joke[]> {
  return apiClient<Joke[]>(`/jokes?_page=${page}&limit=${limit}`);
}

export function useJokes({ page, limit }: UseJokesParams) {
  return useQuery(['jokes', page, limit], () => getJokes({ page, limit }));
}
