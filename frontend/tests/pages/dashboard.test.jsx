import { render, screen } from '@testing-library/react';
import Dashboard from '../../src/app/dashboard/page';

describe('Dashboard Page', () => {
  it('renders dashboard title', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders dashboard cards', () => {
    render(<Dashboard />);
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });
});
