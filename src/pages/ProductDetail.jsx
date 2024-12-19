import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../redux/action';
import { useParams, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.handleCart);

  const getRemainingStock = (productId, initialStock) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    return cartItem ? initialStock - cartItem.qty : initialStock;
  }

  useEffect(() => {
    const getProductDetail = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();

      const storedStock = JSON.parse(localStorage.getItem("productStocks")) || {};
      const currentStock = storedStock[data.id] !== undefined ? storedStock[data.id] : 20;

      setProduct({ ...data, stock: currentStock });
      setLoading(false);
    }
    getProductDetail();
  }, [id]);

  const addProduct = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "You must log in first to add products to the cart!",
        icon: "warning",
        confirmButtonText: "Go to Login",
        showCancelButton: true,
        cancelButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    const storedStock = JSON.parse(localStorage.getItem("productStocks")) || {};
    const currentStock = storedStock[product.id] || product.stock;

    if (currentStock <= 0) {
      Swal.fire({
        title: "Out of Stock!",
        text: `"${product.title.substring(0, 20)}..." is currently out of stock.`,
        icon: "error",
      });
      return;
    }

    dispatch(addCart({ ...product, qty: 1 }));
    Swal.fire({
      title: "Success!",
      text: `"${product.title.substring(0, 20)}..." has been added to your cart.`,
      icon: "success",
      confirmButtonText: "Go to Cart",
      showCancelButton: true,
      cancelButtonText: "Continue Shopping",
    }).then((result) => {
      if (result.isConfirmed) navigate("/cart");
    });
  }

  const Loading = () => {
    return (
      <>
        <div className="col-md-6 col-12">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6 col-12" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={25} width={70}/>
          <Skeleton height={50} width={150} />
        </div>
      </>
    )
  }

  const ShowProductDetail = () => {
    const remainingStock = getRemainingStock(product.id, product.stock);

    return (
      <>
        <div className="col-md-6 col-12 text-center mb-4 mb-md-0">
          <button className="back-button" onClick={() => navigate(-1)}>
            &lt; Back
          </button>
          <img
            src={product.image}
            alt={product.title}
            style={{ height: '400px', width: '400px', objectFit: 'contain' }}
          />
        </div>

        <div className="col-md-6 col-12">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead">Rating {product.rating?.rate} ⭐</p>
          <h3 className="display-6 fw-bold my-4">$ {product.price}</h3>
          <p className="lead">{product.description}</p>
          <p className="lead">
            Stock: {remainingStock > 0 ? remainingStock : 'Out of Stock'}
          </p>
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => addProduct(product)}
            disabled={remainingStock === 0}
          >
            {remainingStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </>
    )
  }

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">

          {loading ? <Loading /> : product && <ShowProductDetail />}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;
