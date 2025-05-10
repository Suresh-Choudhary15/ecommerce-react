// App.js
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList"; // Assuming you have this component
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>MyShop</h1>
          <p>Welcome to our mini e-commerce platform</p>
        </header>

        <main className="App-main">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/new" element={<ProductForm />} />
              <Route path="/products/edit/:id" element={<ProductForm />} />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </ErrorBoundary>
        </main>

        <footer className="App-footer">
          <p>&copy; {new Date().getFullYear()} MyShop</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
