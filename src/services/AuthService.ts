import axios from "axios";
import type { AuthResponse, User } from "../models/User";

const API_URL = "http://localhost:5000/api";
const TOKEN_KEY = "employee-dashboard-token";
const USER_KEY = "employee-dashboard-user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  role?: "admin" | "employee";
}

const getSession = (): { token: string; user: User } | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  const storedUser = localStorage.getItem(USER_KEY);

  if (!token || !storedUser) {
    return null;
  }

  try {
    return {
      token,
      user: JSON.parse(storedUser) as User,
    };
  } catch {
    return null;
  }
};

const isAuthenticated = (): boolean => Boolean(getSession());

const storeSession = (token: string, user: User) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const login = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, payload);

  const { token, user } = response.data;
  storeSession(token, user);

  return response.data as AuthResponse;
};

const register = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/auth/register`, payload);

  const { token, user } = response.data;
  storeSession(token, user);

  return response.data as AuthResponse;
};

const AuthService = {
  getSession,
  isAuthenticated,
  login,
  register,
  logout,
};

export default AuthService;
