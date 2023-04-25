import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Joke } from 'types/Joke';
import { formatDate, formatEmail, LIST_DATE_FORMAT } from 'common/utils';
import { SortOrder } from 'types/SortOrder';
import Sort from './Sort';

interface Props {
  jokes: Joke[];
  onSort: (sortKey: string, order: SortOrder) => void;
  sortOrder?: SortOrder;
  sortKey?: string;
}

function JokesList({ jokes, onSort, sortOrder, sortKey }: Props) {
  return (
    <table
      css={`
        border-collapse: collapse;
        margin-bottom: 0.5rem;
      `}
    >
      <thead>
        <tr>
          <TableHeader>Title</TableHeader>
          <TableHeader>Author</TableHeader>
          <TableHeader>
            Created Date
            <Sort
              sortKey="CreatedAt"
              currentSortKey={sortKey}
              currentOrder={sortOrder}
              onSort={onSort}
            />
          </TableHeader>
          <TableHeader>
            Views
            <Sort
              sortKey="Views"
              currentSortKey={sortKey}
              currentOrder={sortOrder}
              onSort={onSort}
            />
          </TableHeader>
        </tr>
      </thead>
      <tbody>
        {jokes.map((joke) => (
          <tr key={joke.id}>
            <TableItem>
              <Link
                to={`/jokes/${joke.id}`}
                css={css`
                  color: ${(props) => props.theme.fontColor};
                `}
              >
                {joke.Title}
              </Link>
            </TableItem>
            <TableItem>{formatEmail(joke.Author)}</TableItem>
            <TableItem>
              {formatDate(joke.CreatedAt, LIST_DATE_FORMAT)}
            </TableItem>
            <TableItem backgroundColor={getViewsColor(joke.Views)}>
              {joke.Views}
            </TableItem>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const TableHeader = styled.th`
  padding: 0.5rem 1.5rem;
  font-weight: 700;
`;

const TableItem = styled.td<{ backgroundColor?: ViewsColor }>`
  padding: 0.5rem 1.5rem;
  ${(props) =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
      color: ${props.backgroundColor === 'yellow'
        ? props.theme.colors.grey
        : props.theme.colors.white};
    `}

  &:not(:last-child) {
    border-right: 1px solid;
  }
`;

type ViewsColor = 'tomato' | 'orange' | 'yellow' | 'green';

function getViewsColor(views: number): ViewsColor | undefined {
  if (views >= 0 && views <= 25) {
    return 'tomato';
  }
  if (views <= 50) {
    return 'orange';
  }
  if (views <= 75) {
    return 'yellow';
  }
  if (views <= 100) {
    return 'green';
  }
}

export default JokesList;
