import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

export const AddProductsContainer = styled.div`
  width: 1270px;
  height: 80px;
  padding: 30px;
  margin: 50px auto 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-around;

  border-radius: 8px;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.1);
  background-color: var(--color-white);

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;

    padding: 0 26px;
    border-radius: 8px;
    text-decoration: none;
    cursor: pointer;

    color: var(--color-button-text);
    background: var(--color-purple);
    box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.2);

    transition: background 0.3s;

    &:hover {
      background: var(--color-purple-dark);
    }
  }
`;
