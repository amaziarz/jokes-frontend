import styled from 'styled-components';

const LIMIT_OPTIONS = [5, 10];
export const initialLimit = LIMIT_OPTIONS[0];

interface Props {
  page: number;
  limit: number;
  count: number;
  onPreviousPage: (page: number) => void;
  onNextPage: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

function Pagination({
  page,
  limit,
  count,
  onNextPage,
  onPreviousPage,
  onLimitChange,
}: Props) {
  return (
    <Wrapper>
      <button disabled={page === 1} onClick={() => onPreviousPage(page - 1)}>
        {'<'}
      </button>
      <button disabled={count < limit} onClick={() => onNextPage(page + 1)}>
        {'>'}
      </button>
      <Select
        name="limit"
        value={limit}
        onChange={(e) => onLimitChange(parseInt(e.target.value))}
      >
        {LIMIT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Select = styled.select`
  margin-left: 8px;
`;

export default Pagination;
