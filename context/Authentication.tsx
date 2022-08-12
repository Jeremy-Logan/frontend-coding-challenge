import React from "react";

const defaultAuthValue = {
  user: {
    id: 1, // The challenge assumes that the logged in user is id: 1
  },
};

const AuthenticationContext = React.createContext(defaultAuthValue);

export const useAuthentication = () => React.useContext(AuthenticationContext);

export const AuthenticationProvider = ({
  children,
}: React.PropsWithChildren) => (
  <AuthenticationContext.Provider value={defaultAuthValue}>
    {children}
  </AuthenticationContext.Provider>
);
