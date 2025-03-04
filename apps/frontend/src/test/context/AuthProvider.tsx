import { createContext } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthProviderProps>({ children: null });

const AuthProvider = ({ children }: AuthProviderProps) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
