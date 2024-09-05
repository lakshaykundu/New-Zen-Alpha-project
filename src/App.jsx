import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Category from "./components/Category";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  const [cart, setCart] = useState([]);
  const [visitCount, setVisitCount] = useState(0);
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        alert(`Your product is added to Cart`);
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        alert(`Your product is added to Cart`);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce(
    (count, product) => count + product.quantity,
    0
  );

  useEffect(() => {
    const storedCount = localStorage.getItem("visitCount");
    let newCount = 1;

    if (storedCount) {
      newCount = parseInt(storedCount) + 1;
    }

    localStorage.setItem("visitCount", newCount);
    setVisitCount(newCount);
  }, []);

  return (
    <Router>
      <div className="App" style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "lightgray",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        >
          Users Visited: {visitCount}
        </div>
        <Link to="/">
          {" "}
          <h1>Clothing Store</h1>
        </Link>

        <div style={{ position: "absolute", top: "10px", right: "20px" }}>
          <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ width: "30px", height: "30px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.341 2.725M5.927 6h14.006l.929 6.632a2 2 0 01-1.994 2.368H7.154a2 2 0 01-1.994-1.765l-.707-5.263m7.547 10a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM9.5 18.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9.5-12.5h1.5"
                />
              </svg>
              {cartItemCount > 0 && (
                <span
                  style={{
                    marginLeft: "8px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "4px 8px",
                    fontSize: "14px",
                  }}
                >
                  {cartItemCount}
                </span>
              )}
            </div>
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/category/:type"
            element={<Category addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={<Cart cart={cart} removeFromCart={removeFromCart} />}
          />
          <Route
            path="/checkout"
            element={<Checkout cart={cart} clearCart={clearCart} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
