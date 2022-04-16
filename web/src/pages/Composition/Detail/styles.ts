import styled from 'styled-components';

export const HeaderInfo = styled.div`
  width: 750px;
  margin: 50px auto;

  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 22px 30px;

  border-radius: 8px;
  background-color: var(--color-white);
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.1);

  div {
    width: 50%;

    &:first-child {
      width: 50%;
    }

    strong {
      color: var(--color-purple);
    }
  }
`;

export const List = styled.div`
  width: 750px;
  margin: 10px auto;

  p {
    font-size: 14px;
    line-height: 30px;
  }
`;

export const ItemOfList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin: 10px auto;
  padding: 22px 30px;

  border-radius: 8px;
  background-color: var(--color-white);
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.1);
`;

export const ItemInfo = styled.div`
  width: 50%;

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
  width: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;
