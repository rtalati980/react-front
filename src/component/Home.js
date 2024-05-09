import React, { useState } from 'react';
import Banner from './mainBo/banner/Banner';
import Appear from './mainBo/bodyc/Appear';
import FAQ from './mainBo/bodyc/FAQ';
import MainB from './mainBo/bodyc/MainB';
import GemStone from './Gemstone';
import Rudraksh from './Rudraksh';

function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
  };

  return (
    <div>
      <Banner />
      <MainB />
      {/* Pass cart and addToCart function to GemStone component */}
      <GemStone addToCart={addToCart} cart={cart} />
      {/* Pass cart and addToCart function to Rudraksh component */}
      <Rudraksh addToCart={addToCart} cart={cart} />
      <Appear />
      <FAQ />
    </div>
  );
}

export default Home;
