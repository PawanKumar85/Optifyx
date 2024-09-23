import React from "react";
import Card from "./Card";

const data = [
  {
    title: "Shirts",
    products: [
      {
        imageSrc:
          "https://images.unsplash.com/photo-1720514496268-44bb31c03815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU2Mjg0OTd8&ixlib=rb-4.0.3&q=80&w=400",
        name: "Product 1",
        price: "456.00",
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1533399710066-c33de66fe6bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU2Mjg3Mjl8&ixlib=rb-4.0.3&q=80&w=400",
        name: "Product 2",
        price: "433.00",
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1541881856704-3c4b2896c0f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU2Mjg3Mjl8&ixlib=rb-4.0.3&q=80&w=400",
        name: "Product 3",
        price: "564.00",
      },
    ],
  },
  {
    title: "Pants",
    products: [
      {
        imageSrc:
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU2MjkzOTh8&ixlib=rb-4.0.3&q=80&w=400",
        name: "Product 4",
        price: "345.00",
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1602573991155-21f0143bb45c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU2MjkzOTh8&ixlib=rb-4.0.3&q=80&w=400",
        name: "Product 5",
        price: "786.00",
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1624378442362-d3247e8126ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU2Mjk0NDJ8&ixlib=rb-4.0.3&q=80&w=400",
        name: "Product 6",
        price: "546.00",
      },
    ],
  },
  {
    title: "Shoes",
    products: [
      {
        imageSrc:
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU2Mjk1OTl8&ixlib=rb-4.0.3&q=80&w=400",
        name: "Product 7",
        price: "456.00",
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1525753609950-724d3715874d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU2Mjk1OTl8&ixlib=rb-4.0.3&q=80&w=400",
        name: "Product 8",
        price: "564.00",
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1605812860427-4024433a70fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU2Mjk1OTl8&ixlib=rb-4.0.3&q=80&w=400",
        name: "Product 9",
        price: "857.00",
      },
    ],
  },
];

const Body = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-4 mt-8">
      <h1 className="text-3xl font-bold mb-6">Product Categories</h1>

      {data.map((category, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">{category.title}</h2>
          <hr />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {category.products.map((product, index) => (
              <Card
                key={index}
                imageSrc={product.imageSrc}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Body;
