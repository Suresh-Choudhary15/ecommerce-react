import { useState } from "react";
import TabNavigation from "../components/TabNavigation";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

const Home = () => {
  const [activeTab, setActiveTab] = useState("submit");
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("submit")}
          className={`px-4 py-2 ${
            activeTab === "submit" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Submit Product
        </button>
        <button
          onClick={() => {
            setActiveTab("view");
            setRefreshKey((prev) => prev + 1); // Force re-fetch
          }}
          className={`px-4 py-2 ${
            activeTab === "view" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          My Products
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "submit" ? (
        <ProductForm onProductAdded={() => setRefreshKey((prev) => prev + 1)} />
      ) : (
        <ProductList key={refreshKey} />
      )}
    </div>
  );
};

export default Home;
