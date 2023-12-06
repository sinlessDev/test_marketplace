import { SetStateAction, useCallback, useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import useSortedProducts from "./lib/useSortedProducts";
import { Link } from "react-router-dom";

interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

interface ProductListResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

type FunctionType = (...args: any[]) => void;

const debounce = (func: FunctionType, delay: number): FunctionType => {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const PRODUCTS_API = "https://dummyjson.com/products";
const PRODUCTS_CATEGORIES_API = `${PRODUCTS_API}/categories`;

const fetchApi = async (url: string) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
  }
};

export default function Store() {
  const [products, setProducts] = useState<ProductListResponse | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedProducts: ProductListResponse = useSortedProducts(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    products,
    sortCriteria,
    sortOrder
  );

  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      const url =
        term !== "" ? `${PRODUCTS_API}/search?q=${term}` : PRODUCTS_API;
      const data = await fetchApi(url);
      setProducts(data);
    }, 500),
    []
  );
  useEffect(() => {
    fetchApi(PRODUCTS_CATEGORIES_API).then(setCategories);
    fetchApi(PRODUCTS_API).then(setProducts);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
  }, [debouncedSearch, searchTerm]);

  const handleSortCriteriaChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSortCriteria(e.target.value);
  };

  const handleSortOrderChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSortOrder(e.target.value);
  };

  const fetchProductsByCategory = async (category: string) => {
    const data = await fetchApi(`${PRODUCTS_API}/category/${category}`);
    setProducts(data);
  };

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pb-10 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All products
            </h1>
            <label>
              Sort By:
              <select value={sortCriteria} onChange={handleSortCriteriaChange}>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </label>

            <label>
              Order:
              <select value={sortOrder} onChange={handleSortOrderChange}>
                <option value="asc">By ascending order</option>
                <option value="desc">By descending order</option>
              </select>
            </label>

            <div className="flex justify-between">
              <p className="mt-4 text-base text-gray-500">
                Checkout out the latest release of Basic Tees, new and improved
                with four openings!
              </p>
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                className="w-fit"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Category</h2>
              <div className="hidden lg:block">
                <div className="divide-y divide-gray-200">
                  {categories && categories.length > 0
                    ? categories.map((category) => (
                        <div key={category}>
                          <Button
                            variant="link"
                            onClick={() => fetchProductsByCategory(category)}
                            className="block text-sm font-medium text-gray-900"
                          >
                            {category}
                          </Button>
                        </div>
                      ))
                    : [...Array(14)].map((_, index) => (
                        <div key={index} className="animate-pulse mb-2">
                          <div className="block bg-gray-300 h-8 rounded w-full"></div>
                        </div>
                      ))}
                </div>
              </div>
            </aside>

            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
            >
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                {sortedProducts?.products &&
                sortedProducts.products.length > 0 ? (
                  sortedProducts?.products.map((product) => (
                    <div
                      key={product.id}
                      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                    >
                      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                        />
                      </div>
                      <div className="flex flex-1 flex-col space-y-2 p-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          <Link
                            to={`/products/${product.id}`}
                            state={{ product }}
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500">
                          {product.description}
                        </p>
                        <div className="flex flex-1 flex-col justify-end">
                          <p className="text-base font-medium text-gray-900">
                            {product.price} $
                          </p>
                          <p> {product.rating}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : sortedProducts?.products &&
                  sortedProducts.products.length === 0 ? (
                  <div className="text-center py-10">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Sorry, nothing found
                    </h2>
                    <p className="text-gray-600">
                      We couldn't find any products matching your search.
                    </p>
                  </div>
                ) : (
                  [...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                    >
                      <div className="aspect-h-4 aspect-w-3 bg-gray-300 sm:aspect-none h-96">
                        {/* Skeleton for the image */}
                      </div>
                      <div className="flex flex-1 flex-col space-y-2 p-4">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>{" "}
                        {/* Skeleton for the title */}
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-300 rounded"></div>{" "}
                          {/* Skeleton for the description */}
                          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                        <div className="flex flex-1 flex-col justify-end">
                          <div className="h-4 bg-gray-300 rounded w-1/4"></div>{" "}
                          {/* Skeleton for the price */}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
