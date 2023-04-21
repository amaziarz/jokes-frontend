import { useState } from 'react';
import styled from 'styled-components';
import { useJokes } from 'services/jokesApi';
import { Paragraph, Spinner } from 'common/components/styled';
import Pagination, { initialLimit } from './Pagination';
import JokesList from './JokesList';

function Jokes() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const jokesQuery = useJokes({ page, limit });

  return (
    <JokesWrapper>
      {jokesQuery.isLoading ? <Spinner /> : null}
      {jokesQuery.isSuccess ? (
        <div>
          {jokesQuery.data.length ? (
            <JokesList jokes={jokesQuery.data} />
          ) : (
            <Paragraph>There is no data for selected filters</Paragraph>
          )}
          <Pagination
            page={page}
            limit={limit}
            onPreviousPage={setPage}
            onNextPage={setPage}
            onLimitChange={setLimit}
            isLoading={jokesQuery.isFetching}
          />
        </div>
      ) : null}
    </JokesWrapper>
  );
}

const JokesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default Jokes;
