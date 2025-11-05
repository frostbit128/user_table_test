import { useState, useEffect } from 'react';
import { User } from '../types/user.types';
import { fetchUsers } from '../services/userService';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return { users, loading, error };
};

