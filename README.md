# E-commerce Backend API

## Description
This is a RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB. The project implements user authentication, product management, shopping cart functionality, and order processing.

## Features
- User authentication (register, login, password recovery)
- Product management (CRUD operations)
- Shopping cart functionality
- Order processing
- Email notifications
- Role-based access control (Admin/User)
- API documentation with Swagger
- JWT token authentication
- Password encryption with bcrypt

## Tech Stack
- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer for email services
- Swagger for API documentation
- Passport for authentication middleware

## Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the root directory with the following variables:
```env
PUERTO=8080
MONGO_URL=your_mongodb_connection_string
CLAVE=your_jwt_secret_key
CLAVEPASS=your_password_reset_secret
MAIL_USER=your_email@example.com
MAIL_PASS=your_email_password
```

4. Run the application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Documentation

The API documentation is available at `/api-docs` when the server is running. It provides detailed information about all available endpoints.

### Main Endpoints

#### Users
- POST `/api/register` - Register new user
- POST `/api/login` - User login
- GET `/api/sessions/current` - Get current user
- GET `/api/recover-password` - Request password recovery
- PUT `/api/reset-password/:token` - Reset password

#### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product by ID
- POST `/api/products` - Create product (Admin only)
- PUT `/api/products/:id` - Update product (Admin only)
- DELETE `/api/products/:id` - Delete product (Admin only)

#### Cart
- POST `/api/carts` - Create new cart
- GET `/api/carts` - Get cart contents
- POST `/api/carts/AddProduct` - Add product to cart
- DELETE `/api/carts/products/:pid` - Remove product from cart
- POST `/api/carts/purchase` - Complete purchase

## Project Structure
```
src/
├── app.js                 # Application entry point
├── config/               # Configuration files
├── controllers/          # Route controllers
├── daos/                # Data Access Objects
├── dtos/                # Data Transfer Objects
├── middlewares/         # Custom middlewares
├── routes/              # Route definitions
├── services/            # Business logic
├── swagger/             # API documentation
└── utils/               # Utility functions
```

## Error Handling
The API uses custom error handling middleware to provide consistent error responses across all endpoints.

## License
This project is licensed under the ISC License.