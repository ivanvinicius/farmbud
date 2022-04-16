import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  width: 530px;
  height: 600px;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;

  background: var(--color-white);
  border-radius: 8px;
  box-shadow: 6px 6px 9px rgba(0, 0, 0, 0.2);

  form {
    width: 90%;

    display: flex;
    flex-direction: column;

    > button {
      width: 90%;
      align-self: center;
    }
  }

  a {
    margin-top: 30px;
    text-decoration: none;
    color: var(--color-orange);

    &:hover {
      color: var(--color-orange-dark);
    }
  }
`;

export const AddressGroup = styled.div`
  margin-top: 15px;

  display: grid;
  grid-template-columns: 2fr 4fr;
  column-gap: 15px;
`;
