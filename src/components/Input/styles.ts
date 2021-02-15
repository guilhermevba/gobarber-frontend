import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface Props {
  hasIcon: boolean;
  hasErrors: boolean;
}
export default styled.div<Props>`
  display: flex;
  position: relative;
  align-items: center;
  color: #666360;
  &:focus-within {
    input {
      border-color: #ff9000;
    }
    svg {
      color: #ff9000;
    }
  }
  & + div {
    margin-top: 8px;
  }
  > svg {
    left: 12px;
    position: absolute;
    z-index: 1;
  }
  input {
    background: #232129;
    border-radius: 10px;
    border: 2px solid #232129;
    color: #f4ede8;
    padding: 16px;
    ${({ hasErrors }) =>
      hasErrors &&
      css`
        border-color: #c53030;
        padding-right: 44px;
      `}
    &:not(:placeholder-shown) + svg {
      color: #ff9000;
    }
    ${({ hasIcon }) =>
      hasIcon &&
      css`
        padding-left: 44px;
      `};
    width: 100%;
  }
`;

export const Error = styled(Tooltip)`
  position: absolute;
  right: 12px;
  svg {
    color: #c53030;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
