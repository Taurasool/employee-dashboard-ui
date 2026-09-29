import { useState } from "react";
import AuthService from "../services/AuthService";
import type { User } from "../models/User";

interface LoginFormProps {
  onLoginSuccess: (user: User, token: string) => void;
}

const defaultForm = {
  username: "",
  email: "",
  password: "",
  role: "employee" as "admin" | "employee",
};

function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState(defaultForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        const response = await AuthService.register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });

        onLoginSuccess(response.user, response.token);
      } else {
        const response = await AuthService.login({
          email: formData.email,
          password: formData.password,
        });

        onLoginSuccess(response.user, response.token);
      }
    } catch (err: unknown) {
      const responseMessage =
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as { response?: { data?: { message?: string } } }).response
          ?.data?.message === "string"
          ? (err as { response?: { data?: { message?: string } } }).response?.data
              ?.message
          : "";

      const backendMessage = responseMessage
        ? responseMessage
        : "Backend is not running or MongoDB is offline. Start the backend and try again.";

      setError(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header text-center">
          <div className="auth-brand-icon">
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <span className="badge auth-badge mb-3">Secure Access</span>
          <h2>{isRegister ? "Create account" : "Login to dashboard"}</h2>
          <p>
            {isRegister
              ? "Register as admin or employee to manage the system."
              : "Use your credentials to access the employee dashboard."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control modern-input"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control modern-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control modern-input"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isRegister && (
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-select modern-input"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          {error && <div className="alert alert-danger auth-error">{error}</div>}

          <button className="btn auth-submit-btn w-100" disabled={loading}>
            {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
          </button>
        </form>

        <div className="auth-toggle mt-3 text-center">
          <button
            type="button"
            className="btn btn-link auth-toggle-link"
            onClick={() => {
              setIsRegister((prev) => !prev);
              setError("");
            }}
          >
            {isRegister
              ? "Already have an account? Login"
              : "New user? Register here"}
          </button>
        </div>

        <div className="demo-credentials mt-4">
          <small>
            Demo admin: admin@company.com / Admin@123
          </small>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
