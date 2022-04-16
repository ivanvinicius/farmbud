import styled from 'styled-components';

export const Container = styled.div``;

export const HelpContainer = styled.div`
  width: 1270px;
  margin: 50px auto 0 auto;
  background-color: var(--color-white);
  height: 100%;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.2);
  text-align: justify;

  h2 {
    max-width: 1000px;
    color: var(--color-purple);

    &:not(:first-child) {
      margin-top: 52px;
    }
  }

  p {
    margin-top: 4px;
    max-width: 1000px;

    strong {
      color: var(--color-orange);
    }
  }
`;
