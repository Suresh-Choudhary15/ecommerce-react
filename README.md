# Mini E-Commerce Platform

A simple e-commerce web application with two main tabs — one for submitting products, and one for viewing submitted products with search functionality.

## Features

- **Product Submission**: Add products with name, price, description, and optional image URL
- **Product Listing**: View all submitted products in a responsive grid layout
- **Search Functionality**: Search products by name or description
- **Responsive Design**: Works well on desktop and mobile devices
- **Error Handling**: Handles API errors gracefully with fallback options
- **Form Validation**: Validates user inputs before submission

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **State Management**: React Context API
- **Styling**: Tailwind CSS

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL database

### Frontend Setup

1. Clone the repository:

   ```
   git clone https://github.com/your-username/mini-ecommerce-platform.git
   cd mini-ecommerce-platform
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add:

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the backend directory and add:

   ```
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/ecommerce
   CORS_ORIGIN=http://localhost:3000
   ```

4. Set up the database:

   ```
   npm run db:setup
   ```

5. Start the backend server:
   ```
   npm start
   ```

## Project Structure

```
/src
  /components          # Reusable UI components
    Navbar.jsx
    ProductCard.jsx
    ProductForm.jsx
    ProductList.jsx
    Search.jsx
    Tabs.jsx
  /context            # State management
    ProductContext.jsx
  /pages              # Page components
    Home.jsx
    Products.jsx
    SubmitProduct.jsx
  /services           # API services
    api.js
  App.jsx             # Root component
  index.js            # Entry point
  index.css           # Global styles
```

## What's Working

- ✅ Two-tab interface for submitting and viewing products
- ✅ Product submission form with validation
- ✅ Product listing with responsive grid layout
- ✅ Search functionality for filtering products
- ✅ API integration with error handling
- ✅ Responsive design for all screen sizes
- ✅ Proper state management using Context API

## Future Improvements

- Authentication system
- Categories and filters
- Product details page
- Shopping cart functionality
- User reviews and ratings
- Admin dashboard

## License

MIT
