import { useMemo } from "react";

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

const useSortedProducts = (
  products: ProductListResponse,
  sortCriteria: keyof Product,
  sortOrder: "asc" | "desc"
): ProductListResponse => {
  return useMemo(() => {
    if (!products || !products.products) return products;

    const sortedProducts = [...products.products].sort((a, b) => {
      const valueA = a[sortCriteria];
      const valueB = b[sortCriteria];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      } else if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return 0;
    });

    return { ...products, products: sortedProducts };
  }, [products, sortCriteria, sortOrder]);
};

export default useSortedProducts;
