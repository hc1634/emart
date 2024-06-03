import React, { useState, useEffect, useCallback } from "react";
import Products from "../components/products";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

const Home = ({ products, cartItems, addToCart }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const productsPerPage = 10;

  useEffect(() => {
    setCategories([
      "all",
      ...new Set(products.map((product) => product.category)),
    ]);
  }, [products]);

  // Debounce search input
  const debouncedSearch = useCallback(
    debounce((query) => {
      setDebouncedSearchQuery(query);
    }, 300),
    [setDebouncedSearchQuery]
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearchQuery = product.title
      .toLowerCase()
      .includes(debouncedSearchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <div className="container">
      <center>
        <h2 className="my-3">Emart</h2>
      </center>
      <div className="filters-carts">
        <Filter
          categories={categories}
          onCategoryChange={handleCategoryChange}
        />
        <Sort onSortChange={handleSortChange} />
        <input
          type="text"
          className="search-input m-3"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Link to="/cart" className="cartButton ml-2 p-3">
          Cart({cartItems.length})
        </Link>
      </div>
      <Products
        products={filteredProducts}
        sortOption={sortOption}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        addToCart={addToCart}
      />
      <Pagination
        totalProducts={filteredProducts.length}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default React.memo(Home);
