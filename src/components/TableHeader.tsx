import React from 'react';
import { SortField, SortDirection } from '../types/user.types';

interface TableHeaderProps {
  field: SortField;
  label: string;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  field,
  label,
  sortField,
  sortDirection,
  onSort,
}) => {
  const isActive = sortField === field;
  const sortIcon = isActive
    ? sortDirection === 'asc'
      ? '↑'
      : '↓'
    : '⇅';

  return (
    <th
      className={`px-4 py-4 text-left bg-gray-50 border-b-2 cursor-pointer select-none transition-colors ${
        isActive
          ? 'bg-blue-50 border-blue-500'
          : 'border-gray-300 hover:bg-gray-100'
      }`}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center justify-between gap-2">
        <span>{label}</span>
        <span className={`text-sm ${isActive ? 'text-blue-500' : 'text-gray-600'}`}>
          {sortIcon}
        </span>
      </div>
    </th>
  );
};

