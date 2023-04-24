import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { JokesFilters } from 'services/jokesApi';

interface Props {
  onChange: (filters: JokesFilters) => void;
}

const initialFilters: JokesFilters = {
  CreatedAt: '',
  Views: '',
};

function JokesListFilters({ onChange }: Props) {
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
      <FilterWrapper>
        <Label htmlFor="CreatedAt">Created Date:</Label>
        <input
          id="CreatedAt"
          type="date"
          name="CreatedAt"
          value={filters.CreatedAt}
          onChange={handleChange}
        />
      </FilterWrapper>
      <FilterWrapper>
        <Label htmlFor="Views">Views:</Label>
        <input
          id="Views"
          type="number"
          name="Views"
          value={filters.Views}
          onChange={handleChange}
        />
      </FilterWrapper>
      <ClearButton onClick={handleClear}>Clear</ClearButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const FilterWrapper = styled.div`
  margin-left: 8px;
`;

const ClearButton = styled.button`
  margin-left: 8px;
`;

const Label = styled.label`
  margin-right: 8px;
`;

export default JokesListFilters;
