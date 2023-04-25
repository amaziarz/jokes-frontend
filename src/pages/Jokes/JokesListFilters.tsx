import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { JokesFilters } from 'services/jokesApi';

interface Props {
  onChange: (filters: JokesFilters) => void;
  onAddJoke: () => void;
  initialFilters: JokesFilters;
}

function JokesListFilters({ onChange, onAddJoke, initialFilters }: Props) {
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
    const areFiltersChanged = Object.values(filters).some(Boolean);
    if (areFiltersChanged) {
      const emptyFilters = {
        Views: '',
        CreatedAt: '',
      };
      setFilters(emptyFilters);
      onChange(emptyFilters);
    }
  }

  return (
    <div
      css={`
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
      `}
    >
      <button
        onClick={onAddJoke}
        css={`
          display: flex;
          align-items: center;
        `}
      >
        Add joke <FaPlus css="margin-left: 8px;" />
      </button>
      <div css="display: flex;">
        <FieldWrapper>
          <label htmlFor="CreatedAt">Created Date:</label>
          <input
            id="CreatedAt"
            type="date"
            name="CreatedAt"
            value={filters.CreatedAt}
            onChange={handleChange}
          />
        </FieldWrapper>
        <FieldWrapper>
          <label htmlFor="Views">Views:</label>
          <input
            id="Views"
            type="number"
            name="Views"
            value={filters.Views}
            onChange={handleChange}
            min="0"
          />
        </FieldWrapper>
        <button onClick={handleClear} css="margin-left: 0.5rem;">
          Clear
        </button>
      </div>
    </div>
  );
}

const FieldWrapper = styled.div`
  margin-left: 0.5rem;

  label {
    margin-right: 0.25rem;
  }
`;

export default JokesListFilters;
