import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DataTable from '../DataTable';
import { User, Column } from '../../lib/types';

describe('DataTable', () => {
  const sampleData: User[] = [
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
      status: 'Inactive',
    },
  ];

  const columns: Column<User>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sortable: true,
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      sortable: true,
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
    },
  ];

  it('renders table with data', () => {
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        data-testid="data-table"
      />
    );

    expect(screen.getByTestId('data-table')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        data-testid="data-table"
      />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
  });

  it('shows loading skeleton when loading', () => {
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        loading
        data-testid="data-table"
      />
    );

    const skeletonElements = screen.getAllByRole('cell');
    const skeletonDivs = skeletonElements.filter(cell => 
      cell.querySelector('.animate-pulse')
    );
    expect(skeletonDivs.length).toBeGreaterThan(0);
  });

  it('shows empty state when no data', () => {
    render(
      <DataTable
        data={[]}
        columns={columns}
        emptyMessage="No users found"
        data-testid="data-table"
      />
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('handles row selection when selectable', () => {
    const handleRowSelect = vi.fn();
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        selectable
        onRowSelect={handleRowSelect}
        data-testid="data-table"
      />
    );

    const selectAllCheckbox = screen.getByTestId('data-table-select-all');
    expect(selectAllCheckbox).toBeInTheDocument();

    const firstRowCheckbox = screen.getByTestId('data-table-row-0-select');
    fireEvent.click(firstRowCheckbox);

    expect(handleRowSelect).toHaveBeenCalledWith([sampleData[0]]);
  });

  it('handles select all functionality', () => {
    const handleRowSelect = vi.fn();
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        selectable
        onRowSelect={handleRowSelect}
        data-testid="data-table"
      />
    );

    const selectAllCheckbox = screen.getByTestId('data-table-select-all');
    fireEvent.click(selectAllCheckbox);

    expect(handleRowSelect).toHaveBeenCalledWith(sampleData);
  });

  it('handles sorting when column is sortable', () => {
    const handleSort = vi.fn();
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        onSort={handleSort}
        data-testid="data-table"
      />
    );

    const nameHeader = screen.getByTestId('data-table-header-name');
    fireEvent.click(nameHeader);

    expect(handleSort).toHaveBeenCalledWith('name', 'asc');

    // Click again for descending
    fireEvent.click(nameHeader);
    expect(handleSort).toHaveBeenCalledWith('name', 'desc');
  });

  it('renders custom cell content with render function', () => {
    const customColumns: Column<User>[] = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        render: (value, record) => (
          <div>
            <strong>{value}</strong>
            <div>{record.username}</div>
          </div>
        ),
      },
    ];

    render(
      <DataTable
        data={sampleData}
        columns={customColumns}
        data-testid="data-table"
      />
    );

    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('@janesmith')).toBeInTheDocument();
  });

  it('highlights selected rows', () => {
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        selectable
        selectedRows={[sampleData[0]]}
        data-testid="data-table"
      />
    );

    const firstRow = screen.getByTestId('data-table-row-0');
    expect(firstRow).toHaveClass('bg-blue-50');
  });

  it('applies hover effects to rows', () => {
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        data-testid="data-table"
      />
    );

    const firstRow = screen.getByTestId('data-table-row-0');
    expect(firstRow).toHaveClass('hover:bg-gray-50');
  });

  it('handles indeterminate state for select all checkbox', () => {
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        selectable
        selectedRows={[sampleData[0]]} // Only one selected
        data-testid="data-table"
      />
    );

    const selectAllCheckbox = screen.getByTestId('data-table-select-all') as HTMLInputElement;
    expect(selectAllCheckbox.indeterminate).toBe(true);
  });

  it('displays correct accessibility attributes', () => {
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        selectable
        data-testid="data-table"
      />
    );

    const selectAllCheckbox = screen.getByTestId('data-table-select-all');
    expect(selectAllCheckbox).toHaveAttribute('aria-label', 'Select all rows');

    const firstRowCheckbox = screen.getByTestId('data-table-row-0-select');
    expect(firstRowCheckbox).toHaveAttribute('aria-label', 'Select row 1');
  });
});
