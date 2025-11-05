import { User } from '../types/user.types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }
  
  return response.json();
};

