import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, X, Loader2, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InputFieldProps } from '@/lib/types';

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled = false,
    invalid = false,
    loading = false,
    variant = 'outlined',
    size = 'md',
    type = 'text',
    showClearButton = false,
    showPasswordToggle = false,
    className,
    id,
    'data-testid': testId,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    React.useEffect(() => {
      if (type === 'password' && showPasswordToggle) {
        setInputType(showPassword ? 'text' : 'password');
      } else {
        setInputType(type);
      }
    }, [type, showPassword, showPasswordToggle]);

    const handleClear = () => {
      if (onChange) {
        const event = {
          target: { value: '' }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Size classes
    const sizeClasses = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2',
      lg: 'px-4 py-3 text-lg'
    };

    // Variant classes
    const variantClasses = {
      outlined: cn(
        'border',
        invalid ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary focus:ring-primary',
        'bg-white focus:ring-2 focus:ring-opacity-50'
      ),
      filled: cn(
        'border-0',
        invalid ? 'bg-red-50 focus:ring-red-500' : 'bg-gray-100 focus:bg-white focus:ring-primary',
        'focus:ring-2 focus:ring-opacity-50'
      ),
      ghost: cn(
        'border-0 border-b-2 bg-transparent',
        invalid ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-primary',
        'focus:outline-none'
      )
    };

    // Radius classes
    const radiusClasses = {
      outlined: size === 'sm' ? 'rounded' : size === 'lg' ? 'rounded-lg' : 'rounded-md',
      filled: size === 'sm' ? 'rounded' : size === 'lg' ? 'rounded-lg' : 'rounded-md',
      ghost: 'rounded-none'
    };

    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const hasRightIcon = loading || (showClearButton && value) || (showPasswordToggle && type === 'password');
    const hasLeftIcon = type === 'search';

    return (
      <div className={cn('w-full', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block font-medium mb-2',
              size === 'sm' ? 'text-xs mb-1' : size === 'lg' ? 'text-base mb-3' : 'text-sm mb-2',
              disabled ? 'text-gray-400' : invalid ? 'text-red-700' : 'text-gray-700'
            )}
            data-testid={testId ? `${testId}-label` : undefined}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {hasLeftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            aria-describedby={cn(
              helperText && !invalid ? helperId : undefined,
              invalid && errorMessage ? errorId : undefined
            )}
            aria-invalid={invalid}
            className={cn(
              'w-full transition-colors',
              sizeClasses[size],
              variantClasses[variant],
              radiusClasses[variant],
              hasLeftIcon && 'pl-10',
              hasRightIcon && 'pr-10',
              disabled && 'cursor-not-allowed opacity-50',
              'placeholder:text-gray-400',
              'focus:outline-none'
            )}
            data-testid={testId}
            {...props}
          />
          
          {hasRightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {loading && (
                <Loader2 className="h-4 w-4 text-primary animate-spin" data-testid={testId ? `${testId}-loading` : undefined} />
              )}
              
              {!loading && showClearButton && value && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  data-testid={testId ? `${testId}-clear` : undefined}
                  aria-label="Clear input"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              
              {!loading && showPasswordToggle && type === 'password' && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  data-testid={testId ? `${testId}-password-toggle` : undefined}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              )}
            </div>
          )}
        </div>
        
        {invalid && errorMessage && (
          <p
            id={errorId}
            className={cn(
              'text-red-600 mt-1',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}
            role="alert"
            data-testid={testId ? `${testId}-error` : undefined}
          >
            {errorMessage}
          </p>
        )}
        
        {!invalid && helperText && (
          <p
            id={helperId}
            className={cn(
              'text-gray-500 mt-1',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}
            data-testid={testId ? `${testId}-helper` : undefined}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
