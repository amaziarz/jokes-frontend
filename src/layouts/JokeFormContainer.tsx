import { Outlet, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { css } from 'styled-components';

function JokeFormContainer() {
  const navigate = useNavigate();

  return (
    <div
      css={`
        max-width: 37.5rem;
        margin: 3rem auto;
        position: relative;
      `}
    >
      <button
        aria-label="Close"
        onClick={() => navigate('/jokes')}
        css={css`
          background: none;
          border: none;
          cursor: pointer;
          color: ${(props) => props.theme.fontColor};
          position: absolute;
          left: -3rem;
          top: -1.5rem;
        `}
      >
        <FaTimes size={24} />
      </button>
      <Outlet />
    </div>
  );
}

export default JokeFormContainer;
