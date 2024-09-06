import { Outlet } from "react-router-dom";
import Header from "../shared/Header/Header";
import Footer from "../shared/Footer/Footer";


const CartLayout = () => {
  return <div>
    <>
        <Header/>
       <div className="mt-20"> <Outlet/></div>
       <Footer/>
    </>
  </div>;
};

export default CartLayout;
