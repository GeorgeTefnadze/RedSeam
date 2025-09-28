import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../api/axiosConfig";

import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import FilterDropdown from "../components/FilterDropdown";
import SortDropdown from "../components/SortDropdown";
import Pagination from "../components/Pagination";
import { toast, Toaster } from "react-hot-toast";

const ProductsPage = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [activeFilters, setActiveFilters] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const [activeSort, setActiveSort] = useState("");

  const filterRef = useRef(null);
  const sortRef = useRef(null);

  const currentPage = parseInt(pageNumber, 10) || 1;

  useEffect(() => {
    const queryParts = [`page=${currentPage}`];
    if (activeFilters.minPrice) {
      queryParts.push(`filter[price_from]=${activeFilters.minPrice}`);
    }
    if (activeFilters.maxPrice) {
      queryParts.push(`filter[price_to]=${activeFilters.maxPrice}`);
    }
    if (activeSort) {
      queryParts.push(`sort=${activeSort}`);
    }
    const queryString = queryParts.join("&");

    apiClient
      .get(`/products?${queryString}`)
      .then((response) => {
        setProducts(response.data.data);
        setPaginationData(response.data.meta || response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, [currentPage, activeFilters, activeSort]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApplyFilter = (priceRange) => {
    setActiveFilters(priceRange);
    setIsFilterOpen(false);
    toast.success(
      `Filter From ${priceRange.minPrice} - To ${priceRange.maxPrice} Applied`
    );
    if (currentPage !== 1) navigate("/products/page/1");
  };

  const handleSelectSort = (sortOption) => {
    toast.success("Sorting Updated");
    setActiveSort((prevSort) => (prevSort === sortOption ? "" : sortOption));
    setIsSortOpen(false);
    if (currentPage !== 1) navigate("/products/page/1");
  };

  const handlePageChange = (url) => {
    if (!url) return;
    try {
      const page = new URL(url).searchParams.get("page");
      if (page) navigate(`/products/page/${page}`);
    } catch (error) {
      console.error("Invalid URL for pagination:", url);
    }
  };

  const isFilterActive = activeFilters.minPrice || activeFilters.maxPrice;
  const isSortActive = !!activeSort;

  const handleFilterButtonClick = () => {
    if (isFilterActive) {
      setActiveFilters({ minPrice: "", maxPrice: "" });
      toast.success("Filters Cleared");
    } else {
      setIsFilterOpen(!isFilterOpen);
      setIsSortOpen(false);
    }
  };

  return (
    <>
      <Header />
      <div className="products-page">
        <header className="products-page__header">
          <h1 className="products-page__title">Products</h1>
          <div className="products-page__meta-controls">
            <span className="products-page__count">
              {paginationData &&
                `Showing ${paginationData.from}-${paginationData.to} of ${paginationData.total} results`}
            </span>
            <div className="products-page__controls">
              <div
                ref={filterRef}
                className={`control-button ${
                  isFilterActive ? "control-button--active" : ""
                }`}
                onClick={handleFilterButtonClick}
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
                {isFilterOpen && (
                  <FilterDropdown
                    initialValues={activeFilters}
                    onApply={handleApplyFilter}
                  />
                )}
              </div>
              <div
                ref={sortRef}
                className={`control-button ${
                  isSortActive ? "control-button--active" : ""
                }`}
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
                {isSortOpen && (
                  <SortDropdown
                    activeSort={activeSort}
                    onSelect={handleSelectSort}
                  />
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </main>
        <Pagination
          paginationData={paginationData}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ProductsPage;
