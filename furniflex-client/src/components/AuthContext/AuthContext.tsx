


import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {jwtDecode} from "jwt-decode"; 
import axiosInstance from "@/utils/axiosInstance";

interface AuthContextType {
  user: any; // Replace 'any' with your user type
  setUser: (user: any) => void;
  isAuthenticated: boolean;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkTokenExpiry = (token: string) => {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decodedToken.exp > currentTime;
    } catch {
      return false;
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axiosInstance.post(
        "/auth/refresh-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const newToken = response.data.accessToken;
      localStorage.setItem("accessToken", newToken);
      const decodedToken: any = jwtDecode(newToken);
      setUser(decodedToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  };

  useEffect(() => {
    const authenticate = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        if (checkTokenExpiry(token)) {
          try {
            const decodedToken: any = jwtDecode(token);
            setUser(decodedToken);
            setIsAuthenticated(true);
          } catch (error) {
            console.error("Invalid token:", error);
            setIsAuthenticated(false);
          }
        } else {
          // Optionally, attempt to refresh the token
          await refreshToken();
        }
      }
    };

    authenticate();
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, logout, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};




