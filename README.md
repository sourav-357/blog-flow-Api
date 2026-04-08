# BlogFlow API

A robust, production-ready REST API for a modern blogging platform built with Node.js and Express. This API provides comprehensive user and post management with advanced features like pagination, filtering, and status-based publishing.

## 🚀 Features

- **User Management**: Complete CRUD operations for user accounts with email uniqueness validation
- **Post Management**: Full blog post lifecycle including drafting, publishing, and content management
- **Advanced Filtering**: Query posts by author, status, with pagination support
- **Error Handling**: Centralized error handling with custom error classes and consistent response formats
- **Input Validation**: Built-in validation for all endpoints
- **CORS Support**: Cross-origin resource sharing enabled for frontend integration
- **Request Logging**: Morgan middleware for comprehensive request logging
- **Health Check**: Built-in health endpoint for monitoring and load balancer checks
- **Environment Configuration**: Flexible configuration via environment variables

## 🛠 Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Middleware**: Morgan (logging), CORS
- **Data Storage**: In-memory storage (easily replaceable with database)
- **Development**: Nodemon for hot reloading

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager


## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Response Format
All responses follow a consistent JSON structure:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

### Endpoints

#### Health Check
- **GET** `/health`
- **Description**: Check server health status
- **Response**: `{"success": true, "message": "Server is healthy"}`

#### User Management

##### Get All Users
- **GET** `/users`
- **Description**: Retrieve all users
- **Response**: Array of user objects

##### Get User by ID
- **GET** `/users/:id`
- **Description**: Retrieve a specific user
- **Parameters**: `id` (integer) - User ID
- **Response**: User object

##### Create User
- **POST** `/users`
- **Description**: Create a new user
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- **Response**: Created user object

##### Update User
- **PUT/PATCH** `/users/:id`
- **Description**: Update an existing user
- **Parameters**: `id` (integer) - User ID
- **Body**: Partial user object
- **Response**: Updated user object

##### Delete User
- **DELETE** `/users/:id`
- **Description**: Delete a user
- **Parameters**: `id` (integer) - User ID
- **Response**: Success message

#### Post Management

##### Get All Posts
- **GET** `/posts`
- **Description**: Retrieve posts with optional filtering and pagination
- **Query Parameters**:
  - `authorId` (integer): Filter by author
  - `status` (string): Filter by status (draft/published)
  - `page` (integer): Page number (default: 1)
  - `limit` (integer): Items per page (default: 10)
- **Response**: Paginated post list with metadata

##### Get Post by ID
- **GET** `/posts/:id`
- **Description**: Retrieve a specific post
- **Parameters**: `id` (integer) - Post ID
- **Response**: Post object

##### Create Post
- **POST** `/posts`
- **Description**: Create a new blog post
- **Body**:
  ```json
  {
    "title": "My Blog Post",
    "content": "Post content here...",
    "authorId": 1,
    "status": "draft"
  }
  ```
- **Response**: Created post object

##### Update Post
- **PUT/PATCH** `/posts/:id`
- **Description**: Update an existing post
- **Parameters**: `id` (integer) - Post ID
- **Body**: Partial post object
- **Response**: Updated post object

##### Publish Post
- **PATCH** `/posts/:id/publish`
- **Description**: Publish a draft post
- **Parameters**: `id` (integer) - Post ID
- **Response**: Published post object

##### Delete Post
- **DELETE** `/posts/:id`
- **Description**: Delete a post
- **Parameters**: `id` (integer) - Post ID
- **Response**: Success message

## 🧪 Testing with Postman

### Postman Collection
Import the following endpoints into Postman for comprehensive testing:

1. **Health Check**
   - Method: GET
   - URL: `http://localhost:3000/api/v1/health`
   - Expected Response: `{"success": true, "message": "Server is healthy"}`

2. **Create User**
   - Method: POST
   - URL: `http://localhost:3000/api/v1/users`
   - Headers: `Content-Type: application/json`
   - Body:
     ```json
     {
       "name": "Test User",
       "email": "test@example.com"
     }
     ```
   - Expected Response: User object with ID and timestamps

3. **Get All Users**
   - Method: GET
   - URL: `http://localhost:3000/api/v1/users`
   - Expected Response: Array of user objects

4. **Get User by ID**
   - Method: GET
   - URL: `http://localhost:3000/api/v1/users/1`
   - Expected Response: Single user object

5. **Create Post**
   - Method: POST
   - URL: `http://localhost:3000/api/v1/posts`
   - Headers: `Content-Type: application/json`
   - Body:
     ```json
     {
       "title": "Sample Post",
       "content": "This is a sample blog post content.",
       "authorId": 1,
       "status": "draft"
     }
     ```
   - Expected Response: Post object with author details

6. **Get All Posts**
   - Method: GET
   - URL: `http://localhost:3000/api/v1/posts`
   - Expected Response: Paginated response with posts array and metadata

7. **Get Posts with Filters**
   - Method: GET
   - URL: `http://localhost:3000/api/v1/posts?authorId=1&status=draft&page=1&limit=5`
   - Expected Response: Filtered and paginated posts

8. **Publish Post**
   - Method: PATCH
   - URL: `http://localhost:3000/api/v1/posts/1/publish`
   - Expected Response: Updated post with status "published"

9. **Update User**
   - Method: PUT
   - URL: `http://localhost:3000/api/v1/users/1`
   - Headers: `Content-Type: application/json`
   - Body:
     ```json
     {
       "name": "Updated Name"
     }
     ```
   - Expected Response: Updated user object

10. **Update Post**
    - Method: PATCH
    - URL: `http://localhost:3000/api/v1/posts/1`
    - Headers: `Content-Type: application/json`
    - Body:
      ```json
      {
        "title": "Updated Title"
      }
      ```
    - Expected Response: Updated post object

11. **Delete Post**
    - Method: DELETE
    - URL: `http://localhost:3000/api/v1/posts/1`
    - Expected Response: Success message

12. **Delete User**
    - Method: DELETE
    - URL: `http://localhost:3000/api/v1/users/1`
    - Expected Response: Success message

### Sample Test Flow
1. Create a user (POST /users)
2. Create a post with that user's ID (POST /posts)
3. Get all posts (GET /posts)
4. Publish the post (PATCH /posts/:id/publish)
5. Update the user (PUT /users/:id)
6. Delete the post (DELETE /posts/:id)
7. Delete the user (DELETE /users/:id)


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request


## 📞 Support

For issues and questions, please open a GitHub issue.
