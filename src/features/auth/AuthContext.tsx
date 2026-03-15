import { createContext, useState, useCallback, type ReactNode } from "react";

/* This class act like a SpringSecutity Config class */

export interface User {
  username: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "bookstore_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (username: string, _password: string) => {
    // Mock auth — accepts any non-empty credentials.
    // Replace with a real API call when backend auth is implemented.
    if (!username.trim()) {
      throw new Error("Username is required");
    }

    const newUser: User = { username: username.trim() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: user !== null, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}


/*
Versions of AuthContext.tsx
// 2026.03.15 : Created a Auth Context.tsx to manage the authentication state of the user 
                similar to Spring Security Config class or server side session management only client side session management.


*/
