import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signUpBackground from '../../assets/sign-up-background.png';

const appearFromRight = keyframes`
  from{
    opacity: 0;
    transform: translateX(50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div.attrs({ className: 'container' })`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div.attrs({ className: 'content' })`
  animation: ${appearFromRight} 1s;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom: 24px;
    }
    a {
      color: #f4ede8;
      text-decoration: none;
      display: block;
      margin-top: 24px;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  > a {
    display: flex;
    align-items: center;
    color: #f4ede8;
    text-decoration: none;
    margin-top: 24px;
    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div.attrs({ className: 'background' })`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
`;
