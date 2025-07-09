# 💰 Expense Tracker API

A secure and modular **Node.js + Express** backend for managing user accounts, transactions, and authentication. Built with PostgreSQL for persistent data storage.

---

## 📂 Folder Structure

.
├── controllers/ # Business logic for routes
│ ├── accountController.js
│ ├── authcontroller.js
│ ├── transactionController.js
│ └── userController.js
│
├── db/ # PostgreSQL connection setup
│ ├── index.js
│ └── pool.js
│
├── middleware/ # Middleware (e.g., auth checks)
│ └── authMiddleware.js
│
├── routes/ # Route handlers (API endpoints)
│ ├── accountRoutes.js
│ ├── authRoutes.js
│ ├── transactionRoutes.js
│ ├── userRoutes.js
│ └── index.js
│
├── .env # Environment variable


---

## 🚀 Features

- 🔐 User authentication with middleware protection
- 🧾 Full CRUD for accounts and transactions
- 🗃 PostgreSQL integration
- 📦 Modular controllers and routes
- ⚙️ Environment-based configuration

---

## 🔧 Installation

### 1. Clone the repo

```bash


🛣️ API Routes
Route Group	Description
/api/auth	Register, login, token auth
/api/users	User profile and info
/api/accounts	Manage user accounts
/api/transactions	Create and manage transactions

Route handlers are in routes/, and the logic lives in controllers/



