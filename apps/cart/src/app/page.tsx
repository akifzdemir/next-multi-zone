"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@repo/shared";
import { useCartStore } from "@repo/shared";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const subtotal = items?.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const total = subtotal + shipping;

  // const handleUpdateQuantity = (
  //   productId: number,
  //   quantity: number,
  //   selectedColor?: string,
  //   selectedSize?: string
  // ) => {
  //   dispatch(
  //     updateQuantity({ productId, quantity, selectedColor, selectedSize })
  //   );
  // };

  // const handleRemove = (
  //   productId: number,
  //   selectedColor?: string,
  //   selectedSize?: string
  // ) => {
  //   dispatch(removeFromCart({ productId, selectedColor, selectedSize }));
  // };

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium leading-normal transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
            /
          </span>
          <span className="text-gray-900 dark:text-gray-100 text-sm font-medium leading-normal">
            Cart
          </span>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-gray-900 dark:text-gray-100 text-4xl font-black leading-tight tracking-tight">
          Shopping Cart
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
            <Trash2 className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Add some products to get started
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            <ArrowLeft className="h-5 w-5" />
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2 space-y-4">
              {items?.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                  className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="relative size-20 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      className="object-contain p-2"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                    <div className="flex flex-col justify-center">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="text-gray-900 dark:text-gray-100 text-base font-semibold leading-normal line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {item.product.title}
                      </Link>
                      {(item.selectedColor || item.selectedSize) && (
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal line-clamp-2">
                          {item.selectedColor}
                          {item.selectedColor && item.selectedSize && ", "}
                          {item.selectedSize}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 flex justify-start md:justify-center">
                      <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-full px-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="text-lg font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          className="text-sm font-medium leading-normal w-8 p-0 text-center bg-transparent focus:outline-none focus:ring-0 border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          type="number"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="text-lg font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        ${item.product.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() =>
                          removeFromCart(
                            item.product.id,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-28 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Shipping
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      ${shipping.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="my-4 border-t border-dashed border-gray-200 dark:border-gray-700"></div>
                <div className="flex justify-between text-base font-bold text-gray-900 dark:text-gray-100">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="mt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full shadow-sm"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              <ArrowLeft className="h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
