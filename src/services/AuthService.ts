import axios from "axios";
import type { AuthResponse, User } from "../models/User";

const API_URL =
  "https://backend-git-main-tauseef-rasools-projects.vercel.app/api";

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
  role: "admin" | "employee";
}

const getSession = (): AuthResponse | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  const storedUser = localStorage.getItem(USER_KEY);

  if (!token || !storedUser) {
    return null;
  }

  try {
    return {
      token,
      user: JSON.parse(storedUser) as User,
      message: "",
    };
  } catch {
    return null;
  }
};

const login = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    payload
  );

  const data = response.data;

  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));

  return data;
};

const register = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await axios.post(
    `${API_URL}/auth/register`,
    payload
  );

  const data = response.data;

  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));

  return data;
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const AuthService = {
  login,
  register,
  logout,
  getSession,
};

export default AuthService;