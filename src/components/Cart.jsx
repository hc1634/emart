import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cartItems, removeFromCart }) => {
  console.log("cartItems", cartItems);
  return (
    <>
      <center>
        <h2 className="p-3">Shopping Cart</h2>
      </center>
      <div className="cart">
        <div className="container">
          <div className="content">
            {cartItems.length === 0 ? (
              <div className="content-card">
                <p className="contentDesc">Your cart is empty.</p>
                <Link className="cartlink" to="/">
                  Go back to shop
                </Link>
              </div>
            ) : (
              <div className="cartProduct">
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index}>
                      <p className="cartProductPrice">{item.category}</p>
                      <h4 className="cartProductTitle">{item.title}</h4>
                      <p className="cartProductPrice"> $ {item.price}</p>
                      <button
                        onClick={() => removeFromCart(item)}
                        className="btn btn-danger"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
