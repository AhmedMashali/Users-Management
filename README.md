# NestJS CRUD APIs with Mongoose
A RESTful APIs built with NestJS, Mongoose, and MongoDB that implements CRUD operations for a User model following best practices including DTO validation, error handling, and environment configuration.

## Features
- NestJS modular architecture
- Mongoose ODM
- Environment configuration with validation using Joi
- DTO validation using class-validator and class-transformer
- Global error handling with proper HTTP status codes
- Pagination support for listing users
- CORS and security headers with helmet

## Tech Stack
- Node.js
- NestJS
- TypeScript
- MongoDB + Mongoose

## Getting Started
### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/nest-crud-app.git
cd Users-Management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the project root:

```dotenv
DATABASE_URI=mongodb://localhost:27017/nest-crud
PORT=3000
CORS_ORIGIN=http://localhost:3000
```

### 4. Run the Application
```bash
npm run start:dev
```
The server will start at: http://localhost:3000

 ## API Endpoints

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| POST   | /users      | Create a user       |
| GET    | /users      | Get paginated users |
| GET    | /users/\:id | Get user by ID      |
| PATCH  | /users/\:id | Update user by ID   |
| DELETE | /users/\:id | Delete user by ID   |

