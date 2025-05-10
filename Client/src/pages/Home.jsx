import React, { useState } from "react";
import Tabs from "../components/Tabs";
import SubmitProduct from "./SubmitProduct";
import Products from "./Products";
import Navbar from "../components/Navbar";

const Home = () => {
  const [activeTab, setActiveTab] = useState("submit");

  const tabs = [
    { id: "submit", label: "Product Submission" },
    { id: "products", label: "My Products" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Mini E-Commerce Platform
        </h1>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6">
          {activeTab === "submit" && <SubmitProduct />}
          {activeTab === "products" && <Products />}
        </div>
      </div>
    </div>
  );
};

export default Home;
