import React from 'react';
import Banner from './mainBo/banner/Banner';
import Appear from './mainBo/bodyc/Appear';
import Content from './mainBo/bodyc/Content';
import FAQ from './mainBo/bodyc/FAQ';
import MainB from './mainBo/bodyc/MainB';
import GemStone from './Gemstone';



function Home()
 {
  return (
    <div>
     <Banner/>
     <MainB  />
     <GemStone/>
     <Appear/>
     <FAQ/>
    </div>
  )
}

export default Home;
