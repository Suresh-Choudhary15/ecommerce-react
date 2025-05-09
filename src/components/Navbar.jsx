import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold text-blue-600">MyShop</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            Welcome to our mini e-commerce platform
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
