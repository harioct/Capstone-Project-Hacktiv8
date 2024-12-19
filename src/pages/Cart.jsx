import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, removeCart, emptyCart, checkoutCart } from '../redux/action';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = (product) => {
    const storedStock = JSON.parse(localStorage.getItem("productStocks")) || {};
    const currentStock = storedStock[product.id] || product.stock;
  
    if (product.qty + 1 > currentStock) {

      Swal.fire({
        title: "Stock Limit Reached",
        text: `You can't add more than ${currentStock} items for ${product.title}.`,
        icon: "warning",
      });
    } else {
      dispatch(addCart(product));
    }
  };
  

  const handleRemove = (product) => {
    dispatch(removeCart(product));
  };

  const handleCheckout = () => {
    if (state.length === 0) {
      Swal.fire({
        title: "Cart Empty",
        text: "Please add some products to your cart before checking out.",
        icon: "warning",
      });
      return;
    }
  
    const storedStock = JSON.parse(localStorage.getItem("productStocks")) || {};
  
    state.forEach((product) => {
      if (storedStock[product.id] !== undefined) {
        storedStock[product.id] -= product.qty;
      } else {
        storedStock[product.id] = product.stock - product.qty;
      }
    });
  
    localStorage.setItem("productStocks", JSON.stringify(storedStock));
  
    dispatch(checkoutCart());
    dispatch(emptyCart());
  
    Swal.fire({
      title: "Checkout Successful!",
      text: "Your order has been placed successfully.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/");
    });
  };
    

  const calculateTotalPrice = () => {
    return state.reduce((total, product) => total + product.price * product.qty, 0);
  };

  const EmptyCart = () => (
    <div className="container py-5 text-center">
      <h3>You haven't selected any items.</h3>
      <Link to="/" className="btn btn-outline-dark mt-3">
        Return to Home
      </Link>
    </div>
  );

  const ShowCart = () => (
    <div className="container py-5">
      {state.map((product) => (
        <div className="row mb-4 border-bottom pb-3" key={product.id}>
          <div className="col-md-2">
            <img
              src={product.image}
              alt={product.title}
              height="100px"
              width="100px"
            />
          </div>
          <div className="col-md-4">
            <h5>{product.title}</h5>
            <p className="text-muted">Price: ${product.price}</p>
            <p className="text-muted">Stock: {product.stock - product.qty}</p>
          </div>
          <div className="col-md-3 d-flex align-items-center">
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => handleRemove(product)}>
              -
            </button>
            <span className="mx-2">{product.qty}</span>
            <button
              className="btn btn-outline-dark ms-2"
              onClick={() => handleAdd(product)}
              >
              +
            </button>
          </div>
          <div className="col-md-3 d-flex align-items-center">
            <h5 className="text-end">
              Total: ${(product.qty * product.price).toFixed(2)}
            </h5>
          </div>
        </div>
      ))}
      <div className="text-end mt-4">
        <h4>
          Grand Total: <span className="fw-bold">${calculateTotalPrice().toFixed(2)}</span>
        </h4>
        <button className="btn btn-dark" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );

  return <div>{state.length === 0 ? <EmptyCart /> : <ShowCart />}</div>;
};

export default Cart;
