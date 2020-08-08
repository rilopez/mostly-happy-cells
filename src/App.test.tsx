import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('loading state', () => {
  const { getByText } = render(<App />);
  const loading = getByText(/Loading initial state/i);
  expect(loading).toBeInTheDocument();
});
