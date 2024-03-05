import React from 'react';

interface UserContextInterface {
  user: { username: string; email: string; roles: string[]; };
  setUser: (user: { username: string; email: string; roles: string[]; }) => void;
}

export const UserContext = React.createContext<UserContextInterface | null>(null);