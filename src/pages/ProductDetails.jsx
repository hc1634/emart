import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProductDetails = ({ products, addToCart }) => {
  const { productTitle } = useParams();
  const product = products.find(
    (prod) => prod.title.replace(/ /g, "-") === productTitle.replace(/ /g, "-")
  );
  // const [showPopup, setShowPopup] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  // const handleAddToCart = () => {
  //   addToCart(product);
  //   setShowPopup(true);
  //   setTimeout(() => {
  //     setShowPopup(false);
  //   }, 2000); // Hide popup after 2 seconds
  // };

  return (
    <>
      <Navbar />
      <div className="proDetailPage">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="proInnerImageBox">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="proInnerPageDetails">
                <p className="proCat">Category: {product.category}</p>
                <h2 className="proInnerPageTitle">{product.title}</h2>
                <p className="proInnerPageDesc">{product.description}</p>
                <p className="proInnerPagePrice">Price: ${product.price}</p>
                <p className="proInnerPagePrice">
                  Rating : {product.rating.rate}
                </p>
                {/* <button onClick={handleAddToCart} className="btn btn-primary">
                  Add to Cart
                </button> */}
                {/* {showPopup && (
                  <div className="popup">
                    Product successfully added to cart!
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
