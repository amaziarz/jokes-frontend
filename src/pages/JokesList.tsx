import styled from 'styled-components';
import { Joke } from 'types/Joke';
import { formatDate, formatEmail } from 'common/utils';

interface Props {
  jokes: Joke[];
}

function JokesList({ jokes }: Props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Created Date</th>
          <th>Views</th>
        </tr>
      </thead>
      <tbody>
        {jokes.map((joke) => (
          <tr key={joke.id}>
            <td>{joke.Title}</td>
            <td>{formatEmail(joke.Author)}</td>
            <td>{formatDate(joke.CreatedAt)}</td>
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
