import styled from 'styled-components';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { SortOrder } from 'types/SortOrder';

interface Props {
  onSort: (sortKey: string, order: SortOrder) => void;
  sortKey: string;
  currentSortKey?: string;
  currentOrder?: SortOrder;
}

function Sort({ onSort, sortKey, currentSortKey, currentOrder }: Props) {
  function getIcon() {
    if (currentSortKey === sortKey) {
      return currentOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  }

  return (
    <SortButton
      onClick={() =>
        onSort(
          sortKey,
          currentSortKey === sortKey && currentOrder === 'asc' ? 'desc' : 'asc',
        )
      }
    >
      {getIcon()}
    </SortButton>
  );
}

const SortButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.fontColor};
`;

export default Sort;
