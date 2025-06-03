# User API - Eksamen2025 (Forberedelse)

A RESTful API for user management with authentication, built with Node.js, Express, and MongoDB. Features secure password hashing, JWT-based authentication with cookies, role-based authorization, and comprehensive input validation.

## Features

-   **User Registration & Authentication**: Secure user creation with password hashing (Argon2)
-   **JWT Authentication**: Cookie-based JWT tokens with blacklist support
-   **Role-Based Access Control**: User and admin roles with different permissions
-   **Input Validation**: Comprehensive validation using express-validator
-   **Rate Limiting**: Protection against brute force attacks
-   **Security Headers**: Helmet.js for enhanced security
-   **CORS Support**: Configurable cross-origin resource sharing

## API Documentation

Base URL: `http://userapi.harpy.ikt-fag.no/api/users`

All responses follow this format:

```json
{
    "msg": "Success message or null",
    "error": "Error message or null",
    "data": "Response data or null"
}
```

### Authentication

The API uses HTTP-only cookies for JWT authentication. After successful login, the JWT token is automatically included in subsequent requests.

---

### Endpoints

#### **POST** `/api/users`

**Create a new user account**

**Authentication:** None required  
**Rate Limited:** 100 requests per 15 minutes

**Request Body:**

```json
{
    "username": "string (3-50 chars, alphanumeric + underscore)",
    "email": "string (valid email, max 254 chars)",
    "password": "string (min 6 chars, must contain uppercase, lowercase, and number)"
}
```

**Response (201 Created):**

```json
{
    "msg": "User created successfully",
    "error": null,
    "data": {
        "_id": "user_id",
        "username": "username",
        "email": "email@example.com",
        "role": "user"
    }
}
```

**Error Response (400 Bad Request):**

```json
{
    "msg": null,
    "error": "Validation error message",
    "data": null
}
```

---

#### **POST** `/api/users/login`

**Authenticate user and create session**

**Authentication:** None required (blocks if already authenticated)  
**Rate Limited:** 100 requests per 15 minutes

**Request Body:**

```json
{
    "username": "string (optional if email provided)",
    "email": "string (optional if username provided)",
    "password": "string (required)"
}
```

**Response (200 OK):**

```json
{
    "msg": "Login successful",
    "error": null,
    "data": {
        "id": "user_id",
        "username": "username",
        "email": "email@example.com",
        "role": "user"
    }
}
```

**Error Response (401 Unauthorized):**

```json
{
    "msg": null,
    "error": "Invalid password",
    "data": null
}
```

---

#### **POST** `/api/users/logout`

**End user session and blacklist JWT token**

**Authentication:** Required  
**Rate Limited:** 100 requests per 15 minutes

**Request Body:** None

**Response (200 OK):**

```json
{
    "msg": "Logout successful",
    "error": null,
    "data": null
}
```

---

#### **GET** `/api/users/:username`

**Retrieve specific user information**

**Authentication:** None required  
**Rate Limited:** 100 requests per 15 minutes

**Path Parameters:**

-   `username`: The username to retrieve (3-50 characters)

**Response (200 OK):**

```json
{
    "msg": "User found successfully",
    "error": null,
    "data": {
        "_id": "user_id",
        "username": "username",
        "email": "email@example.com",
        "role": "user"
    }
}
```

**Error Response (404 Not Found):**

```json
{
    "msg": null,
    "error": "User not found",
    "data": null
}
```

---

#### **GET** `/api/users`

**Retrieve all usernames**

**Authentication:** None required  
**Rate Limited:** 100 requests per 15 minutes

**Response (200 OK):**

```json
{
    "msg": "Users retrieved successfully",
    "error": null,
    "data": ["username1", "username2", "username3"]
}
```

**Error Response (404 Not Found):**

```json
{
    "msg": "No users found",
    "error": null,
    "data": null
}
```

---

#### **PUT** `/api/users/:username`

**Update user information**

**Authentication:** Required (can only update own profile unless admin)  
**Rate Limited:** 100 requests per 15 minutes

**Path Parameters:**

-   `username`: The username to update

**Request Body (all fields optional):**

```json
{
    "username": "string (3-50 chars, alphanumeric + underscore)",
    "email": "string (valid email, max 254 chars)",
    "password": "string (min 6 chars, must contain uppercase, lowercase, and number)",
    "role": "string (admin only - 'user' or 'admin')"
}
```

**Response (200 OK):**

```json
{
    "msg": "User updated successfully",
    "error": null,
    "data": {
        "_id": "user_id",
        "username": "new_username",
        "email": "new_email@example.com",
        "role": "user"
    }
}
```

**Error Response (403 Forbidden):**

```json
{
    "msg": null,
    "error": "Access denied. You can only update your own profile.",
    "data": null
}
```

---

#### **DELETE** `/api/users/:username`

**Delete user account**

**Authentication:** Required (Admin only)  
**Rate Limited:** 100 requests per 15 minutes

**Path Parameters:**

-   `username`: The username to delete (3-50 characters)

**Response (200 OK):**

```json
{
    "msg": "User deleted successfully",
    "error": null,
    "data": null
}
```

**Error Response (403 Forbidden):**

```json
{
    "msg": null,
    "error": "Admin access required. Insufficient privileges.",
    "data": null
}
```

---

## IP Address Table

| Service               | IP Address     | Description                        |
| --------------------- | -------------- | ---------------------------------- |
| **School Server DNS** | `10.10.1.30`   | School network DNS server          |
| **Harpy Windows DNS** | `10.12.90.10`  | Windows DNS server                 |
| **User API**          | `10.12.90.100` | Main API server (this application) |
| **User API Database** | `10.12.90.101` | MongoDB database server            |

## Installation & Setup

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd eksamen2025
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Environment Configuration**

    - Copy `.env.example` to `.env`
    - Update configuration values:
        ```env
        DB_URL=mongodb://api_user:SecurePass123!@10.12.90.101:27017/userapi?authSource=admin
        PORT=3000
        NODE_ENV=production
        JWT_SECRET=your_generated_jwt_secret_here
        ORIGINS=https://yourdomain.com,https://api.yourdomain.com
        HTTPS_ENABLED=false
        ```

4. **Generate JWT Secret**

    ```bash
    node generate-jwt.js
    ```

5. **Start the server**
    ```bash
    npm start
    ```

## Technology Stack

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB with Mongoose ODM
-   **Authentication:** JSON Web Tokens (JWT)
-   **Password Hashing:** Argon2
-   **Validation:** express-validator
-   **Security:** Helmet.js, CORS, Rate Limiting
-   **Cookie Management:** cookie-parser

## Security Features

-   **Password Hashing:** Argon2 algorithm for secure password storage
-   **JWT Blacklisting:** Logout functionality adds tokens to blacklist
-   **Rate Limiting:** 100 requests per 15-minute window
-   **Input Validation:** Comprehensive validation on all endpoints
-   **Security Headers:** Helmet.js for XSS protection and security headers
-   **CORS Configuration:** Configurable cross-origin resource sharing
-   **HTTP-Only Cookies:** JWT tokens stored in secure, HTTP-only cookies

## Error Codes

-   `200` - Success
-   `201` - Resource created successfully
-   `400` - Bad request (validation errors)
-   `401` - Unauthorized (authentication required)
-   `403` - Forbidden (insufficient privileges)
-   `404` - Resource not found
-   `429` - Too many requests (rate limit exceeded)
-   `500` - Internal server error

## Development

The application uses PM2 for process management in production and includes GitHub Actions for automated deployment to the API VM.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
