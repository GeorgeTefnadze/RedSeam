import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import apiClient from "../api/axiosConfig";
import { Toaster, toast } from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadingToastId = useRef(null);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const changeLoadingStatus = (status) => {
    setLoading(status);

    if (status) {
      if (!loadingToastId.current) {
        loadingToastId.current = toast.loading("Updating Cart");
      }
    } else {
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
        loadingToastId.current = null;
      }
    }
  };

  const fetchCart = async () => {
    changeLoadingStatus(true);
    try {
      const response = await apiClient.get("/cart");

      setCartItems(response.data || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCartItems([]);
      toast.error("Failed to fetch cart");
    } finally {
      changeLoadingStatus(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchCart();
    }
  }, []);

  const addToCart = async (productToAdd) => {
    changeLoadingStatus(true);
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
      toast.error("Failed to add to cart");
    } finally {
      changeLoadingStatus(false);
    }
  };

  const removeFromCart = async (productToRemove) => {
    changeLoadingStatus(true);
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
      toast.error("Failed to remove from cart");
    } finally {
      changeLoadingStatus(false);
    }
  };

  const updateQuantity = async (productToUpdate, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    changeLoadingStatus(true);
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
      toast.error("Failed to update quantity");
    } finally {
      changeLoadingStatus(false);
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
    fetchCart,
    cartCount,
    subtotal,
    deliveryFee,
    total,
    loading,
  };

  return (
    <CartContext.Provider value={value}>
      <>
        {children}
        <Toaster position="bottom-center" reverseOrder={false} />
      </>
    </CartContext.Provider>
  );
};
