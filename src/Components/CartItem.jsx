import React, { useState, useEffect } from 'react';

const CartItem = ({ item, updateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [warning, setWarning] = useState(false);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 1;
    setQuantity(newQuantity);

    if (newQuantity > item.stock) {
      setWarning(true);
    } else {
      setWarning(false);
    }
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="cart-item">
      <h5>{item.title}</h5>
      <p>Price: ${item.price}</p>
      <p>Stock: {item.stock}</p>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={handleQuantityChange}
      />
      {warning && <p style={{ color: 'red' }}>Quantity exceeds stock!</p>}
    </div>
  );
};

export default CartItem;
