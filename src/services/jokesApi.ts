import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
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

interface UseJokeParams {
  jokeId: number;
}

function getJokeById({ jokeId }: UseJokeParams): Promise<Joke> {
  return apiClient<Joke>(`/jokes/${jokeId}`);
}

export function useJoke(queryParams: UseJokeParams) {
  return useQuery({
    queryKey: ['joke', queryParams],
    queryFn: () => getJokeById(queryParams),
    enabled: !Number.isNaN(queryParams.jokeId),
  });
}

function updateJoke({ id: jokeId, ...joke }: Joke): Promise<Joke> {
  return apiClient<Joke, Omit<Joke, 'id'>>(`/jokes/${jokeId}`, {
    method: 'PUT',
    data: joke,
  });
}

export function useUpdateJoke() {
  return useMutation({
    mutationFn: updateJoke,
  });
}

function removeJoke(jokeId: number): Promise<void> {
  return apiClient(`/jokes/${jokeId}`, { method: 'DELETE' });
}

export function useRemoveJoke() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: removeJoke,
    onSuccess: () => {
      navigate('/jokes');
    },
  });
}
