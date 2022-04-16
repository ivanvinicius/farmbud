import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  height: 20px;
  margin-left: 16px;

  span {
    position: absolute;

    width: 160px;
    padding: 8px;
    bottom: calc(100% + 12px);

    background: var(--color-orange);
    color: var(--color-white);

    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    text-align: center;

    left: 50%;
    transform: translateX(-50%);

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s;

    &::before {
      content: '';

      position: absolute;

      top: 100%;
      left: 50%;
      transform: translateX(-50%);

      border-style: solid;
      border-color: var(--color-orange) transparent;
      border-width: 6px 6px 0 6px;
    }
  }

  &:hover span {
    opacity: 0.8;
    visibility: visible;
  }
`;
