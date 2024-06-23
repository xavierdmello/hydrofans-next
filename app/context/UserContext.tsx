"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

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

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({
    name: "William Wang",
    email: "bwilliamwang@gmail.com",
    notifications: true,
    currentIntake: 0,
    suggestedIntake: 2000,
    dailyIntake: [
      2000, 1500, 1800, 1900, 1600, 1700, 2300, 2000, 1500, 1800, 1900, 1600,
      1700, 2000, 1500, 1800, 1900, 1600, 1700, 2000, 1500, 1800,
    ],
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
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
