import { Outlet } from "react-router-dom";
import Header from "../shared/Header/Header";


const CartLayout = () => {
  return <div>
    <>
        <Header/>
       <div className="mt-20"> <Outlet/></div>
    </>
  </div>;
};

export default CartLayout;
