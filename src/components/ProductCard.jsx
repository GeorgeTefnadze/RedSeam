import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/productdetail/${product.id}`} className="product-card">
      <div className="product-card__image-container">
        <img
          src={product.cover_image}
          alt={product.name}
          className="product-card__image"
        />
      </div>
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">${product.price}</p>
    </Link>
  );
};

export default ProductCard;
