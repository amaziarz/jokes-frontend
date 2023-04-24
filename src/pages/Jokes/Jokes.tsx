import { useState } from 'react';
import styled from 'styled-components';
import { JokesFilters, useJokes } from 'services/jokesApi';
import { Paragraph, Spinner } from 'common/components/styled';
import LoadingWrapper from 'common/components/LoadingWrapper';
import { debounce } from 'common/utils';
import { SortOrder } from 'types/SortOrder';
import Pagination, { initialLimit } from './Pagination';
import JokesList from './JokesList';
import JokesListFilters from './JokesListFilters';

function Jokes() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [sortKey, setSortKey] = useState<string>();
  const [sortOrder, setSortOrder] = useState<SortOrder>();
  const [filters, setFilters] = useState<JokesFilters>({
    CreatedAt: '',
    Views: '',
  });

  const jokesQuery = useJokes({
    page,
    limit,
    sort: sortKey,
    order: sortOrder,
    filters,
  });

  function handleSort(key: string, order: SortOrder) {
    setSortKey(key);
    setSortOrder(order);
  }

  function handleFiltersChange(nextFilters: JokesFilters) {
    setFilters(nextFilters);
    setPage(1);
  }

  return (
    <Wrapper>
      {jokesQuery.isLoading ? <Spinner /> : null}
      {jokesQuery.isSuccess ? (
        <div>
          <JokesListFilters onChange={debounce(handleFiltersChange)} />
          <LoadingWrapper isLoading={jokesQuery.isFetching}>
            <JokesList
              jokes={jokesQuery.data}
              sortKey={sortKey}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
            {jokesQuery.data.length === 0 ? (
              <Paragraph textAlign="center">
                No data found for selected filters
              </Paragraph>
            ) : null}
          </LoadingWrapper>
          {jokesQuery.data.length ? (
            <Pagination
              page={page}
              limit={limit}
              count={jokesQuery.data.length}
              onPreviousPage={setPage}
              onNextPage={setPage}
              onLimitChange={setLimit}
            />
          ) : null}
        </div>
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default Jokes;
