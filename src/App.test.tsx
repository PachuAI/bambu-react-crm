import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByText('Bienvenido')).toBeInTheDocument();
    expect(screen.getByText(/Base React \+ Vite \+ TS \+ Tailwind v4/)).toBeInTheDocument();
    expect(screen.getByText('Bambu React')).toBeInTheDocument();
  });
});