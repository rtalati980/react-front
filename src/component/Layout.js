import Header from "./header/Header";
import Headerb from "./headerm/Header2";
import Footer from './bottom/Bottom';
import {Outlet} from 'react-router-dom'


const layout=()=> {
    return <>
      <Header />
      <Headerb/>
      <Outlet/>
      <Footer/>
  </>
  }
  
  export default layout