import axios from "axios";
import type { Employee } from "../models/Employee";
import AuthService from "./AuthService";

const API_URL = "http://localhost:5000/api/employees";

const getHeaders = () => {
  const session = AuthService.getSession();

  return session
    ? { Authorization: `Bearer ${session.token}` }
    : {};
};

const getEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(API_URL, {
    headers: getHeaders(),
  });
  return response.data;
};

const getEmployeeById = async (
  id: string
): Promise<Employee> => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: getHeaders(),
  });
  return response.data;
};

const addEmployee = async (employee: Employee) => {
  const response = await axios.post(API_URL, employee, {
    headers: getHeaders(),
  });
  return response.data;
};

const updateEmployee = async (
  id: string,
  employee: Employee
) => {
  const response = await axios.put(`${API_URL}/${id}`, employee, {
    headers: getHeaders(),
  });
  return response.data;
};

const deleteEmployee = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: getHeaders(),
  });
  return response.data;
};

const EmployeeService = {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};

export default EmployeeService;