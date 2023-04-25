import { useNavigate } from 'react-router-dom';
import { useJokes } from 'services/jokesApi';
import { Paragraph, Spinner } from 'common/components/styled';
import LoadingWrapper from 'common/components/LoadingWrapper';
import { debounce } from 'common/utils';
import { setJokeListParams, useAppState } from 'context/AppStateProvider';
import Pagination from './Pagination';
import JokesList from './JokesList';
import JokesListFilters from './JokesListFilters';

function Jokes() {
  const navigate = useNavigate();
  const [
    {
      jokeListParams: { page, limit, sort, order, filters },
    },
    dispatch,
  ] = useAppState();

  const jokesQuery = useJokes({
    page,
    limit,
    sort,
    order,
    filters,
  });

  return (
    <div
      css={`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      `}
    >
      <div>
        <JokesListFilters
          onChange={debounce((nextFilters) =>
            setJokeListParams(dispatch, {
              filters: nextFilters,
              page: 1,
            }),
          )}
          onAddJoke={() => navigate('/jokes/new')}
        />
        {jokesQuery.isSuccess ? (
          <>
            <LoadingWrapper isLoading={jokesQuery.isFetching}>
              <JokesList
                jokes={jokesQuery.data}
                sortKey={sort}
                sortOrder={order}
                onSort={(sortKey, sortOrder) =>
                  setJokeListParams(dispatch, {
                    sort: sortKey,
                    order: sortOrder,
                  })
                }
              />
              {jokesQuery.data.length === 0 ? (
                <Paragraph textAlign="center">
                  No data found for selected filters
                </Paragraph>
              ) : null}
            </LoadingWrapper>
            <Pagination
              page={page}
              limit={limit}
              count={jokesQuery.data.length}
              onPreviousPage={(prevPage) =>
                setJokeListParams(dispatch, { page: prevPage })
              }
              onNextPage={(nextPage) =>
                setJokeListParams(dispatch, { page: nextPage })
              }
              onLimitChange={(nextLimit) =>
                setJokeListParams(dispatch, { limit: nextLimit })
              }
            />
          </>
        ) : null}
      </div>
      {jokesQuery.isLoading ? <Spinner /> : null}
    </div>
  );
}

export default Jokes;
