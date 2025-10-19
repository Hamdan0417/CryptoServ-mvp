import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders with provided label', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies secondary variant classes', () => {
    render(
      <Button data-testid="button" variant="secondary">
        Secondary
      </Button>
    );
    const element = screen.getByTestId('button');
    expect(element.className).toContain('bg-secondary');
  });
});
