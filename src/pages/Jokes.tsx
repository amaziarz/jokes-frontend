import { useJokes } from '../services/jokesApi';

function Jokes() {
  const { data, isLoading, isSuccess } = useJokes({ page: 1, limit: 10 });

  if (isLoading) {
    return <div>loading</div>;
  }

  if (isSuccess) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }

  return null;
}

export default Jokes;
