import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const state = useSelector((state) => state.handleCart);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const totalQuantity = state.reduce((total, item) => total + item.qty, 0);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-0 shadow-sm fixed-top">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                    <img src="/assets/logo.png" alt="Bootstrap" width="76" height="70" class="d-inline-block align-text-top" />
                    </NavLink>

                    <ul className="nav mx-auto mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                to="/products">
                                Products
                            </NavLink>
                        </li>
                    </ul>

                    <div className="button">
                        <NavLink to="/cart" className="btn btn-outline-dark me-2">
                            <i className='fa fa-shopping-cart me-1'></i>
                            Cart ({totalQuantity})
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
    )
}

export default Navbar;
