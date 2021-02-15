import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  hasdescription: number;
}

const toastVariants = {
  success: css`
    color: #2e656a;
    background: #e6fffa;
  `,
  error: css`
    color: #c53030;
    background: #fddedd;
  `,
  info: css`
    color: #3172b7;
    background: #e6ffff;
  `,
};

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden;
`;

export const Toast = styled(animated.div)<ToastProps>`
  position: relative;
  width: 360px;
  border-radius: 10px;
  padding: 16px 30px 16px 16px;
  display: flex;
  justify-content: space-around;
  align-items: top;
  ${({ type }) => toastVariants[type]}

  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  & + div {
    margin-top: 8px;
  }
  > svg {
    margin: 4px 12px 0 0;
  }
  div {
    flex: 1;
    p {
      margin-top: 4px;
      font-size: 14px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  ${({ hasdescription }) =>
    !hasdescription &&
    css`
      align-items: center;
      svg {
        margin-top: 0;
      }
    `}
  button {
    position: absolute;
    top: 19px;
    right: 16px;
    border: 0;
    background: transparent;
    display: flex;
    color: inherit;
  }
`;
