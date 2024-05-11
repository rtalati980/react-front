import Header from "./header/Header";
import Headerb from "./headerm/Header2";
import Footer from './bottom/Bottom';
import {Outlet} from 'react-router-dom'


const Layout = ({ children }) => {
    return <>
      <Header />
      <Headerb/>
      <main>{children}</main>
      <Footer/>
  </>
  }
  
  export default Layout