# Task Manager

A production-oriented **Task Management API** built with Node.js and TypeScript. The project focuses on building a scalable backend with authentication, role-based authorization, PostgreSQL, Redis, background jobs, structured logging, and cloud image management.

## 🚀 Tech Stack

| Technology       | Purpose                                 |
| ---------------- | --------------------------------------- |
| **Node.js**      | JavaScript runtime                      |
| **Express.js**   | REST API framework                      |
| **TypeScript**   | Type safety                             |
| **PostgreSQL**   | Primary database                        |
| **pg**           | PostgreSQL client                       |
| **Redis**        | Caching / background job infrastructure |
| **BullMQ**       | Background job processing               |
| **JWT**          | Authentication                          |
| **Google OAuth** | Social authentication                   |
| **Zod**          | Request/environment validation          |
| **Pino**         | Structured logging                      |
| **Cloudinary**   | Image storage and management            |
| **Docker**       | Containerization                        |

## ✨ Features

### Authentication & Authorization

- User registration and login using email/password
- Google OAuth authentication
- JWT-based authentication
- Role-based access control
- Two user roles:
  - `USER`
  - `ADMIN`

### Task Management

Authenticated users can:

- Create tasks
- View their tasks
- Update their tasks
- Delete their tasks

### Admin Features

Administrator's privileges:

- View all tasks
- Change task statuses
- Create banners
- Upload banner images
- Manage administrative resources

### Image Management

The application uses **Cloudinary** for image storage.

- Upload images to Cloudinary
- Delete Cloudinary images asynchronously
- Use **BullMQ** background jobs for image deletion

The asynchronous deletion flow prevents external Cloudinary operations from unnecessarily blocking API requests.

## 📡 API Routes

### Health

| Method | Endpoint      | Authentication | Description             |
| ------ | ------------- | -------------- | ----------------------- |
| `GET`  | `/api/health` | ❌             | Check API/server health |

### Authentication

| Method | Endpoint             | Authentication | Description                     |
| ------ | -------------------- | -------------- | ------------------------------- |
| `POST` | `/api/auth/register` | ❌             | Register a new user             |
| `POST` | `/api/auth/login`    | ❌             | Login with email and password   |
| `GET`  | `/api/auth/me`       | ❌             | Get logged in user's profile    |
| `GET`  | `/api/auth/google`   | ❌             | Authenticate using Google OAuth |

### Tasks

| Method   | Endpoint         | Authentication | Description         |
| -------- | ---------------- | -------------- | ------------------- |
| `GET`    | `/api/tasks`     | ✅ User        | Get user's tasks    |
| `GET`    | `/api/tasks/:id` | ✅ User        | Get a specific task |
| `PATCH`  | `/api/tasks/:id` | ✅ User        | Update a task       |
| `DELETE` | `/api/tasks/:id` | ✅ User        | Delete a task       |

### Admin

| Method   | Endpoint                 | Authentication | Description                  |
| -------- | ------------------------ | -------------- | ---------------------------- |
| `GET`    | `/api/admin/tasks`       | 🔐 Admin       | Get tasks for administration |
| `PATCH`  | `/api/admin/tasks/:id`   | 🔐 Admin       | Update task status           |
| `GET`    | `/api/admin/banners`     | 🔐 Admin       | Get all the banners          |
| `POST`   | `/api/admin/banners`     | 🔐 Admin       | Create a new banner          |
| `DELETE` | `/api/admin/banners/:id` | 🔐 Admin       | Delete a banner              |

> **Authentication:** `✅ User` means the endpoint requires an authenticated user. `🔐 Admin` means the endpoint requires an authenticated user with the `ADMIN` role.

## 🏗️ Architecture

The application follows a layered backend architecture that separates responsibilities between different parts of the application.

```text
Client
  │
  ▼
Express Router
  │
  ▼
Middleware
  │
  ├── Authentication
  ├── Authorization
  └── Validation
  │
  ▼
Controller
  │
  ▼
Service
  │
  ▼
Repository / Database
  │
  ▼
PostgreSQL
```

Background operations are handled separately:

```text
Application
    │
    ▼
BullMQ Queue
    │
    ▼
Redis
    │
    ▼
Worker
    │
    ▼
Cloudinary
```

## 📁 Project Structure

```text
src/
├── config/
├── constants/
├── controllers/
├── errors/
├── lib/
├── middlewares/
├── queues/
├── repositories/
├── routes/
├── schemas/
├── scripts/
├── services/
├── types/
├── workers/
├── app.ts
└── server.ts
```

## 🔐 Authentication Flow

### Email/Password

```text
Client
  │
  ▼
Register / Login
  │
  ▼
Validate Request
  │
  ▼
Authenticate User
  │
  ▼
Generate JWT
  │
  ▼
Return Authentication Response
```

### Google OAuth

Users can authenticate through their Google account without passwords.

```text
Client
  │
  ▼
Google OAuth
  │
  ▼
Google Authentication
  │
  ▼
Application
  │
  ▼
User Authentication
```

## 👥 Role-Based Access Control

The API supports two roles:

### USER

Users can manage tasks.

```text
USER
 ├── Create Task
 ├── Read Tasks
 ├── Update Task
 └── Delete Task
```

### ADMIN

Administrator's privileges.

```text
ADMIN
 ├── Change task status
 └── Create banners
       └── Upload banner images
```

Authorization is enforced through middleware before protected resources are accessed.

## 🐳 Running with Docker

Clone the repository

```bash
git clone https://github.com/Siddharth9101/NodeJS
cd capstoneProject
```

Build and start the application:

```bash
npm run docker:up
```

Stop the containers:

```bash
npm run docker:down
```

## 👨‍💻 Author

**Siddharth Saxena**

Built as a backend-focused project to explore production-oriented Node.js and TypeScript development.

Mentor - https://github.com/sangammukherjee
