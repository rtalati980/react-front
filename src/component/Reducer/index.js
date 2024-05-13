// Reducer/index.jsx

import { combineReducers } from 'redux';
import cartReducer from '../Slices/CartSlice'; // Import your cart reducer

// Import other reducers here (if applicable)
// import userReducer from './Slices/UserSlice'; // Example for a user slice

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other slices here (if applicable)
  // user: userReducer,
});

export default rootReducer;
