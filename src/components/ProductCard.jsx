import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img
          src={product.cover_image}
          alt={product.name}
          className="product-card__image"
        />
      </div>
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">${product.price}</p>
    </div>
  );
};

export default ProductCard;
