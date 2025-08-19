import React, { useState } from 'react';
import { Moon, Sun, Github } from 'lucide-react';
import InputField from '@/components/InputField';
import DataTable from '@/components/DataTable';
import { User, Column } from '@/lib/types';

export default function ComponentShowcase() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState('inputfield');
  
  // InputField demo states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('Example Corp');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState('');
  
  // Form validation states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('Password must be at least 8 characters.');
  const [isPhoneLoading, setIsPhoneLoading] = useState(false);

  // DataTable demo data
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      username: '@johndoe',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      username: '@janesmith',
      role: 'Editor',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Mike Brown',
      email: 'mike@example.com',
      username: '@mikebrown',
      role: 'Viewer',
      status: 'Pending',
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      username: '@sarahwilson',
      role: 'Editor',
      status: 'Inactive',
    },
    {
      id: '5',
      name: 'David Johnson',
      email: 'david@example.com',
      username: '@davidjohnson',
      role: 'Viewer',
      status: 'Active',
    },
  ]);

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [tableLoading, setTableLoading] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const simulatePhoneValidation = () => {
    setIsPhoneLoading(true);
    setTimeout(() => {
      setIsPhoneLoading(false);
    }, 2000);
  };

  const userColumns: Column<User>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sortable: true,
      render: (value, record) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              {record.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{record.name}</div>
            <div className="text-sm text-gray-500">{record.username}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      sortable: true,
      render: (value) => (
        <div className="text-sm text-gray-900">{value}</div>
      ),
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      render: (value) => {
        const roleColors = {
          Admin: 'bg-purple-100 text-purple-800',
          Editor: 'bg-blue-100 text-blue-800',
          Viewer: 'bg-gray-100 text-gray-800',
        };
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleColors[value as keyof typeof roleColors]}`}>
            {value}
          </span>
        );
      },
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sortable: true,
      render: (value) => {
        const statusColors = {
          Active: 'bg-green-100 text-green-800',
          Inactive: 'bg-red-100 text-red-800',
          Pending: 'bg-yellow-100 text-yellow-800',
        };
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[value as keyof typeof statusColors]}`}>
            {value}
          </span>
        );
      },
    },
    {
      key: 'actions',
      title: 'Actions',
      dataIndex: 'id',
      render: () => (
        <div className="text-sm font-medium">
          <button className="text-primary hover:text-primary-foreground mr-3" data-testid="button-edit">
            Edit
          </button>
          <button className="text-red-600 hover:text-red-900" data-testid="button-delete">
            Delete
          </button>
        </div>
      ),
    },
  ];

  const navItems = [
    { id: 'inputfield', label: 'InputField' },
    { id: 'datatable', label: 'DataTable' },
    { id: 'examples', label: 'Examples' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                React Component Library
              </h1>
              <span className="ml-3 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                v1.0.0
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                data-testid="button-theme-toggle"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              <a
                href="https://github.com/Shaurya5145/Assignment-Frontend"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                data-testid="link-github"
                aria-label="View on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                data-testid={`button-tab-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* InputField Section */}
        {activeTab === 'inputfield' && (
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                InputField Component
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                A flexible input component with validation states, multiple variants, and built-in accessibility features.
              </p>

              {/* Component API */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Props Interface</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-800 dark:text-gray-200">
{`interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'email' | 'password' | 'search' | 'tel';
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
  id?: string;
}`}
                  </pre>
                </div>
              </div>

              {/* Variants Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Outlined Variant */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Outlined Variant</h4>
                  
                  <div className="space-y-6">
                    <InputField
                      label="Email Address"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value);
                      }}
                      helperText="We'll never share your email."
                      variant="outlined"
                      data-testid="input-email-outlined"
                    />

                    <InputField
                      label="Password"
                      placeholder="Enter password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      invalid={!!passwordError}
                      errorMessage={passwordError}
                      variant="outlined"
                      showPasswordToggle
                      data-testid="input-password-outlined"
                    />

                    <InputField
                      label="Username"
                      placeholder="Disabled input"
                      disabled
                      variant="outlined"
                      data-testid="input-disabled-outlined"
                    />
                  </div>
                </div>

                {/* Filled Variant */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filled Variant</h4>
                  
                  <div className="space-y-6">
                    <InputField
                      label="Full Name"
                      placeholder="Enter your name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      variant="filled"
                      data-testid="input-name-filled"
                    />

                    <InputField
                      label="Phone Number"
                      placeholder={isPhoneLoading ? "Validating..." : "Enter phone number"}
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (!isPhoneLoading) {
                          simulatePhoneValidation();
                        }
                      }}
                      loading={isPhoneLoading}
                      variant="filled"
                      data-testid="input-phone-filled"
                    />

                    <InputField
                      label="Company"
                      placeholder="Enter company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      variant="filled"
                      data-testid="input-company-filled"
                    />
                  </div>
                </div>

                {/* Ghost Variant */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ghost Variant</h4>
                  
                  <div className="space-y-6">
                    <InputField
                      label="Search"
                      placeholder="Search..."
                      type="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      variant="ghost"
                      data-testid="input-search-ghost"
                    />

                    <InputField
                      label="Tags"
                      placeholder="Add tags..."
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      variant="ghost"
                      showClearButton
                      data-testid="input-tags-ghost"
                    />

                    <InputField
                      placeholder="Minimal input..."
                      variant="ghost"
                      size="lg"
                      data-testid="input-minimal-ghost"
                    />
                  </div>
                </div>
              </div>

              {/* Size Variations */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Size Variations</h3>
                <div className="space-y-4">
                  <InputField
                    label="Small (sm)"
                    placeholder="Small input"
                    variant="outlined"
                    size="sm"
                    data-testid="input-size-small"
                  />
                  
                  <InputField
                    label="Medium (md)"
                    placeholder="Medium input"
                    variant="outlined"
                    size="md"
                    data-testid="input-size-medium"
                  />
                  
                  <InputField
                    label="Large (lg)"
                    placeholder="Large input"
                    variant="outlined"
                    size="lg"
                    data-testid="input-size-large"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* DataTable Section */}
        {activeTab === 'datatable' && (
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                DataTable Component
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                A powerful data table with sorting, selection, and state management capabilities.
              </p>

              {/* Component API */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Props Interface</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-800 dark:text-gray-200">
{`interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  selectedRows?: T[];
  onSort?: (dataIndex: string, direction: 'asc' | 'desc') => void;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  emptyMessage?: string;
  className?: string;
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string | number;
}`}
                  </pre>
                </div>
              </div>

              {/* Full Featured Table */}
              <div className="mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h3>
                    <div className="flex items-center space-x-3">
                      {selectedUsers.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {selectedUsers.length} selected
                          </span>
                          <button 
                            className="px-3 py-1 bg-red-50 text-red-700 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
                            data-testid="button-delete-selected"
                          >
                            Delete Selected
                          </button>
                        </div>
                      )}
                      <button 
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                        data-testid="button-add-user"
                      >
                        Add User
                      </button>
                    </div>
                  </div>
                </div>

                <DataTable
                  data={users}
                  columns={userColumns}
                  loading={tableLoading}
                  selectable
                  selectedRows={selectedUsers}
                  onRowSelect={setSelectedUsers}
                  data-testid="table-users"
                />

                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => {
                      setTableLoading(true);
                      setTimeout(() => setTableLoading(false), 2000);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
                    data-testid="button-simulate-loading"
                  >
                    Simulate Loading
                  </button>
                  <button
                    onClick={() => setSelectedUsers([])}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
                    data-testid="button-clear-selection"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>

              {/* Empty State Example */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Empty State</h3>
                <DataTable
                  data={[]}
                  columns={userColumns}
                  emptyMessage="Get started by adding your first record."
                  data-testid="table-empty"
                />
              </div>
            </div>
          </section>
        )}

        {/* Examples Section */}
        {activeTab === 'examples' && (
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Usage Examples
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Real-world implementation examples and code snippets.
              </p>

              {/* Form Example */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  User Registration Form
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <form className="space-y-6">
                    <InputField
                      label="First Name"
                      placeholder="Enter your first name"
                      variant="outlined"
                      data-testid="input-firstname-example"
                    />
                    
                    <InputField
                      label="Email Address"
                      placeholder="Enter your email"
                      type="email"
                      invalid={!!emailError}
                      errorMessage={emailError}
                      variant="outlined"
                      data-testid="input-email-example"
                    />
                    
                    <InputField
                      label="Password"
                      placeholder="Create a password"
                      type="password"
                      helperText="Must be at least 8 characters long."
                      variant="outlined"
                      showPasswordToggle
                      data-testid="input-password-example"
                    />
                    
                    <InputField
                      label="Company (Optional)"
                      placeholder="Enter company name"
                      variant="filled"
                      data-testid="input-company-example"
                    />
                    
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                      data-testid="button-submit-form"
                    >
                      Create Account
                    </button>
                  </form>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-800 dark:text-gray-200">
{`<InputField
  label="Email Address"
  placeholder="Enter your email"
  variant="outlined"
  size="md"
  invalid={hasError}
  errorMessage="Please enter a valid email"
  value={email}
  onChange={handleEmailChange}
/>`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Code Documentation */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Installation & Usage
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Installation</h4>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4">
                      <code className="text-sm text-gray-800 dark:text-gray-200">
                        npm install @your-org/react-components
                      </code>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Import</h4>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4">
                      <code className="text-sm text-gray-800 dark:text-gray-200">
                        {`import { InputField, DataTable } from '@your-org/react-components';`}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm">
              Built with React, TypeScript, and TailwindCSS • 
              <a href="https://github.com/Shaurya5145/Assignment-Frontend" className="text-primary hover:text-primary/80 ml-1">View on GitHub</a> • 
              <a href="https://storybook-static-wine.vercel.app/" className="text-primary hover:text-primary/80 ml-1" target="_blank" rel="noreferrer noopener">Storybook</a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
