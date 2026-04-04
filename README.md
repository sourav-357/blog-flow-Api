# BlogFlow API 📝

A REST API for a blogging platform built with Node.js and Express. This is a beginner-friendly project featuring in-memory storage with clean architecture principles (separation of concerns).

## Features

- ✅ User management (create, read, update, delete users)
- ✅ Blog post management with draft/publish workflow
- ✅ Query filtering and pagination for posts
- ✅ Input validation middleware
- ✅ Global error handling
- ✅ Consistent JSON response format
- ✅ Environment configuration with dotenv
- ✅ HTTP request logging with Morgan
- ✅ CORS enabled for frontend integration

## Tech Stack

- **Express** - Web framework
- **dotenv** - Environment variables management
- **Morgan** - HTTP request logger
- **CORS** - Cross-Origin Resource Sharing
- **Nodemon** - Auto-restart during development (dev only)

## Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd blogflow-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:3000`

## Project Structure

```
blogflow-api/
├── src/
│   ├── config/
│   │   └── config.js              # Environment configuration
│   ├── controllers/
│   │   ├── user.controller.js      # User request handlers
│   │   └── post.controller.js      # Post request handlers
│   ├── services/
│   │   ├── user.service.js         # User business logic
│   │   └── post.service.js         # Post business logic
│   ├── routes/
│   │   ├── index.js                # Route aggregator
│   │   ├── user.routes.js          # User endpoints
│   │   └── post.routes.js          # Post endpoints
│   ├── middleware/
│   │   ├── errorHandler.js         # Global error middleware
│   │   ├── notFound.js             # 404 handler
│   │   ├── asyncHandler.js         # Async error wrapper
│   │   └── validateBody.js         # Request validation
│   ├── utils/
│   │   ├── AppError.js             # Custom error class
│   │   └── response.js             # Response helpers
│   ├── data/
│   │   └── store.js                # In-memory storage
│   └── app.js                      # Express app setup
├── .env                            # Environment variables
├── .env.example                    # Example env file
├── .gitignore                      # Git ignore rules
├── package.json                    # Dependencies
└── server.js                       # Entry point
```

## How It Works

### Architecture Pattern: Controller → Service → Store

1. **Routes** receive HTTP requests
2. **Controller** handles request/response, calls service
3. **Service** contains all business logic
4. **Store** manages in-memory data (like a database)
5. **Middleware** handles validation, errors, logging

### Error Handling

All errors are caught by the global error handler and return a consistent JSON format:

```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

### Response Format

All successful responses follow this format:

```json
{
  "success": true,
  "message": "Action completed successfully",
  "data": { }
}
```

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete endpoint reference.

### Quick Start - Example Requests

**Create a user:**
```bash
POST /api/v1/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Create a post (after creating a user with id=1):**
```bash
POST /api/v1/posts
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the post content",
  "authorId": 1
}
```

**Publish a post:**
```bash
PATCH /api/v1/posts/1/publish
```

**Get posts with filters:**
```bash
GET /api/v1/posts?authorId=1&status=published&page=1&limit=10
```

## Available Scripts

```bash
npm run start    # Start production server
npm run dev      # Start dev server with auto-reload
npm run test     # Run tests (placeholder)
```

## Testing

Use **Postman** to test the API. You can import the endpoints using the Postman collection link provided below.

[**Postman Collection Link**](https://your-postman-collection-link-here)

## Data Storage

This project uses **in-memory storage** (arrays in JavaScript). Data is cleared when the server restarts. This is intentional for learning purposes. 

For production:
- Integrate a database like MongoDB, PostgreSQL, or MySQL
- Modify `src/data/store.js` to use database queries instead of array operations

## Error Codes

- `400` - Bad Request (missing or invalid fields)
- `404` - Not Found (user/post doesn't exist, invalid route)
- `409` - Conflict (duplicate email)
- `500` - Server Error (unexpected error)

## Development Notes

- Middleware execution order matters (see `src/app.js`)
- Always wrap async controllers with `asyncHandler()` to catch errors
- Services throw `AppError` with proper status codes
- Validation happens in routes using `validateBody()` middleware

## Next Steps

To extend this project:

1. **Add Comments feature** - Users can comment on posts
2. **Add Authentication** - Use JWT tokens for user login
3. **Add Database** - Replace in-memory store with MongoDB or PostgreSQL
4. **Add Pagination** - Already partially implemented for posts
5. **Add Search** - Full-text search for posts and users
6. **Add Rate Limiting** - Prevent API abuse
7. **Add Unit Tests** - Jest or Mocha for testing

## License

ISC

## Questions?

Review the code structure starting with `server.js` → `src/app.js` → `src/routes/index.js` to understand the flow.
