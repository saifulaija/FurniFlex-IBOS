import { Outlet } from "react-router-dom";
import Header from "../shared/Header/Header";


const HomeLayout = () => {
  return (
    <div>
      <Header />
      <div className="mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
