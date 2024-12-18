import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <div className="container text-center">
        <h5 className="mb-3">Scope of Spending</h5>
        <div>
          <a
            href="https://www.linkedin.com/in/octavianhari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a
            href="https://github.com/harioct"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2">
            <i className="fab fa-github fa-lg"></i>
          </a>
          <a
            href="https://www.instagram.com/hari.oct_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
