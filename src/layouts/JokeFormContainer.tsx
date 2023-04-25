import { Outlet, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/all';
import styled from 'styled-components';

function JokeFormContainer() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <CloseButton aria-label="Close" onClick={() => navigate('/jokes')}>
        <FaTimes size={24} />
      </CloseButton>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 600px;
  margin: 48px auto;
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.fontColor};
  position: absolute;
  left: -48px;
  top: -24px;
`;

export default JokeFormContainer;
