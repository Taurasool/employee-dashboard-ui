// const Employee = require("../models/Employee");


// // =============================
// // Get All Employees
// // =============================

// const getEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.find().sort({
//       employeeId: 1,
//     });

//     res.status(200).json(employees);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };


// // =============================
// // Get Employee By ID
// // =============================

// const getEmployeeById = async (req, res) => {
//   try {
//     const employee = await Employee.findById(
//       req.params.id
//     );

//     if (!employee) {
//       return res.status(404).json({
//         message: "Employee not found",
//       });
//     }

//     res.status(200).json(employee);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };


// // =============================
// // Add Employee
// // =============================

// const addEmployee = async (req, res) => {
//   try {
//     const employee = new Employee(req.body);

//     await employee.save();

//     res.status(201).json({
//       message: "Employee Added Successfully",
//       employee,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// };


// // =============================
// // Update Employee
// // =============================

// const updateEmployee = async (req, res) => {
//   try {
//     const employee =
//       await Employee.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {
//           new: true,
//         }
//       );

//     if (!employee) {
//       return res.status(404).json({
//         message: "Employee not found",
//       });
//     }

//     res.status(200).json({
//       message: "Employee Updated Successfully",
//       employee,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// };


// // =============================
// // Delete Employee
// // =============================

// const deleteEmployee = async (req, res) => {
//   try {
//     const employee =
//       await Employee.findByIdAndDelete(
//         req.params.id
//       );

//     if (!employee) {
//       return res.status(404).json({
//         message: "Employee not found",
//       });
//     }

//     res.status(200).json({
//       message: "Employee Deleted Successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };


// module.exports = {
//   getEmployees,
//   getEmployeeById,
//   addEmployee,
//   updateEmployee,
//   deleteEmployee,
// };













const Employee = require("../models/Employee");

// =============================
// Get All Employees
// =============================
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({
      employeeId: 1,
    });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: "Server Error: " + error.message,
    });
  }
};

// =============================
// Get Employee By ID
// =============================
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json(employee);
  } catch (error) {
    // Handling invalid Mongo ID format
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid Employee ID format" });
    }
    res.status(500).json({ message: error.message });
  }
};

// =============================
// Add Employee
// =============================
const addEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();

    res.status(201).json({
      message: "Employee Added Successfully",
      employee,
    });
  } catch (error) {
    // Handling duplicate key error (e.g., unique email or employeeId)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate field value entered (e.g. Email or Employee ID already exists)",
      });
    }
    res.status(400).json({
      message: error.message,
    });
  }
};

// =============================
// Update Employee
// =============================
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Updated document return karega
        runValidators: true, // Schema validation check karega
      }
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee Updated Successfully",
      employee,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid Employee ID format" });
    }
    res.status(400).json({
      message: error.message,
    });
  }
};

// =============================
// Delete Employee
// =============================
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee Deleted Successfully",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid Employee ID format" });
    }
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};