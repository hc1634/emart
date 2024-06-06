import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
// import Cart from "./components/Cart";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  // const [cartItems, setCartItems] = useState(() => {
  //   const savedCartItems = localStorage.getItem("cartItems");

  //   return savedCartItems ? JSON.parse(savedCartItems) : [];
  // });
  // const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // }, [cartItems]);

  // const addToCart = (product) => {
  //   console.log("Adding to cart:", product);
  //   if (cartItems.some((item) => item.id === product.id)) {
  //     setPopupMessage("Product already added to cart");
  //   } else {
  //     setCartItems((prevItems) => [...prevItems, product]);
  //     setPopupMessage("Product successfully added to cart");
  //   }
  //   setTimeout(() => setPopupMessage(""), 3000);
  // };

  // const removeFromCart = (product) => {
  //   setCartItems((prevItems) =>
  //     prevItems.filter((item) => item.id !== product.id)
  //   );
  // };

  return (
    <div className="App">
      <Router>
        {/* {popupMessage && <div className="popup">{popupMessage}</div>} */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                // cartItems={cartItems}
                // addToCart={addToCart}
              />
            }
          />
          <Route
            path="/category/:category/:productTitle"
            element={
              <ProductDetails
                products={products}
                //  addToCart={addToCart}
              />
            }
          />
          {/* <Route
            path="/cart"
            element={
              <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
            }
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
