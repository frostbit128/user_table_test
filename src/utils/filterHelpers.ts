import { User } from '../types/user.types';

export const matchesFilter = (user: User, searchTerm: string): boolean => {
  if (!searchTerm.trim()) return true;

  const lowerSearchTerm = searchTerm.toLowerCase().trim();

  const searchInObject = (obj: any): boolean => {
    if (obj === null || obj === undefined) return false;

    if (typeof obj === 'string' || typeof obj === 'number') {
      return obj.toString().toLowerCase().includes(lowerSearchTerm);
    }

    if (typeof obj === 'object') {
      return Object.values(obj).some((value) => searchInObject(value));
    }

    return false;
  };

  return searchInObject(user);
};

