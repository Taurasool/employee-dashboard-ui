import { useState } from "react";
import type { User } from "../models/User";

interface NavbarProps {
  totalEmployees: number;
  onAddEmployee: () => void;
  onSearch: (keyword: string) => void;
  user: User | null;
  onLogout: () => void;
}

function Navbar({
  totalEmployees,
  onAddEmployee,
  onSearch,
  user,
  onLogout,
}: NavbarProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <nav className="navbar dashboard-navbar shadow-sm px-4 py-3">
      <div className="container-fluid">
        <div className="row w-100 align-items-center">
          <div className="col-lg-5 col-md-12 mb-3 mb-lg-0 dashboard-brand-wrap">
            <div className="dashboard-brand-icon">
              <i className="bi bi-people-fill"></i>
            </div>
            <div>
              <h2 className="fw-bold mb-1 dashboard-title">
                Employee Management System
              </h2>
              <span className="badge dashboard-total-badge">
                <i className="bi bi-people-fill me-2"></i>
                Total Employees : {totalEmployees}
              </span>
            </div>
          </div>

          <div className="col-lg-7 col-md-12">
            <div className="d-flex justify-content-end align-items-center gap-3 flex-wrap pe-2 dashboard-actions">
              <div className="search-shell">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  className="form-control border-0 shadow-none"
                  placeholder="Search by Name..."
                  value={search}
                  onChange={handleSearch}
                />
              </div>

              <button
                className="btn dashboard-add-btn px-4"
                onClick={onAddEmployee}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add Employee
              </button>

              {user && (
                <div className="d-flex align-items-center gap-2 ms-2 user-chip-wrap">
                  <span className="badge user-role-badge">
                    {user.username} ({user.role})
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm logout-btn"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;