import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>
            Created Date
            <Sort
              sortKey="CreatedAt"
              currentSortKey={sortKey}
              currentOrder={sortOrder}
              onSort={onSort}
            />
          </th>
          <th>
            Views
            <Sort
              sortKey="Views"
              currentSortKey={sortKey}
              currentOrder={sortOrder}
              onSort={onSort}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {jokes.map((joke) => (
          <tr key={joke.id}>
            <td>
              <Link to={`/jokes/${joke.id}`}>{joke.Title}</Link>
            </td>
            <td>{formatEmail(joke.Author)}</td>
            <td>{formatDate(joke.CreatedAt, LIST_DATE_FORMAT)}</td>
            <td>{joke.Views}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

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

export default JokesList;
