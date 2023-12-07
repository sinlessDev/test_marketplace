import CartEmpty from "@/components/cart/CartEmpty";
import { CartItem } from "@/components/cart/CartItem";
import Header from "@/components/header";
import Container from "@/components/landing/container";
import { Button } from "@/components/ui/button";
import { selectCart } from "@/redux/cart/selectors";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Example() {
  // const dispatch = useDispatch();

  const { totalPrice, items } = useSelector(selectCart);

  // const onClickClear = () => {
  //   if (window.confirm("Очистить корзину?")) {
  //     dispatch(clearItems());
  //   }
  // };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <Container>
      <Header></Header>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
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
                  {totalPrice} $
                </dd>
              </div>
            </dl>
            <p className="mt-1 text-sm text-gray-500">
              Shipping and taxes will be calculated at checkout.
            </p>
          </div>

          <div className="mt-10 flex justify-end">
            <Button type="submit">Checkout</Button>
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
    </Container>
  );
}
