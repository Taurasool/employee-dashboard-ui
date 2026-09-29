export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "employee";
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}
