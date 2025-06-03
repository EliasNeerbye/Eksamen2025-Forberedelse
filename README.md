# User API - Eksamen2025 (Forberedelse)

## Features

-   **Secure Authentication**: Argon2 password hashing + JWT cookies with blacklist support
-   **Role-Based Access**: User and admin roles with different permissions
-   **Input Validation**: Comprehensive validation using express-validator
-   **Security**: Rate limiting, CORS, Helmet.js security headers
-   **Database**: MongoDB with Mongoose ODM

## Quick Start

1. **Install dependencies**

    ```bash
    npm install
    ```

2. **Configure environment**

    ```bash
    cp .env.example .env
    # Edit .env with your database URL and generate JWT secret:
    node generate-jwt.js
    ```

3. **Start server**

    ```bash
    npm start
    ```

## API Reference

**Base URL:** `/api/users`

All responses use this format:

```json
{
    "msg": "Success message or null",
    "error": "Error message or null",
    "data": "Response data or null"
}
```

### Authentication

The API uses HTTP-only cookies for JWT authentication. Tokens are automatically included after login.

---

### Endpoints

#### **POST** `/api/users`

Create new user account

**Body:**

```json
{
    "username": "string (3-50 chars, alphanumeric + underscore)",
    "email": "string (valid email)",
    "password": "string (min 6 chars, uppercase + lowercase + number)"
}
```

**Response (201):**

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

---

#### **POST** `/api/users/login`

Authenticate user

**Body:**

```json
{
    "username": "string (optional if email provided)",
    "email": "string (optional if username provided)",
    "password": "string"
}
```

**Response (200):** Returns user data and sets JWT cookie

---

#### **POST** `/api/users/logout`

End session (requires authentication)

**Response (200):** Clears cookie and blacklists token

---

#### **GET** `/api/users/:username`

Get user by username

**Response (200):** Returns user data (no password)

---

#### **GET** `/api/users`

Get all usernames

**Response (200):** Returns array of usernames

---

#### **PUT** `/api/users/:username`

Update user (requires authentication)

-   Users can only update their own profile
-   Admins can update any profile and change roles

**Body (all optional):**

```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string (admin only)"
}
```

---

#### **DELETE** `/api/users/:username`

Delete user (admin only)

**Response (200):** Confirmation message

---

## Security Features

-   **Argon2** password hashing
-   **JWT blacklisting** on logout
-   **Rate limiting** (100 requests/15 minutes)
-   **Input validation** on all endpoints
-   **HTTP-only cookies** for token storage
-   **CORS** configuration
-   **Security headers** via Helmet.js

## Environment Variables

```env
DB_URL=mongodb://user:password@host:port/database?authSource=admin
PORT=3000
NODE_ENV=production
JWT_SECRET=your_generated_secret_here
ORIGINS=https://yourdomain.com,https://api.yourdomain.com
HTTPS_ENABLED=false
```

## Architecture

### Network Diagram

![Network Diagram](./README_Images/NetworkDiagram.png)

### Database Schema

![ER Diagram](./README_Images/ErDiagram.png)

### IP Address Table

| Service               | IP Address     | Description                            |
| --------------------- | -------------- | -------------------------------------- |
| **School Server DNS** | `10.10.1.30`   | Skole nettverks DNS server             |
| **Harpy Windows DNS** | `10.12.90.10`  | Windows DNS server                     |
| **User API**          | `10.12.90.100` | Hoved API server (denne applikasjonen) |
| **User API Database** | `10.12.90.101` | MongoDB database server                |

## Technology Stack

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB + Mongoose
-   **Authentication:** JWT + Argon2
-   **Validation:** express-validator
-   **Security:** Helmet.js, CORS, Rate Limiting

## Error Codes

-   `200/201` - Success
-   `400` - Bad request (validation errors)
-   `401` - Unauthorized
-   `403` - Forbidden (insufficient privileges)
-   `404` - Not found
-   `429` - Rate limit exceeded
-   `500` - Server error

## License

GNU General Public License v3.0 - see [LICENSE](LICENSE) file for details.
