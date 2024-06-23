"use client"

import React, { ReactNode, createContext, useContext, useState } from 'react';

interface User {
  name: string;
  email: string;
  notifications: boolean;
  currentIntake: number;
  suggestedIntake: number;
  dailyIntake: number[];
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    notifications: true,
    currentIntake: 0,
    suggestedIntake: 2000, // Example suggested intake
    dailyIntake: Array(30).fill(0), // Example daily intake for the current month
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
