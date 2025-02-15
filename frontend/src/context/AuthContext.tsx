import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  login: (userId: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (userId: string) => {
    localStorage.setItem("userId", userId);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!userId, userId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
