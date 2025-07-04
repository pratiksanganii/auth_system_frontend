"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as authApi from "../api/authApi";
import { LOCAL_STORAGE } from "@/globals";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
}

interface IResponse {
  accessToken: string;
  refreshToken: string;
  user: { email: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentUser = async () => {
    await commonOps(authApi.getCurrentUser);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const login = async (email: string, password: string) => {
    await commonOps(() => authApi.login(email, password));
  };

  const register = async (email: string, password: string) => {
    await commonOps(() => authApi.register(email, password));
  };

  const logout = async () => {
    await commonOps(authApi.logout, true);
  };

  async function commonOps(callAPI: () => Promise<void>, setNull = false) {
    setLoading(true);
    setError(null);
    try {
      const user: unknown = await callAPI();
      const err = (user as { errMsg: string })?.errMsg;
      if (err) throw new Error(err);
      setUser(setNull ? null : (user as User));
      if (!setNull && user) {
        const resData: IResponse = user as IResponse;
        localStorage.setItem(LOCAL_STORAGE.TOKEN, resData.accessToken);
        localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, resData.refreshToken);
      }
    } catch (e: unknown) {
      if (!setNull) setUser(null);
      setError((e as Error).message);
      if (!setNull) setUser(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout, getCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");

  return context;
}
