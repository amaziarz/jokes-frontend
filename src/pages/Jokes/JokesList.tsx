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
            <TableItem>{joke.Views}</TableItem>
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

const TableItem = styled.td`
  padding: 0.5rem 1.5rem;

  &:not(:last-child) {
    border-right: 1px solid;
  }
`;

export default JokesList;
