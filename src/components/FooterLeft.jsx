import React from 'react';
import './FooterLeft.css';

export default function FooterLeft({ username, description }) {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <div className="text">
          <h3>@{username}</h3>
          <p>{description}</p>
          {/* Music ticker removed */}
        </div>
      </div>
    </div>
  );
}
