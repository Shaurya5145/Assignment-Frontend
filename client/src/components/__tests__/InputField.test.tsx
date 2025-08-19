import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InputField from '../InputField';

describe('InputField', () => {
  it('renders with label and placeholder', () => {
    render(
      <InputField
        label="Email"
        placeholder="Enter email"
        data-testid="input-field"
      />
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn();
    render(
      <InputField
        label="Email"
        onChange={handleChange}
        data-testid="input-field"
      />
    );

    const input = screen.getByTestId('input-field');
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'test@example.com' })
      })
    );
  });

  it('displays error message when invalid', () => {
    render(
      <InputField
        label="Password"
        invalid
        errorMessage="Password is required"
        data-testid="input-field"
      />
    );

    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays helper text when provided', () => {
    render(
      <InputField
        label="Email"
        helperText="We'll never share your email"
        data-testid="input-field"
      />
    );

    expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    render(
      <InputField
        label="Phone"
        loading
        data-testid="input-field"
      />
    );

    expect(screen.getByTestId('input-field-loading')).toBeInTheDocument();
  });

  it('shows clear button when showClearButton is true and has value', () => {
    const handleChange = vi.fn();
    render(
      <InputField
        label="Search"
        value="test"
        onChange={handleChange}
        showClearButton
        data-testid="input-field"
      />
    );

    const clearButton = screen.getByTestId('input-field-clear');
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '' })
      })
    );
  });

  it('toggles password visibility when showPasswordToggle is true', () => {
    render(
      <InputField
        type="password"
        value="secret"
        showPasswordToggle
        data-testid="input-field"
      />
    );

    const input = screen.getByTestId('input-field') as HTMLInputElement;
    const toggleButton = screen.getByTestId('input-field-password-toggle');

    expect(input.type).toBe('password');

    fireEvent.click(toggleButton);
    expect(input.type).toBe('text');

    fireEvent.click(toggleButton);
    expect(input.type).toBe('password');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(
      <InputField variant="outlined" data-testid="input-field" />
    );
    let input = screen.getByTestId('input-field');
    expect(input).toHaveClass('border');

    rerender(<InputField variant="filled" data-testid="input-field" />);
    input = screen.getByTestId('input-field');
    expect(input).toHaveClass('bg-gray-100');

    rerender(<InputField variant="ghost" data-testid="input-field" />);
    input = screen.getByTestId('input-field');
    expect(input).toHaveClass('border-b-2', 'bg-transparent');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(
      <InputField size="sm" data-testid="input-field" />
    );
    let input = screen.getByTestId('input-field');
    expect(input).toHaveClass('px-2', 'py-1', 'text-sm');

    rerender(<InputField size="md" data-testid="input-field" />);
    input = screen.getByTestId('input-field');
    expect(input).toHaveClass('px-3', 'py-2');

    rerender(<InputField size="lg" data-testid="input-field" />);
    input = screen.getByTestId('input-field');
    expect(input).toHaveClass('px-4', 'py-3', 'text-lg');
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <InputField
        label="Disabled Input"
        disabled
        data-testid="input-field"
      />
    );

    const input = screen.getByTestId('input-field');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('cursor-not-allowed', 'opacity-50');
  });

  it('has proper accessibility attributes', () => {
    render(
      <InputField
        label="Email"
        helperText="Helper text"
        invalid
        errorMessage="Error message"
        data-testid="input-field"
      />
    );

    const input = screen.getByTestId('input-field');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('shows search icon for search type', () => {
    render(
      <InputField
        type="search"
        placeholder="Search..."
        data-testid="input-field"
      />
    );

    const input = screen.getByTestId('input-field');
    expect(input).toHaveClass('pl-10');
  });
});
