import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const state = useSelector((state) => state.handleCart);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert("Logout success!");
        navigate("/login");
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
                <div className="container">
                    <NavLink className="navbar-brand fw-bold fs-4" to="/">
                        ShopSphere
                    </NavLink>

                    <ul className="nav mx-auto mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                to="/"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                to="/products"
                            >
                                Product
                            </NavLink>
                        </li>
                    </ul>

                    <div className="button">
                        <NavLink to="/cart" className="btn btn-outline-dark me-2">
                            <i className='fa fa-shopping-cart me-1'></i>
                            Cart ({state.length})
                        </NavLink>

                        {token ? (
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-dark"
                            >
                                <i className='fa fa-sign-out me-1'></i>
                                Logout
                            </button>
                        ) : (
                            <NavLink to="/login" className="btn btn-outline-dark ms-2">
                                <i className='fa fa-sign-in me-1'></i>
                                Login
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;