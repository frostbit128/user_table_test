import React from 'react';
import { User } from '../types/user.types';

interface TableRowProps {
  user: User;
}

export const TableRow: React.FC<TableRowProps> = ({ user }) => {
  return (
    <tr className="border-b border-gray-300 transition-colors hover:bg-gray-50 even:bg-gray-50 even:hover:bg-gray-100">
      <td className="px-4 py-4 text-gray-800">{user.id}</td>
      <td className="px-4 py-4 text-gray-800">{user.name}</td>
      <td className="px-4 py-4 text-gray-800">{user.username}</td>
      <td className="px-4 py-4 text-gray-800">{user.email}</td>
      <td className="px-4 py-4 text-gray-800">{user.phone}</td>
      <td className="px-4 py-4 text-gray-800">{user.company.name}</td>
    </tr>
  );
};

