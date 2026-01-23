import { render, screen } from '@testing-library/react';
import Login from '../../src/app/auth/login/page';

describe('Login Page', () => {
  it('renders login form', () => {
    render(<Login />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders sign up link', () => {
    render(<Login />);
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });
});
