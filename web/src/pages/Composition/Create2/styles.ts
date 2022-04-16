import styled from 'styled-components';

export const FormContent = styled.div`
  width: 750px;
  margin: 10px auto;

  p {
    font-size: 13px;
  }
`;

export const ItemOfList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin: 10px auto;
  padding: 15px 30px;

  border-radius: 8px;
  background-color: var(--color-white);
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.1);

  &:first-child {
    margin-top: 50px;
  }
`;

export const ItemInfo = styled.div`
  width: 40%;

  div {
    display: flex;
    align-items: center;
    flex-direction: row;

    strong {
      margin-right: 8px;
    }
  }
`;

export const RecommendationArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  p {
    margin-left: 10px;
  }
`;

export const InputBlock = styled.div`
  width: 40%;

  display: flex;
  align-items: center;
  flex-direction: row;
`;
