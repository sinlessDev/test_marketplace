import Header from "../header";
import EmtyCart from "../../assets/hero.svg";
import { Link } from "react-router-dom";

export default function CartEmpty() {
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <img src={EmtyCart} alt="" />
        <p>Cart is empty 😊</p>
      </div>
      <div className="mt-6 text-center text-sm">
        <Link
          to={"/products"}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Continue Shopping
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </div>
  );
}
