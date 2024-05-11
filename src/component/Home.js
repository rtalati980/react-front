import React, { useState } from 'react';
import Banner from './mainBo/banner/Banner';
import Appear from './mainBo/bodyc/Appear';
import FAQ from './mainBo/bodyc/FAQ';
import MainB from './mainBo/bodyc/MainB';
import GemStone from './Gemstone';
import Rudraksh from './Rudraksh';
import Cart from './cart/Cart';

function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = (pro) => {
    const updatedCart = [...cart, pro];
    setCart(updatedCart);
    
  };

  // Function to handle adding a product to the cart with additional logic
  const handleAddToCart = (pro) => {
    addToCart(pro); // Call the addToCart function to add the product to the cart
   
    // You can add more custom logic here if needed
  };

  return (
    <div>
      <Banner />
      <MainB />
      {/* Pass cart and addToCart function to GemStone component */}
      <GemStone addToCart={handleAddToCart} />
      {/* Pass cart and addToCart function to Rudraksh component */}
      <Rudraksh addToCart={handleAddToCart}  />
      <div style={{display:'none'}}> <Cart  cart={cart}  /></div>
      <Appear />
      <FAQ />
    </div>
  );
}

export default Home;
