import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeaderLayout } from '../DeliveryContdownCard';

describe('HeaderLayout Unit Tests', () => {
  it('should render station name', () => {
    render(<HeaderLayout station="Station A" countdown="10m"/>);
    expect(screen.getByText('Station A')).toBeInTheDocument();
  });

  it('should render countdown time', () => {
    render(<HeaderLayout station="Station B" countdown="5m"/>);
    expect(screen.getByText('5m')).toBeInTheDocument();
  });

  it('should display both station and countdown correctly', () => {
    render(<HeaderLayout station="Station C" countdown="20m"/>);
    expect(screen.getByText('Station C')).toBeInTheDocument();
    expect(screen.getByText('20m')).toBeInTheDocument();
    const container = screen.getByText('Station C').parentNode;
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('items-center');
  });
});