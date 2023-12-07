import { CartItem } from "@/components/cart/CartItem";
import Header from "@/components/header";
import { selectCart } from "@/redux/cart/selectors";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Example() {
  // const dispatch = useDispatch();

  const { totalPrice, items } = useSelector(selectCart);

  // console.log(items);
  // const totalCount = items.reduce(
  //   (sum: number, item: any) => sum + item.count,
  //   0
  // );

  // const onClickClear = () => {
  //   if (window.confirm("Очистить корзину?")) {
  //     dispatch(clearItems());
  //   }
  // };

  if (!totalPrice) {
    return "nothing";
  }

  return (
    <div className="bg-white">
      <Header></Header>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <section aria-labelledby="cart-heading">
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>

          <ul
            role="list"
            className="divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            {items.map((item: any) => (
              <CartItem key={item.id} {...item} />
            ))}
          </ul>
        </section>

        {/* Order summary */}
        <section aria-labelledby="summary-heading" className="mt-10">
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <div>
            <dl className="space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">
                  Subtotal
                </dt>
                <dd className="ml-4 text-base font-medium text-gray-900">
                  {/* Calculate subtotal here */}
                  $96.00
                </dd>
              </div>
            </dl>
            <p className="mt-1 text-sm text-gray-500">
              Shipping and taxes will be calculated at checkout.
            </p>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </button>
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
        </section>
      </div>
    </div>
  );
}
