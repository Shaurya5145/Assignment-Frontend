import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import DataTable from '../components/DataTable';
import { User, Column } from '../lib/types';

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A powerful data table with sorting, selection, and state management capabilities.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Whether the table is in loading state',
    },
    selectable: {
      control: 'boolean',
      description: 'Whether rows can be selected',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to show when table is empty',
    },
  },
  args: {
    onRowSelect: fn(),
    onSort: fn(),
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleUsers: User[] = [
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
];

// Column definitions
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
        <button className="text-primary hover:text-primary-foreground mr-3">
          Edit
        </button>
        <button className="text-red-600 hover:text-red-900">
          Delete
        </button>
      </div>
    ),
  },
];

// Controlled wrapper for selection stories
const SelectableDataTable = (args: any) => {
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  
  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Selected: {selectedRows.length} row(s)
        </p>
      </div>
      <DataTable
        {...args}
        selectedRows={selectedRows}
        onRowSelect={(rows) => {
          setSelectedRows(rows);
          args.onRowSelect?.(rows);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
  },
};

export const WithSelection: Story = {
  render: SelectableDataTable,
  args: {
    data: sampleUsers,
    columns: userColumns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    loading: true,
    selectable: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyMessage: 'No users found. Add some users to get started.',
  },
};

export const Sortable: Story = {
  render: (args) => {
    const [sortBy, setSortBy] = useState<string>();
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    
    return (
      <div className="w-full">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {sortBy ? `Sorted by: ${sortBy} (${sortDirection})` : 'Click column headers to sort'}
          </p>
        </div>
        <DataTable
          {...args}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={(dataIndex, direction) => {
            setSortBy(dataIndex);
            setSortDirection(direction);
            args.onSort?.(dataIndex, direction);
          }}
        />
      </div>
    );
  },
  args: {
    data: sampleUsers,
    columns: userColumns,
  },
};

export const SimpleTable: Story = {
  args: {
    data: [
      { id: 1, name: 'Product A', price: '$99', category: 'Electronics' },
      { id: 2, name: 'Product B', price: '$149', category: 'Books' },
      { id: 3, name: 'Product C', price: '$79', category: 'Clothing' },
    ],
    columns: [
      { key: 'name', title: 'Product', dataIndex: 'name', sortable: true },
      { key: 'price', title: 'Price', dataIndex: 'price', sortable: true },
      { key: 'category', title: 'Category', dataIndex: 'category' },
    ],
  },
};

export const CustomEmpty: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyMessage: 'Get started by adding your first record.',
  },
};
