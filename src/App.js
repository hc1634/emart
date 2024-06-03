import React, { useEffect, useReducer, useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./components/Cart";
import axios from "axios";
import "./App.css";

// Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (state.some((item) => item.id === action.product.id)) {
        return state;
      }
      return [...state, action.product];
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.product.id);
    default:
      return state;
  }
};

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, dispatch] = useReducer(cartReducer, [], () => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // useCallback for addToCart and removeFromCart
  const addToCart = useCallback(
    (product) => {
      if (cartItems.some((item) => item.id === product.id)) {
        setPopupMessage("Product already added to cart");
      } else {
        dispatch({ type: "ADD_TO_CART", product });
        setPopupMessage("Product successfully added to cart");
      }
      setTimeout(() => setPopupMessage(""), 3000);
    },
    [cartItems]
  );

  const removeFromCart = useCallback((product) => {
    dispatch({ type: "REMOVE_FROM_CART", product });
  }, []);

  return (
    <div className="App">
      <Router>
        {popupMessage && <div className="popup">{popupMessage}</div>}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                cartItems={cartItems}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/category/:category/:productTitle"
            element={
              <ProductDetails products={products} addToCart={addToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
