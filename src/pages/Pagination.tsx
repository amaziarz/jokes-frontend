import styled from 'styled-components';
import { Spinner } from 'common/components/styled';

const LIMIT_OPTIONS = [5, 10];
export const initialLimit = LIMIT_OPTIONS[0];

interface Props {
  page: number;
  limit: number;
  onPreviousPage: (page: number) => void;
  onNextPage: (page: number) => void;
  onLimitChange: (limit: number) => void;
  isLoading: boolean;
}

function Pagination({
  page,
  limit,
  onNextPage,
  onPreviousPage,
  onLimitChange,
  isLoading,
}: Props) {
  return (
    <PaginationWrapper>
      {isLoading ? <Spinner size={16} /> : null}
      <ButtonWrapper>
        <button disabled={page === 1} onClick={() => onPreviousPage(page - 1)}>
          {'<'}
        </button>
        <button onClick={() => onNextPage(page + 1)}>{'>'}</button>
      </ButtonWrapper>
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
    </PaginationWrapper>
  );
}

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonWrapper = styled.div`
  margin-left: 8px;
`;

const Select = styled.select`
  margin-left: 8px;
`;

export default Pagination;