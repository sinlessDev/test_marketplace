import React from "react";
import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../../redux/cart/slice";
import { Button } from "../ui/button";
import Container from "../landing/container";

type CartItemProps = {
  id: number;
  brand: string;
  category: string;
  count: number;
  description: string;
  discountPercentage: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

export const CartItem: React.FC<CartItemProps> = ({
  id,
  brand,
  category,
  count,
  description,
  discountPercentage,
  images,
  price,
  rating,
  stock,
  thumbnail,
  title,
}) => {
  const dispatch = useDispatch();

  const item = {
    id,
    title,
    price,
    count,
    thumbnail,
    brand,
    category,
    description,
    discountPercentage,
    images,
    rating,
    stock,
  };

  const onClickPlus = () => {
    dispatch(addItem(item));
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(removeItem(id));
    }
  };

  return (
    <Container>
      <li key={id} className="flex py-6">
        <div className="flex-shrink-0">
          <img
            src={thumbnail}
            alt={title}
            className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col sm:ml-6">
          <div>
            <div className="flex justify-between">
              <h4 className="text-sm">
                <p className="font-medium text-gray-700 hover:text-gray-800">
                  {title}
                </p>
              </h4>

              <div>
                <p className="ml-4 text-sm font-medium text-gray-900">
                  ${price}
                </p>
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>

          <div className="mt-4 flex flex-1 items-end justify-between">
            <div className="ml-4">
              <div className="flex gap-4 items-center">
                <Button
                  variant="ghost"
                  disabled={count === 1}
                  onClick={onClickMinus}
                  size="sm"
                >
                  -
                </Button>
                <b>{count}</b>
                <Button variant="ghost" size="sm" onClick={onClickPlus}>
                  +
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-10">
            <Button
              variant="destructive"
              onClick={onClickRemove}
              size="sm"
              type="button"
            >
              <span>Remove</span>
            </Button>
            <p className="ml-4 text-sm font-medium text-gray-900">
              Total: <b>{price * count} $</b>
            </p>
          </div>
        </div>
      </li>
    </Container>
  );
};
