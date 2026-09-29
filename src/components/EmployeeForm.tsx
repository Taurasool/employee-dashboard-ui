import { useEffect, useState } from "react";
import type { Employee } from "../models/Employee";
import EmployeeService from "../services/EmployeeService";

interface EmployeeFormProps {
  setEmployees: React.Dispatch<
    React.SetStateAction<Employee[]>
  >;
  editingEmployee: Employee | null;
  setEditingEmployee: React.Dispatch<
    React.SetStateAction<Employee | null>
  >;
}

const emptyEmployee: Employee = {
  employeeId: 0,
  name: "",
  department: "",
  email: "",
  phone: "",
  salary: 0,
};

function EmployeeForm({
  setEmployees,
  editingEmployee,
  setEditingEmployee,
}: EmployeeFormProps) {
  const [employee, setEmployee] =
    useState<Employee>(emptyEmployee);

  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee);
    } else {
      setEmployee(emptyEmployee);
    }
  }, [editingEmployee]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]:
        name === "employeeId" ||
        name === "salary"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      if (
        editingEmployee &&
        editingEmployee._id
      ) {
        const response =
          await EmployeeService.updateEmployee(
            editingEmployee._id,
            employee
          );

        setEmployees((prev) =>
          prev.map((emp) =>
            emp._id === editingEmployee._id
              ? response.employee
              : emp
          )
        );

        alert(
          "Employee Updated Successfully"
        );
      } else {
        const response =
          await EmployeeService.addEmployee(
            employee
          );

        setEmployees((prev) => [
          ...prev,
          response.employee,
        ]);

        alert(
          "Employee Added Successfully"
        );
      }

      setEmployee(emptyEmployee);
      setEditingEmployee(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (

        <div className="card shadow-sm border-0">

      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          {editingEmployee
            ? "Update Employee"
            : "Add Employee"}
        </h5>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              Employee ID
            </label>

            <input
              type="number"
              className="form-control"
              name="employeeId"
              value={employee.employeeId || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Employee Name
            </label>

            <input
              type="text"
              className="form-control"
              name="name"
              value={employee.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Department
            </label>

            <select
              className="form-select"
              name="department"
              value={employee.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Phone
            </label>

            <input
              type="text"
              className="form-control"
              name="phone"
              value={employee.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Salary
            </label>

            <input
              type="number"
              className="form-control"
              name="salary"
              value={employee.salary || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid gap-2">

            <button
              type="submit"
              className={`btn ${
                editingEmployee
                  ? "btn-warning"
                  : "btn-success"
              }`}
            >
              {editingEmployee
                ? "Update Employee"
                : "Add Employee"}
            </button>

            {editingEmployee && (

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditingEmployee(null);
                  setEmployee(emptyEmployee);
                }}
              >
                Cancel
              </button>

            )}

          </div>

        </form>

      </div>

    </div>

  );

}

export default EmployeeForm;