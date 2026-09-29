# Employee Management System

A full-stack Employee Management System built using the MERN Stack. The application enables users to perform complete CRUD (Create, Read, Update, Delete) operations on employee records through a responsive dashboard. It integrates React with a RESTful Node.js and Express backend, while MongoDB is used for data storage.

---

## 🚀 Features

- Add Employee
- View Employee Details
- Update Employee Information
- Delete Employee
- Search Employees by Name
- Filter Employees by Department
- Responsive Dashboard UI
- REST API Integration
- MongoDB Database
- Axios API Calls

---

## 🛠️ Tech Stack

### Frontend

- React.js
- TypeScript
- Vite
- Bootstrap 5
- Bootstrap Icons
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS
- Nodemon

---

## 📂 Project Structure

```
employee-dashboard-ui
│
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── src
│   ├── assets
│   ├── components
│   ├── models
│   ├── services
│   ├── App.tsx
│   └── main.tsx
│
├── public
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Taurasool/employee-dashboard-ui.git
```

### Open Project

```bash
cd employee-dashboard-ui
```

---

## Frontend Setup

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

## Backend Setup

Go to backend folder

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Run backend

```bash
npm run dev
```

Backend URL

```
http://localhost:5000
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017/employee_management
```

---

## REST APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/employees | Get all employees |
| GET | /api/employees/:id | Get employee by ID |
| POST | /api/employees | Add employee |
| PUT | /api/employees/:id | Update employee |
| DELETE | /api/employees/:id | Delete employee |

---

## Database

Database Name

```
employee_management
```

Collection

```
employees
```

---

## Future Improvements

- User Authentication
- JWT Authorization
- Role-Based Access
- Pagination
- Export to Excel
- Export to PDF
- Dashboard Analytics

---

## 👨‍💻 Author

**Tauseef Rasool**

**GitHub:**  
https://github.com/Taurasool

**LinkedIn:**  
https://www.linkedin.com/in/tauseef-rasool-497371377/

---

## License

This project is developed for learning and portfolio purposes using the MERN Stack.
