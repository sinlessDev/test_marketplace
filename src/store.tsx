import React, { useEffect } from "react";

export default function Store() {
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then(console.log);
  });
  return <div>store</div>;
}
