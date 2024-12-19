import React from 'react';
import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';

const Home = () => {
    const [topRatedProducts, setTopRatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopRatedProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();

                const filteredProducts = data.filter(
                    (product) => product.rating?.rate >= 4.5
                )

                setTopRatedProducts(filteredProducts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        }

        fetchTopRatedProducts();
    }, []);

    return (
        <div className='hero'>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/assets/img1.png" className="d-block w-100" alt="Slide 1" style={{ maxHeight: "650px", objectFit: "cover" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="/assets/img2.png" className="d-block w-100" alt="Slide 2" style={{ maxHeight: "650px", objectFit: "cover" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="container my-5">
                    <div className='mb-5'>
                        <h1 className='text-center mb-3'>Top Rated Products</h1>
                        <hr />
                    </div>
                {loading ? (
                    <div className="row justify-content-center">
                        {[...Array(4)].map((_, index) => (
                            <div className="col-md-3 mb-4" key ={index}>
                                <div className="card h-100 text-center p-4">
                                    <Skeleton height={250} />
                                    <div className="card-body">
                                        <Skeleton height={20} width="80%" />
                                        <Skeleton height={20} width="60%" />
                                        <Skeleton height={20} width="50%" />
                                        <Skeleton height={40} width="40%" />
                                    </div>
                                </div>
                            </div>    
                        ))}
                    </div>
                ) : (
                    <div className="row justify-content-center">
                        {topRatedProducts.map((product) => (
                            <div className="col-md-3 mb-4" key={product.id}>
                                <div className="card h-100 text-center p-4">
                                    <img
                                        src={product.image}
                                        className="card-img-top"
                                        alt={product.title}
                                        height="200px"
                                        style={{ objectFit: "contain" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title.substring(0, 20)}...</h5>
                                        <p className="card-text">Rating {product.rating.rate} ⭐</p>
                                        <p className="card-text lead fw-bold">${product.price}</p>
                                        <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">Detail</NavLink>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;
