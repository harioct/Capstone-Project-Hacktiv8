import React from 'react';
import Products from './Products';

const Home = () => {
    return (
        <div className='hero'>
            <div className="card bg-dark text-white border-0">
                <img src="/assets/bg.jpg" className="card-img-top" alt="Background" height="800px"/>
            </div>
            <Products />
        </div>
    )
}

export default Home;