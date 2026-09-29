import "./App.css";
import { useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar";
import SearchPanel from "./components/SearchPanel";
import EmployeeTable from "./components/EmployeeTable";
import Pagination from "./components/Pagination";
import EmployeeForm from "./components/EmployeeForm";
import LoginForm from "./components/LoginForm";

import type { Employee } from "./models/Employee";
import type { User } from "./models/User";
import EmployeeService from "./services/EmployeeService";
import AuthService from "./services/AuthService";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] =
    useState<Employee | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const session = AuthService.getSession();

    if (session) {
      setCurrentUser(session.user);
      setIsAuthenticated(true);
    }
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await EmployeeService.getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadEmployees();
    }
  }, [isAuthenticated]);

  const handleSearch = (keyword: string, department: string) => {
    setSearchKeyword(keyword);
    setSelectedDepartment(department);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
    setEmployees([]);
  };

  const isAdmin = currentUser?.role === "admin";

  if (!isAuthenticated || !currentUser) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="dashboard-layout">
      <Navbar
        totalEmployees={employees.length}
        onAddEmployee={() =>
          formRef.current?.scrollIntoView({
            behavior: "smooth",
          })
        }
        onSearch={setSearchKeyword}
        user={currentUser}
        onLogout={handleLogout}
      />

      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-lg-4">
            <div ref={searchRef}>
              <SearchPanel onSearch={handleSearch} />
            </div>

            {isAdmin && (
              <div ref={formRef} className="mt-2">
                <EmployeeForm
                  setEmployees={setEmployees}
                  editingEmployee={editingEmployee}
                  setEditingEmployee={setEditingEmployee}
                />
              </div>
            )}
          </div>

          <div className="col-lg-8">
            <div ref={tableRef}>
              <EmployeeTable
                employees={employees}
                setEmployees={setEmployees}
                setEditingEmployee={setEditingEmployee}
                searchKeyword={searchKeyword}
                selectedDepartment={selectedDepartment}
                isAdmin={isAdmin}
              />
            </div>

            <div className="mt-3">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;