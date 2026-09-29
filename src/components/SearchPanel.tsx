import { useState } from "react";

interface SearchPanelProps {
  onSearch: (
    keyword: string,
    department: string
  ) => void;
}

function SearchPanel({
  onSearch,
}: SearchPanelProps) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] =
    useState("");

  const handleSearch = () => {
    onSearch(search, department);
  };

  const handleReset = () => {
    setSearch("");
    setDepartment("");

    onSearch("", "");
  };

  return (
    <div className="card modern-card border-0 shadow-sm">
      <div className="card-header modern-card-header">
        <h5 className="mb-0">
          <i className="bi bi-search me-2"></i>
          Quick Search
        </h5>
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label className="form-label fw-semibold text-dark">
            Employee Name
          </label>

          <input
            type="text"
            className="form-control modern-input"
            placeholder="Enter employee name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold text-dark">
            Department
          </label>

          <select
            className="form-select modern-input"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="d-grid gap-2">
          <button className="btn modern-primary-btn" onClick={handleSearch}>
            <i className="bi bi-search me-2"></i>
            Search Employee
          </button>

          <button className="btn modern-secondary-btn" onClick={handleReset}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchPanel;