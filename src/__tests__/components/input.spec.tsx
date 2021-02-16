import { fireEvent, render, wait } from '@testing-library/react';
import React from 'react';

import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField: () => ({
      fieldName: 'test',
      registerField: jest.fn(),
    }),
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="test" placeholder="test" />,
    );
    expect(getByPlaceholderText('test')).toBeTruthy();
  });
  it('should highlight focused input', async () => {
    const { getByTestId } = render(<Input name="test" placeholder="test" />);
    const containerElement = getByTestId('container-input-id');
    const inputElement = getByTestId('input-id');
    fireEvent.focus(containerElement);
    await wait(() => {
      expect(inputElement).toHaveStyle('border-color: #ff9000');
    });
  });
});
