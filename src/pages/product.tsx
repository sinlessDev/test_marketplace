import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addItem } from "../redux/cart/slice";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Container from "@/components/landing/container";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const onClickAdd = () => {
    dispatch(addItem(state.product));
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/cart");
  };

  return (
    <Container>
      <Header />
      <main>
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <a
                  href={"/products"}
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  store
                </a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li className="text-sm">
              <p
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {state.product.title}
              </p>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          {state.product.images[0] && (
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={state.product.images[0]}
                alt={state.product.images[0]}
                className="h-full w-full object-cover object-center"
              />
            </div>
          )}
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            {state.product.images[3] && (
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={state.product.images[3]}
                  alt={state.product.images[3]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            )}

            {state.product.images[2] && (
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={state.product.images[2]}
                  alt={state.product.images[2]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            )}
          </div>
          {state.product.images[1] && (
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={state.product.images[1]}
                alt={state.product.images[1]}
                className="h-full w-full object-cover object-center"
              />
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {state.product.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {state.product.price} $
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        state.product.rating > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <div className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  <p>{state.product.rating} out of 5 stars</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button onClick={onClickAdd}>Add to Cart</Button>
              <Button onClick={handleNavigate} variant="secondary">
                Go to Cart
              </Button>
            </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {state.product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}
