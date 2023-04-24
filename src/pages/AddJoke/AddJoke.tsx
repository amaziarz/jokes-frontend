import JokeForm from 'common/components/JokeForm';
import { useAddJoke } from 'services/jokesApi';

function AddJoke() {
  const addJokeMutation = useAddJoke();

  return (
    <JokeForm
      onSubmit={(values) => addJokeMutation.mutate(values)}
      isSubmitting={addJokeMutation.isLoading}
      isError={addJokeMutation.isError}
    />
  );
}

export default AddJoke;
