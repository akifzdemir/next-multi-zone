"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import type { ProductModel } from "@repo/shared";
import { useCartStore } from "@repo/shared";
import { toast } from "sonner";
import { Button } from "@repo/shared";

interface ProductInfoProps {
  product: ProductModel;
}

const colors = [
  { name: "white", value: "bg-gray-100" },
  { name: "lavender", value: "bg-purple-200" },
  { name: "sageGreen", value: "bg-green-200" },
  { name: "charcoal", value: "bg-gray-700" },
];

const sizes = ["small", "medium", "large"];

export default function ProductInfo({ product }: ProductInfoProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
      },
      quantity,
      colors[selectedColor].name,
      sizes[selectedSize]
    );

    toast.success(`Added ${quantity} item(s) to cart`, {
      description: product.title,
      duration: 3000,
    });
    setQuantity(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl lg:text-4xl font-black tracking-tighter text-gray-900 dark:text-gray-100">
          {product.title}
        </h1>
        <div className="flex items-center gap-3">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating.rate)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating.rate.toFixed(1)}
          </span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating.count} reviews
          </span>
        </div>
      </div>

      <p className="text-base font-normal leading-relaxed text-gray-500 dark:text-gray-400">
        {product.description}
      </p>

      <hr className="border-gray-200 dark:border-gray-700" />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
            Color:{" "}
            <span className="font-medium text-gray-500 dark:text-gray-400">
              {colors[selectedColor].name.charAt(0).toUpperCase() +
                colors[selectedColor].name.slice(1)}
            </span>
          </p>
          <div className="flex items-center gap-3">
            {colors.map((color, index) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(index)}
                aria-label={`Select color ${color.name}`}
                className={`size-8 rounded-full transition-all ${color.value} ${
                  selectedColor === index
                    ? "ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400 ring-offset-white dark:ring-offset-gray-900"
                    : "hover:ring-2 hover:ring-offset-2 hover:ring-blue-500/50 dark:hover:ring-blue-400/50 ring-offset-white dark:ring-offset-gray-900"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
            Size
          </p>
          <div className="grid grid-cols-3 gap-3">
            {sizes.map((size, index) => (
              <Button
                key={size}
                onClick={() => setSelectedSize(index)}
                variant="ghost"
                size="md"
                className={`p-3 ${
                  selectedSize === index
                    ? "bg-blue-50 text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-600 dark:ring-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                    : "bg-gray-100 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-3">
          <Button
            onClick={() => handleQuantityChange(-1)}
            variant="icon"
            size="icon"
            className="bg-transparent dark:bg-transparent hover:bg-transparent hover:text-gray-900 dark:hover:text-gray-100"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-base font-bold w-8 text-center text-gray-900 dark:text-gray-100">
            {quantity}
          </span>
          <Button
            onClick={() => handleQuantityChange(1)}
            variant="icon"
            size="icon"
            className="bg-transparent dark:bg-transparent hover:bg-transparent hover:text-gray-900 dark:hover:text-gray-100"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={handleAddToCart}
          variant="primary"
          size="lg"
          className="flex-1 max-w-[480px] gap-2 min-w-0"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Add to Cart</span>
        </Button>
      </div>
    </div>
  );
}
