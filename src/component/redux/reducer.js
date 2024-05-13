import { addToCart, removeFromCart, updateCartQuantity } from './action';

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case addToCart:
      // Check if item already exists in the cart
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // Update quantity if item already exists
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        // Add new item to the cart
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    case removeFromCart:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case updateCartQuantity:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;