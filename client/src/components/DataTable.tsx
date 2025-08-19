import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DataTableProps, Column } from '@/lib/types';

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  selectedRows = [],
  onSort,
  sortBy,
  sortDirection,
  emptyMessage = 'No data available',
  className,
  'data-testid': testId,
}: DataTableProps<T>) {
  const [internalSelectedRows, setInternalSelectedRows] = useState<T[]>(selectedRows);
  const [internalSortBy, setInternalSortBy] = useState<string | undefined>(sortBy);
  const [internalSortDirection, setInternalSortDirection] = useState<'asc' | 'desc'>('asc');

  const selectedRowsState = onRowSelect ? selectedRows : internalSelectedRows;
  const currentSortBy = onSort ? sortBy : internalSortBy;
  const currentSortDirection = onSort ? sortDirection : internalSortDirection;

  const handleRowSelect = (row: T, checked: boolean) => {
    const newSelectedRows = checked
      ? [...selectedRowsState, row]
      : selectedRowsState.filter(selectedRow => 
          JSON.stringify(selectedRow) !== JSON.stringify(row)
        );

    if (onRowSelect) {
      onRowSelect(newSelectedRows);
    } else {
      setInternalSelectedRows(newSelectedRows);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = checked ? [...data] : [];
    
    if (onRowSelect) {
      onRowSelect(newSelectedRows);
    } else {
      setInternalSelectedRows(newSelectedRows);
    }
  };

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    const dataIndex = String(column.dataIndex);
    let newDirection: 'asc' | 'desc' = 'asc';

    if (currentSortBy === dataIndex && currentSortDirection === 'asc') {
      newDirection = 'desc';
    }

    if (onSort) {
      onSort(dataIndex, newDirection);
    } else {
      setInternalSortBy(dataIndex);
      setInternalSortDirection(newDirection);
    }
  };

  const sortedData = useMemo(() => {
    if (!currentSortBy || onSort) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[currentSortBy];
      const bValue = b[currentSortBy];

      if (aValue < bValue) {
        return currentSortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return currentSortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, currentSortBy, currentSortDirection, onSort]);

  const isAllSelected = data.length > 0 && selectedRowsState.length === data.length;
  const isIndeterminate = selectedRowsState.length > 0 && selectedRowsState.length < data.length;

  const isRowSelected = (row: T) => {
    return selectedRowsState.some(selectedRow => 
      JSON.stringify(selectedRow) === JSON.stringify(row)
    );
  };

  const getSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;

    const dataIndex = String(column.dataIndex);
    
    if (currentSortBy === dataIndex) {
      return currentSortDirection === 'asc' ? 
        <ChevronUp className="h-4 w-4 text-primary" /> : 
        <ChevronDown className="h-4 w-4 text-primary" />;
    }
    
    return <ChevronsUpDown className="h-4 w-4 text-gray-400" />;
  };

  const LoadingSkeleton = () => (
    <>
      {[...Array(3)].map((_, index) => (
        <tr key={index}>
          {selectable && (
            <td className="w-4 px-6 py-4">
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
          )}
          {columns.map((column) => (
            <td key={column.key} className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );

  const EmptyState = () => (
    <tr>
      <td 
        colSpan={columns.length + (selectable ? 1 : 0)} 
        className="px-6 py-12 text-center"
      >
        <div className="flex flex-col items-center">
          <div className="text-gray-300 text-4xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No data available</h3>
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      </td>
    </tr>
  );

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full" data-testid={testId}>
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="w-4 px-6 py-3">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    data-testid={testId ? `${testId}-select-all` : undefined}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    column.sortable && 'cursor-pointer hover:bg-gray-100 transition-colors'
                  )}
                  onClick={() => handleSort(column)}
                  style={{ width: column.width }}
                  data-testid={testId ? `${testId}-header-${column.key}` : undefined}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && <LoadingSkeleton />}
            
            {!loading && sortedData.length === 0 && <EmptyState />}
            
            {!loading && sortedData.length > 0 && sortedData.map((row, index) => {
              const isSelected = isRowSelected(row);
              return (
                <tr
                  key={index}
                  className={cn(
                    'hover:bg-gray-50 transition-colors',
                    isSelected && 'bg-blue-50'
                  )}
                  data-testid={testId ? `${testId}-row-${index}` : undefined}
                >
                  {selectable && (
                    <td className="w-4 px-6 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleRowSelect(row, e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        data-testid={testId ? `${testId}-row-${index}-select` : undefined}
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap"
                      data-testid={testId ? `${testId}-cell-${index}-${column.key}` : undefined}
                    >
                      {column.render 
                        ? column.render(row[column.dataIndex], row, index)
                        : String(row[column.dataIndex] || '')
                      }
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
