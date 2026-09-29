import type { Employee } from "../models/Employee";
import EmployeeService from "../services/EmployeeService";

interface EmployeeTableProps {
  employees: Employee[];
  setEmployees: React.Dispatch<
    React.SetStateAction<Employee[]>
  >;
  setEditingEmployee: React.Dispatch<
    React.SetStateAction<Employee | null>
  >;
  searchKeyword: string;
  selectedDepartment: string;
  isAdmin: boolean;
}

function EmployeeTable({
  employees,
  setEmployees,
  setEditingEmployee,
  searchKeyword,
  selectedDepartment,
  isAdmin,
}: EmployeeTableProps) {

  const filteredEmployees = employees.filter((emp) => {

    const nameMatch = emp.name
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());

    const departmentMatch =
      selectedDepartment === "" ||
      emp.department === selectedDepartment;

    return nameMatch && departmentMatch;

  });

  // Delete Employee

  const handleDelete = async (employee: Employee) => {

    const confirmDelete = window.confirm(

`Delete Employee?

Employee ID : ${employee.employeeId}

Name : ${employee.name}

Department : ${employee.department}

Are you sure?`

    );

    if (!confirmDelete) return;

    try {

      if (employee._id) {
        await EmployeeService.deleteEmployee(employee._id);
      }

      setEmployees((prev) =>
        prev.filter(
          (emp) => emp._id !== employee._id
        )
      );

      alert("Employee Deleted Successfully");

    } catch (error) {

      console.error(error);
      alert("Unable to delete employee.");

    }

  };

 // View Employee
 

  const handleView = (employee: Employee) => {

    alert(

`EMPLOYEE DETAILS

--------------------------------

Employee ID

${employee.employeeId}

--------------------------------

Employee Name

${employee.name}

--------------------------------

Department

${employee.department}

--------------------------------

Email

${employee.email}

--------------------------------

Phone

${employee.phone}

--------------------------------

Salary

₹${employee.salary.toLocaleString()}`

    );

  };


  // Edit Employee
 

  const handleEdit = (employee: Employee) => {

    setEditingEmployee(employee);

  };

  return (

    <div className="card border-0 shadow-sm">

      <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">

        <h5 className="mb-0">
          <i className="bi bi-table me-2"></i>
          Employee Directory
        </h5>

        <span className="badge bg-light text-success fs-6">
          Total Employees : {filteredEmployees.length}
        </span>

      </div>

      <div className="table-responsive">

        <table className="table table-hover table-bordered align-middle mb-0">

          <thead className="table-dark">

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Salary</th>
              <th style={{ width: "180px" }}>
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

                        {filteredEmployees.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-5"
                >

                  <h5 className="text-danger">
                    No Employee Found
                  </h5>

                  <small className="text-muted">
                    Try another employee name or department.
                  </small>

                </td>

              </tr>

            ) : (

              filteredEmployees.map((emp) => (

                <tr key={emp._id ?? emp.employeeId}>

                  <td>{emp.employeeId}</td>

                  <td className="fw-semibold">
                    {emp.name}
                  </td>

                  <td>
                    <span className="badge bg-secondary">
                      {emp.department}
                    </span>
                  </td>

                  <td>{emp.email}</td>

                  <td>{emp.phone}</td>

                  <td className="fw-bold text-success">
                    ₹{emp.salary.toLocaleString()}
                  </td>

                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      {isAdmin && (
                        <>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            title="Edit Employee"
                            onClick={() => handleEdit(emp)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            title="Delete Employee"
                            onClick={() => handleDelete(emp)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </>
                      )}

                      <button
                        type="button"
                        className="btn btn-sm btn-info text-white"
                        title="View Employee"
                        onClick={() => handleView(emp)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                    </div>
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default EmployeeTable;