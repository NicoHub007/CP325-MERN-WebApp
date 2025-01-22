GroceryEase Management - Backend
Description
The backend of the GroceryEase Management app is designed to handle all data-related operations, user authentication, and API endpoints for inventory and order management. It provides a secure, scalable, and efficient RESTful API for the frontend to interact with.

Features
CRUD operations for grocery items.
Order management system.
User authentication with role-based access control (Admin/Employee).
Secure password storage and JWT-based authentication.
Role-based APIs for admin and employee actions.
Technologies
Node.js: Server-side JavaScript runtime.
Express.js: Web framework for building RESTful APIs.
MongoDB: NoSQL database for storing data.
Mongoose: ODM for MongoDB.
JWT (JSON Web Tokens): Authentication and secure user sessions.
Bcrypt: Password hashing for secure storage.
Installation
Clone the repository:
bash
Copy
Edit
git clone <repository-url>
cd backend
Install dependencies:
bash
Copy
Edit
npm install
Set up environment variables: Create a .env file in the root and configure:
makefile
Copy
Edit
PORT=5000
MONGO_URI=<MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
Start the server:
bash
Copy
Edit
npm start
API Endpoints
Grocery Items
GET /api/items/: Fetch all items.
POST /api/items/: Create a new item.
GET /api/items/:id/: Fetch a single item.
PUT /api/items/:id/: Update an item.
DELETE /api/items/:id/: Delete an item.
Orders
GET /api/orders/: Fetch all orders.
POST /api/orders/: Create a new order.
GET /api/orders/:id/: Fetch a single order.
PUT /api/orders/:id/: Update an order.
DELETE /api/orders/:id/: Delete an order.
Users
POST /api/auth/login/: Authenticate user.
POST /api/auth/signup/: Register a new user.
GET /api/users/: Fetch all users (Admin only).
PUT /api/users/:id/: Update user details (Admin only).
DELETE /api/users/:id/: Suspend/delete a user (Admin only).
Data Models
Grocery Items
id: Integer
name: String
category: Enum/String
quantity: Integer
price: Float
description: Text
last_updated: DateTime
Orders
id: Integer
created_by: ForeignKey(User)
items: Array of Grocery Items
total_price: Float
date_created: DateTime
Users
id: Integer
username: String
password: Hashed String
role: Enum (admin/employee)