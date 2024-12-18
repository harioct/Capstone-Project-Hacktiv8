import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import { useParams, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addProduct = (product) => {
    const token = localStorage.getItem("token");

    if (token) {
        dispatch(addCart(product));
        Swal.fire({
          title: "Success!",
          text: "Product added to cart successfully.",
          icon: "success",
          confirmButtonText: "Go to Cart",
          showCancelButton: true,
          cancelButtonText: "Continue Shopping",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/cart");
          }
        })
      } else {
        Swal.fire({
          title: "Login Required",
          text: "You must log in first to add products to the cart!",
          icon: "warning",
          confirmButtonText: "Go to Login",
          showCancelButton: true,
          cancelButtonText: "Close",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login"); // Arahkan ke halaman login
          }
        })
      }
  }

  useEffect(() => {
    const getProductDetail = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await response.json());
      setLoading(false);
    };
    getProductDetail();
  }, [id]);

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
          <Skeleton height={50} width={100} />
        </div>
      </>
    )
  }

  const ShowProductDetail = () => {
    return (
      <>
        <div className="col-md-6 col-12 text-center mb-4 mb-md-0">
          <img src={product.image} alt={product.title} style={{ height: "400px", width:"400px", objectFit: "contain" }} />
        </div>

        <div className="col-md-6 col-12">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead">
            Rating {product.rating?.rate} ⭐
          </p>
          <h3 className="display-6 fw-bold my-4">$ {product.price}</h3>
          <p className="lead">{product.description}</p>
          
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => addProduct(product)}>
            Add to Cart
          </button>
        </div>
      </>
    )
  }

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProductDetail />}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;
