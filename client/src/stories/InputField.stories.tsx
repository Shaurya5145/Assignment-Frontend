import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import InputField from '../components/InputField';

const meta = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with validation states, multiple variants, and built-in accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'ghost'],
      description: 'Visual style variant of the input field',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel'],
      description: 'HTML input type',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the input has validation errors',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading state',
    },
    showClearButton: {
      control: 'boolean',
      description: 'Whether to show clear button when input has value',
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Whether to show password visibility toggle (only for password type)',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper for controlled stories
const ControlledInputField = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  
  return (
    <div className="w-80">
      <InputField
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          args.onChange?.(e);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: ControlledInputField,
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    helperText: "We'll never share your email.",
    variant: 'outlined',
    size: 'md',
  },
};

export const Filled: Story = {
  render: ControlledInputField,
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
    variant: 'filled',
    size: 'md',
  },
};

export const Ghost: Story = {
  render: ControlledInputField,
  args: {
    label: 'Search',
    placeholder: 'Search...',
    type: 'search',
    variant: 'ghost',
    size: 'md',
  },
};

export const WithError: Story = {
  render: ControlledInputField,
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    variant: 'outlined',
    invalid: true,
    errorMessage: 'Password must be at least 8 characters.',
    showPasswordToggle: true,
  },
};

export const Loading: Story = {
  render: ControlledInputField,
  args: {
    label: 'Phone Number',
    placeholder: 'Validating...',
    type: 'tel',
    variant: 'filled',
    loading: true,
  },
};

export const Disabled: Story = {
  render: ControlledInputField,
  args: {
    label: 'Username',
    placeholder: 'Disabled input',
    variant: 'outlined',
    disabled: true,
    value: 'john_doe',
  },
};

export const WithClearButton: Story = {
  render: ControlledInputField,
  args: {
    label: 'Tags',
    placeholder: 'Add tags...',
    variant: 'ghost',
    showClearButton: true,
    value: 'react, typescript',
  },
};

export const PasswordToggle: Story = {
  render: ControlledInputField,
  args: {
    label: 'Password',
    placeholder: 'Create a password',
    type: 'password',
    variant: 'outlined',
    showPasswordToggle: true,
    value: 'secretpassword',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-4 w-80">
      <ControlledInputField {...args} size="sm" label="Small" placeholder="Small input" />
      <ControlledInputField {...args} size="md" label="Medium" placeholder="Medium input" />
      <ControlledInputField {...args} size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
  args: {
    variant: 'outlined',
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="space-y-6 w-80">
      <ControlledInputField {...args} variant="outlined" label="Outlined" placeholder="Outlined variant" />
      <ControlledInputField {...args} variant="filled" label="Filled" placeholder="Filled variant" />
      <ControlledInputField {...args} variant="ghost" label="Ghost" placeholder="Ghost variant" />
    </div>
  ),
  args: {
    size: 'md',
  },
};
