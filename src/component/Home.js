import React from 'react';
import Banner from './mainBo/banner/Banner';
import Appear from './mainBo/bodyc/Appear';
import Content from './mainBo/bodyc/Content';
import FAQ from './mainBo/bodyc/FAQ';
import MainB from './mainBo/bodyc/MainB';
import GemStone from './Gemstone';
import { useState } from 'react';



function Home()
 {

  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
  };

  // Function to handle adding a product to the cart with additional logic
  const handleAddToCart = (product) => {
    addToCart(product); // Call the addToCart function to add the product to the cart
    console.log('Product added to cart:', product);
    // You can add more custom logic here if needed
  };
  return (
    <div>
     <Banner/>
     <MainB  />
     <GemStone  addToCart={handleAddToCart} />
     <Appear/>
     <FAQ/>
    </div>
  )
}

export default Home;
