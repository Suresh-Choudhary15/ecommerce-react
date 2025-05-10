# E-Commerce Platform

A full-stack e-commerce application built with React, Node.js, Express, and PostgreSQL.

## Features

- Product management (CRUD operations)
- Responsive design
- RESTful API
- Database integration with PostgreSQL
- Error handling and validation
- Modern UI with clean design

## Tech Stack

### Frontend

- React
- React Router
- Axios
- CSS/SCSS

### Backend

- Node.js
- Express
- PostgreSQL
- dotenv for environment variables
- express-validator for validation

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database

### Database Setup

1. Create a PostgreSQL database named `ecommerce`
2. Update the database credentials in the `.env` file
3. Run the database schema setup script:
   ```bash
   psql -U postgres -d ecommerce -f schema.sql
   ```

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the `.env.example` template
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the `.env.example` template
4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
├── client/                 # React frontend
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── App.js          # Main app component
│   └── package.json        # Frontend dependencies
│
├── server/                 # Node.js backend
│   ├── controllers/        # Request handlers
│   ├── db/                 # Database setup and queries
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── .env                # Environment variables
│   └── index.js            # Entry point
│
├── schema.sql              # Database schema
└── README.md               # Project documentation
```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Best Practices Implemented

1. **Error Handling**:

   - Client-side error boundaries
   - Proper API error responses
   - Form validation

2. **Security**:

   - Environment variables for sensitive data
   - Input validation
   - Prepared statements for SQL queries

3. **Performance**:

   - Database indexes
   - Error logging
   - Optimized React components

4. **Code Quality**:
   - Consistent code style
   - Component-based architecture
   - Service abstraction for API calls

## Future Enhancements

- User authentication
- Shopping cart functionality
- Order processing
- Admin dashboard
- Payment integration
- Image upload

## License

MIT

## Author

Suresh Choudhary
