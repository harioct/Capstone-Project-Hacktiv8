import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { NavLink } from 'react-router-dom';

const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(true);
    const componentMounted = useRef(true);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const products = await response.json();

                if (componentMounted.current) {
                    setData(products);
                    setFilter(products);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        }

        getProducts();

        return () => {
            componentMounted.current = false;
        }
    }, []);

    const filterProduct = (category) => {
        if (category === "all") {
            setFilter(data);
        } else {
            const updatedList = data.filter((product) => product.category === category);
            setFilter(updatedList);
        }
    }

    const Loading = () => (
        <div className="row">
            {[...Array(8)].map((_, index) => (
                <div className="col-md-3 mb-4" key={index}>
                    <div className="card h-100 text-center p-4">
                        <Skeleton height={200} />
                        <div className="card-body">
                            <Skeleton height={20} width="80%" />
                            <Skeleton height={20} width="50%" />
                            <Skeleton height={40} width="40%" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

    const ShowProducts = () => (
        <>
            {/* Filter Buttons */}
            <div className="buttons d-flex justify-content-center mb-5 pb-3">
                <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("all")}>
                    All
                </button>
                <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")}>
                    Men's Clothing
                </button>
                <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")}>
                    Women's Clothing
                </button>
                <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")}>
                    Jewelery
                </button>
                <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")}>
                    Electronics
                </button>
            </div>

            {/* Products Grid */}
            <div className="row row justify-content-center">
                {filter.map((product) => (
                    <div className="col-md-3 mb-4" key={product.id}>
                        <div className="card h-100 text-center p-4">
                            <img
                                src={product.image}
                                className="card-img-top"
                                alt={product.title}
                                style={{ height: "200px", objectFit: "contain" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.title.substring(0, 20)}...</h5>
                                <p className="card-text lead fw-bold">${product.price}</p>
                                <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">
                                    Detail
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

    return (
        <div className="container my-5 py-1">
            <h1 className="display-6 fw-bolder text-center mb-4">Products</h1>
            <hr />
            {loading ? <Loading /> : <ShowProducts />}
        </div>
    )
}

export default Products;
