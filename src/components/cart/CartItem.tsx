import React from "react";
import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../../redux/cart/slice";

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
            Total: <b>{price * count} ₽</b>
            <p className="ml-4 text-sm font-medium text-gray-900">${price}</p>
          </div>
          {/* <p className="mt-1 text-sm text-gray-500">{description}</p> */}
        </div>

        <div className="mt-4 flex flex-1 items-end justify-between">
          <div className="ml-4">
            <div className="cart__item-count">
              <button
                disabled={count === 1}
                onClick={onClickMinus}
                className="button button--outline button--circle cart__item-count-minus"
              >
                -
              </button>
              <b>{count}</b>
              <button
                onClick={onClickPlus}
                className="button button--outline button--circle cart__item-count-plus"
              >
                +
              </button>
            </div>
            <button
              onClick={onClickRemove}
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
