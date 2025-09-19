import React, { useState, useEffect } from "react";
import apiClient from "../api/axiosConfig";

import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import FilterDropdown from "../components/FilterDropdown";
import SortDropdown from "../components/SortDropdown";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    apiClient.get("/products").then((response) => {
      console.log(response.data);

      setProducts(response.data.data);
    });
  }, []);

  const handleApplyFilter = (priceRange) => {
    console.log("Applying price filter:", priceRange);
    setIsFilterOpen(false);
  };

  const handleSelectSort = (sortOption) => {
    console.log("Applying sort:", sortOption);
    setIsSortOpen(false);
  };

  return (
    <>
      <Header />
      <div className="products-page">
        <header className="products-page__header">
          <h1 className="products-page__title">Products</h1>
          <div className="products-page__meta-controls">
            <span className="products-page__count">
              Showing 1-10 of 100 results
            </span>
            <div className="products-page__controls">
              <div
                className="control-button"
                onClick={() => {
                  setIsFilterOpen(!isFilterOpen);
                  setIsSortOpen(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.572a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                  />
                </svg>
                Filter
                {isFilterOpen && <FilterDropdown onApply={handleApplyFilter} />}
              </div>
              <div
                className="control-button"
                onClick={() => {
                  setIsSortOpen(!isSortOpen);
                  setIsFilterOpen(false);
                }}
              >
                Sort by
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
                {isSortOpen && <SortDropdown onSelect={handleSelectSort} />}
              </div>
            </div>
          </div>
        </header>
        <main className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </main>
      </div>
    </>
  );
};

export default ProductsPage;
