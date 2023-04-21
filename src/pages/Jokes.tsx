import { useState } from 'react';
import styled from 'styled-components';
import { useJokes } from 'services/jokesApi';
import { Paragraph, Spinner } from 'common/components/styled';
import Pagination, { initialLimit } from 'pages/Pagination';

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
            <Table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Created Data</th>
                  <th>Views</th>
                </tr>
              </thead>
              <tbody>
                {jokesQuery.data.map((joke) => (
                  <tr key={joke.id}>
                    <td>{joke.Title}</td>
                    <td>{joke.Author}</td>
                    <td>{joke.CreatedAt}</td>
                    <td>{joke.Views}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Paragraph>There is no data for selected filters</Paragraph>
          )}
          <Pagination
            page={page}
            limit={limit}
            onPreviousPage={setPage}
            onNextPage={setPage}
            onLimitChange={setLimit}
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

const Table = styled.table`
  border-collapse: collapse;
  margin-bottom: 8px;

  th,
  td {
    padding: 8px 24px;
  }

  th {
    font-weight: 700;
  }

  td:not(:last-child) {
    border-right: 1px solid;
  }
`;

export default Jokes;
