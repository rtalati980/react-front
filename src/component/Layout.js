import Header from "./header/Header";
import Headerb from "./headerm/Header2";
import Footer from './bottom/Bottom';
import {Outlet} from 'react-router-dom';
import SearchSection from './headerm/SearchSection';



const Layout = ({ children ,  itemCount}) => {
    return <>
      <Header />
      <Headerb itemCount={itemCount}/>
      <SearchSection/>
      <main>{children}</main>
      <Footer/>
  </>
  }
  
  export default Layout