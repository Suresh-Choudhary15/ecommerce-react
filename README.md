# Mini E-Commerce Platform

A simple e-commerce web application with two main tabs: one for submitting products and one for viewing submitted products, featuring a smart search functionality.

## Features

### What's Working

- **Product Submission**: Users can add new products with name, price, description, and image URL
- **Products Display**: View all submitted products in a responsive card layout
- **Basic Search**: Search products by name or keywords
- **Smart Contextual Search**: Enhanced search using PostgreSQL full-text search capabilities
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS

## Tech Stack

### Frontend

- React.js
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests

### Backend

- Node.js with Express
- PostgreSQL database
- RESTful API architecture

### Development

- Git version control
- Environment variables for configuration

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- PostgreSQL

### Database Setup

1. Create a PostgreSQL database:

```sql
CREATE DATABASE mini_ecommerce;
```

2. Run the database schema script:

```bash
psql -d mini_ecommerce -f server/db/schema.sql
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

3. Create a `.env` file based on `.env.example`:

```
PORT=5000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mini_ecommerce
NODE_ENV=development
```

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

3. Create a `.env` file based on `.env.example`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm start
```

5. Open your browser and visit:

```
http://localhost:3000
```

## API Documentation

### Endpoints

#### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

#### Search

- `GET /api/products/search?query=keyword` - Search products by keyword
- `GET /api/products/search?query=keyword&advanced=true` - Advanced contextual search

## Project Structure

```
mini-ecommerce/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components for tabs
│   │   ├── services/       # API service functions
│   │   └── App.js          # Main application component
│   ├── package.json
│   └── tailwind.config.js  # Tailwind CSS configuration
├── server/                 # Backend Node.js application
│   ├── config/             # Configuration files
│   ├── controllers/        # Route handlers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── db/                 # Database setup
│   └── server.js           # Entry point
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.
