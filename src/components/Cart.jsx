import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Cart({ cart, removeFromCart }) {
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <p>Price: र्{product.price.toFixed(2)}</p>
                <p>Quantity: {product.quantity}</p>
                <button onClick={() => removeFromCart(product.id)}>
                  Remove from Cart
                </button>
              </li>
            ))}
          </ul>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
