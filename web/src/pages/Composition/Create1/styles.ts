import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 250px;

  width: 1270px;
  height: 90px;
  padding: 15px 200px;
  margin: 50px auto 0 auto;

  border-radius: 8px;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.1);
  background-color: var(--color-white);
`;
