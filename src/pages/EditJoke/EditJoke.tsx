import { Navigate, useParams } from 'react-router-dom';
import { useJoke, useRemoveJoke, useUpdateJoke } from 'services/jokesApi';
import JokeForm from 'common/components/JokeForm';
import { Paragraph, Spinner } from 'common/components/styled';

function EditJoke() {
  const params = useParams();
  const jokeId = parseInt(params.jokeId as string);

  const jokeQuery = useJoke({ jokeId });
  const updateJokeMutation = useUpdateJoke();
  const removeJokeMutation = useRemoveJoke();

  if (Number.isNaN(jokeId)) {
    return <Navigate to="/jokes" replace />;
  }

  return (
    <div
      css={`
        display: flex;
        justify-content: center;
      `}
    >
      {jokeQuery.isLoading ? <Spinner /> : null}
      {jokeQuery.isSuccess ? (
        <JokeForm
          joke={jokeQuery.data}
          onSubmit={(values) =>
            updateJokeMutation.mutate({ ...jokeQuery.data, ...values })
          }
          onRemove={removeJokeMutation.mutate}
          isSubmitting={
            updateJokeMutation.isLoading || removeJokeMutation.isLoading
          }
          isError={updateJokeMutation.isError || removeJokeMutation.isError}
        />
      ) : null}
      {jokeQuery.isError ? <Paragraph>Joke not found</Paragraph> : null}
    </div>
  );
}

export default EditJoke;
