"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

type User = {
  id: string;
  email: string;
  username: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  
  async function refreshUser() {
    try {
      const res = await fetch(
        "https://localhost:7294/api/auth/me",
        {
          credentials: "include"
        }
      );

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data =
        await res.json();
        console.log("ME RESPONSE:", data);

      setUser(data);
    }
    catch {
      setUser(null);
    }
  }

  async function logout() {
    await fetch(
      "https://localhost:7294/api/auth/logout",
      {
        method: "POST",
        credentials: "include"
      }
    );

    setUser(null);

    window.location.href =
      "/login";
  }

  useEffect(() => {
    async function init() {
      await refreshUser();
      setLoading(false);
    }

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth musi być użyty wewnątrz AuthProvider"
    );
  }

  return context;
}