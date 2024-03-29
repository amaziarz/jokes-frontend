import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Joke, JokeFormValues } from 'types/Joke';
import { SortOrder } from 'types/SortOrder';
import { toQueryString } from 'common/utils';
import { apiClient } from './apiClient';

const QUERY_KEYS = {
  JOKES: 'jokes',
  JOKE: 'joke',
};

export type JokesFilterKey = 'Views' | 'CreatedAt';
export type JokesFilters = {
  [key in JokesFilterKey]: string;
};

export interface UseJokesParams {
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
    queryKey: [QUERY_KEYS.JOKES, queryParams],
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
    queryKey: [QUERY_KEYS.JOKE, queryParams],
    queryFn: () => getJokeById(queryParams),
    enabled: !Number.isNaN(queryParams.jokeId),
  });
}

function invalidateJokes(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JOKES] });
}

function setJoke(queryClient: QueryClient, joke: Joke) {
  return queryClient.setQueryData([QUERY_KEYS.JOKE, { jokeId: joke.id }], joke);
}

function addJoke(jokeFormValues: JokeFormValues): Promise<Joke> {
  return apiClient<Joke, JokeFormValues>('/jokes', { data: jokeFormValues });
}

export function useAddJoke() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addJoke,
    onSuccess: async (joke) => {
      await invalidateJokes(queryClient);
      setJoke(queryClient, joke);
      navigate(`/jokes/${joke.id}`);
    },
  });
}

function updateJoke({ id: jokeId, ...joke }: Joke): Promise<Joke> {
  return apiClient<Joke, Omit<Joke, 'id'>>(`/jokes/${jokeId}`, {
    method: 'PUT',
    data: joke,
  });
}

export function useUpdateJoke() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJoke,
    onSuccess: async (joke) => {
      await invalidateJokes(queryClient);
      setJoke(queryClient, joke);
    },
  });
}

function removeJoke(jokeId: number): Promise<void> {
  return apiClient(`/jokes/${jokeId}`, { method: 'DELETE' });
}

export function useRemoveJoke() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeJoke,
    onSuccess: async (_, jokeId) => {
      await invalidateJokes(queryClient);
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.JOKE, { jokeId }] });
      navigate('/jokes', { replace: true });
    },
  });
}
