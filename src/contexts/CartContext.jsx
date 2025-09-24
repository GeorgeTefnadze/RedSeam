import React, { createContext, useState, useContext, useEffect } from "react";
import apiClient from "../api/axiosConfig";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/cart");
      console.log(response);

      setCartItems(response.data || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchCart();
    }
  }, []);

  const addToCart = async (productToAdd) => {
    setLoading(true);
    try {
      const payload = {
        color: productToAdd.selectedColor,
        size: productToAdd.selectedSize,
        quantity: productToAdd.quantity,
      };
      await apiClient.post(`/cart/products/${productToAdd.id}`, payload);
      await fetchCart();
      openCart();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productToRemove) => {
    setLoading(true);
    try {
      const payload = {
        color: productToRemove.color,
        size: productToRemove.size,
      };
      await apiClient.delete(`/cart/products/${productToRemove.id}`, {
        data: payload,
      });
      await fetchCart();
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productToUpdate, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    setLoading(true);
    try {
      const payload = {
        color: productToUpdate.color,
        size: productToUpdate.size,
        quantity: newQuantity,
      };

      await apiClient.patch(`/cart/products/${productToUpdate.id}`, payload);
      await fetchCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.total_price,
    0
  );
  const deliveryFee = 5;
  const total = subtotal + deliveryFee;

  const value = {
    isCartOpen,
    openCart,
    closeCart,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount,
    subtotal,
    deliveryFee,
    total,
    loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
