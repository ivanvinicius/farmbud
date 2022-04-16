import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  background-color: var(--color-line-in-white);
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  margin: 50px auto;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 25px;

    width: 450px;
    height: 550px;

    border-radius: 8px;
    background-color: var(--color-white);
    color: var(--color-text-base);
    text-decoration: none;

    box-shadow: 6px 6px 9px rgba(0, 0, 0, 0.2);
    transition: all 0.2s;

    &:hover {
      color: var(--color-purple);
      box-shadow: 6px 6px 9px rgba(0, 0, 0, 0.3);
    }
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;

  strong {
    margin: 60px 0 16px 0;
    font-size: 18px;
  }

  span {
    color: var(--color-text-complement);
    font-size: 14px;
    text-align: center;
  }
`;
