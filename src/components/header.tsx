import { Link } from "react-router-dom";
import { useAuth } from "../lib/authContext";
import { Button } from "./ui/button";

const Header = () => {
  const { user, logoutUser } = useAuth();

  return (
    // <div className="header">
    //   <div>
    //     <Link id="header-logo" to="/">
    //       LOGO
    //     </Link>
    //   </div>

    // // </div>

    <nav className="relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
      {/* menu  */}
      <div className="text-center flex items-center">
        <ul className="items-center justify-end flex-1 list-none lg:pt-0 lg:flex">
          <Link to="/products">
            <Button variant="ghost">Products</Button>
          </Link>
        </ul>
      </div>

      <div className=" mr-3 space-x-4 flex items-center justify-center">
        {user ? (
          <>
            <Link to="/profile" className="header--link">
              <Button variant="outline">Profile</Button>
            </Link>
            <Button onClick={logoutUser} className="btn">
              Logout
            </Button>
          </>
        ) : (
          <Link to="/signin">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
