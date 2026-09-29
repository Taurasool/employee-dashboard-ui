const express = require("express");

const router = express.Router();
const { authorize } = require("../middleware/authMiddleware");

const {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

// ===========================
// GET ALL EMPLOYEES
// ===========================

router.get("/", getEmployees);

// ===========================
// GET EMPLOYEE BY ID
// ===========================

router.get("/:id", getEmployeeById);

// ===========================
// ADD EMPLOYEE
// ===========================

router.post("/", authorize("admin"), addEmployee);

// ===========================
// UPDATE EMPLOYEE
// ===========================

router.put("/:id", authorize("admin"), updateEmployee);

// ===========================
// DELETE EMPLOYEE
// ===========================

router.delete("/:id", authorize("admin"), deleteEmployee);

module.exports = router;