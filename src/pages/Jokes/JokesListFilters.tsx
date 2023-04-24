import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { JokesFilters } from 'services/jokesApi';

interface Props {
  onChange: (filters: JokesFilters) => void;
  onAddJoke: () => void;
}

export const initialFilters: JokesFilters = {
  CreatedAt: '',
  Views: '',
};

function JokesListFilters({ onChange, onAddJoke }: Props) {
  const [filters, setFilters] = useState<JokesFilters>(initialFilters);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const nextFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(nextFilters);
    onChange(nextFilters);
  }

  function handleClear() {
    setFilters(initialFilters);
    onChange(initialFilters);
  }

  return (
    <Wrapper>
      <AddButton onClick={onAddJoke}>
        Add joke <PlusIcon />
      </AddButton>
      <FiltersWrapper>
        <FilterField>
          <Label htmlFor="CreatedAt">Created Date:</Label>
          <input
            id="CreatedAt"
            type="date"
            name="CreatedAt"
            value={filters.CreatedAt}
            onChange={handleChange}
          />
        </FilterField>
        <FilterField>
          <Label htmlFor="Views">Views:</Label>
          <input
            id="Views"
            type="number"
            name="Views"
            value={filters.Views}
            onChange={handleChange}
          />
        </FilterField>
        <ClearButton onClick={handleClear}>Clear</ClearButton>
      </FiltersWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
`;

const PlusIcon = styled(FaPlus)`
  margin-left: 8px;
`;

const FiltersWrapper = styled.div`
  display: flex;
`;

const FilterField = styled.div`
  margin-left: 8px;
`;

const ClearButton = styled.button`
  margin-left: 8px;
`;

const Label = styled.label`
  margin-right: 8px;
`;

export default JokesListFilters;
