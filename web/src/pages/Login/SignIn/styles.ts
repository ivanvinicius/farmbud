import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  width: 470px;
  height: 600px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  background: var(--color-white);
  border-radius: 8px;
  box-shadow: 6px 6px 9px rgba(0, 0, 0, 0.2);

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      font-family: 'MuseoModerno', cursive;
      font-weight: 400;
      letter-spacing: -1px;
      font-size: 50px;
    }

    > svg {
      font-size: 40px;
      margin-top: -6px;
      color: var(--color-orange);
    }
  }

  form {
    width: 90%;

    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: var(--color-orange);

    &:hover {
      color: var(--color-orange-dark);
    }
  }
`;
