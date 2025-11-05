import React, { useMemo, useState, useEffect } from 'react';
import { User, SortField, SortDirection, SortConfig } from '../types/user.types';
import { useUsers } from '../hooks/useUsers';
import { useDebounce } from '../hooks/useDebounce';
import { matchesFilter } from '../utils/filterHelpers';
import { normalizePhoneNumber } from '../utils/sortHelpers';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { FilterInput } from './FilterInput';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { Pagination } from './Pagination';

export const UsersTable: React.FC = () => {
  const { users, loading, error } = useUsers();
  const [filter, setFilter] = useState<string>('');
  const debouncedFilter = useDebounce(filter, 300);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'id',
    direction: 'asc',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleSort = (field: SortField) => {
    setSortConfig((prevConfig) => ({
      field,
      direction: prevConfig.field === field && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedFilter]);

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter((user) => matchesFilter(user, debouncedFilter));

    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortConfig.field === 'company') {
        aValue = a.company.name.toLowerCase();
        bValue = b.company.name.toLowerCase();
      } else if (sortConfig.field === 'phone') {
        aValue = normalizePhoneNumber(a.phone);
        bValue = normalizePhoneNumber(b.phone);
      } else {
        aValue = a[sortConfig.field];
        bValue = b[sortConfig.field];
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return filtered;
  }, [users, debouncedFilter, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredAndSortedUsers.slice(startIndex, endIndex);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="mb-6 text-gray-800">Users Table</h1>
      <FilterInput value={filter} onChange={setFilter} />
      <div className="overflow-x-auto border border-gray-300 rounded">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr>
              <TableHeader
                field="id"
                label="ID"
                sortField={sortConfig.field}
                sortDirection={sortConfig.direction}
                onSort={handleSort}
              />
              <TableHeader
                field="name"
                label="Name"
                sortField={sortConfig.field}
                sortDirection={sortConfig.direction}
                onSort={handleSort}
              />
              <TableHeader
                field="username"
                label="Username"
                sortField={sortConfig.field}
                sortDirection={sortConfig.direction}
                onSort={handleSort}
              />
              <TableHeader
                field="email"
                label="Email"
                sortField={sortConfig.field}
                sortDirection={sortConfig.direction}
                onSort={handleSort}
              />
              <TableHeader
                field="phone"
                label="Phone"
                sortField={sortConfig.field}
                sortDirection={sortConfig.direction}
                onSort={handleSort}
              />
              <TableHeader
                field="company"
                label="Company Name"
                sortField={sortConfig.field}
                sortDirection={sortConfig.direction}
                onSort={handleSort}
              />
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-600 italic">
                  No users found matching your filter.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => <TableRow key={user.id} user={user} />)
            )}
          </tbody>
        </table>
      </div>
      {filteredAndSortedUsers.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredAndSortedUsers.length}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      )}
    </div>
  );
};

