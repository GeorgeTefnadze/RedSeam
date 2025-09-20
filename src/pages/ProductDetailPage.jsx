import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../api/axiosConfig";

import Header from "../components/Header";
import Button from "../components/Button";

const colorMap = {
  White: "#FFFFFF",
  Red: "#FF0000",
  Multi: "linear-gradient(90deg, red, yellow, green, blue)",
  Blue: "#0000FF",
  "Navy Blue": "#001F54",
  Grey: "#808080",
  Black: "#000000",
  Purple: "#800080",
  Orange: "#FFA500",
  Beige: "#F5F5DC",
  Pink: "#FFC0CB",
  Green: "#008000",
  Cream: "#FFFDD0",
  Maroon: "#800000",
  Brown: "#A52A2A",
  Peach: "#FFE5B4",
  "Off White": "#F8F8F0",
  Mauve: "#E0B0FF",
  Yellow: "#FFFF00",
  Magenta: "#FF00FF",
  Khaki: "#F0E68C",
  Olive: "#808000",
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    apiClient
      .get(`/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setSelectedImage(response.data.cover_image);
        setSelectedColor(response.data.available_colors[0]);
        setSelectedSize(response.data.available_sizes[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch product:", err);
        setError("Could not load product details.");
        setLoading(false);
      });
  }, [productId]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const colorIndex = product.available_colors.findIndex((c) => c === color);
    if (colorIndex !== -1 && product.images[colorIndex]) {
      setSelectedImage(product.images[colorIndex]);
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    const imageIndex = product.images.findIndex((img) => img === image);
    if (imageIndex !== -1 && product.available_colors[imageIndex]) {
      setSelectedColor(product.available_colors[imageIndex]);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <>
      <Header />
      <div className="product-detail-page">
        <p className="product-detail-page__breadcrumb">
          <Link to="/products">Listing</Link> / <span>Product</span>
        </p>
        <div className="product-detail-page__content">
          <section className="product-gallery">
            <div className="product-gallery__thumbnails">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`product-gallery__thumbnail-img ${
                    selectedImage === img
                      ? "product-gallery__thumbnail-img--active"
                      : ""
                  }`}
                  onClick={() => handleImageSelect(img)}
                />
              ))}
            </div>
            <div className="product-gallery__main-image-wrapper">
              <img
                src={selectedImage}
                alt={product.name}
                className="product-gallery__main-image"
              />
            </div>
          </section>
          <section className="product-info">
            <h1 className="product-info__name">{product.name}</h1>
            <p className="product-info__price">${product.price}</p>

            <div className="product-info__selection-group">
              <span className="product-info__label">
                Color: {selectedColor}
              </span>
              <div className="product-info__colors">
                {product.available_colors.map((color) => (
                  <div
                    key={color}
                    className={`product-info__color-swatch ${
                      selectedColor === color
                        ? "product-info__color-swatch--active"
                        : ""
                    }`}
                    style={{ background: colorMap[color] }}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            </div>

            <div className="product-info__selection-group">
              <span className="product-info__label">Size: {selectedSize}</span>
              <div className="product-info__sizes">
                {product.available_sizes.map((size) => (
                  <button
                    key={size}
                    className={`product-info__size-button ${
                      selectedSize === size
                        ? "product-info__size-button--active"
                        : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-info__selection-group">
              <span className="product-info__label">Quantity</span>
              <div className="product-info__quantity-selector">
                <button
                  className="product-info__quantity-button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="product-info__quantity-display">
                  {quantity}
                </span>
                <button
                  className="product-info__quantity-button"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <Button variant="primary" className="product-info__add-to-cart">
              Add to cart
            </Button>

            <div className="product-info__details">
              <h2 className="product-info__label">Details</h2>
              <p>{product.description}</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
