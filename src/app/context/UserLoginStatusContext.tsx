"use client";

import React, { createContext, useContext, useState } from "react";

type UserloginStatusContext = {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserloginStatusContext = createContext<UserloginStatusContext>({
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {},
});

export default function UserLoginStatusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  return (
    <UserloginStatusContext.Provider
      value={{ isUserLoggedIn, setIsUserLoggedIn }}
    >
      {children}
    </UserloginStatusContext.Provider>
  );
}

export const useUserLoginStatus = () => useContext(UserloginStatusContext);
