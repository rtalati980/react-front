import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define the initial state
const initialState = {
  cart: [],
};

// Create the context
const CartContext = createContext(initialState);

// Define the reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    // Add more cases for other actions if needed
    default:
      return state;
  }
};

// Load cart data from local storage
const loadCartData = () => {
  try {
    const storedData = localStorage.getItem('cartData');
    return storedData ? JSON.parse(storedData) : initialState;
  } catch (error) {
    console.error('Error loading cart data:', error);
    return initialState;
  }
};

// Save cart data to local storage
const saveCartData = (cartData) => {
  try {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  } catch (error) {
    console.error('Error saving cart data:', error);
  }
};

// Create the provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart data from storage on component mount
  useEffect(() => {
    const loadedData = loadCartData();
    dispatch({ type: 'LOAD_CART_DATA', payload: loadedData });
  }, []);

  // Save cart data to storage whenever it changes
  useEffect(() => {
    saveCartData(state);
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
