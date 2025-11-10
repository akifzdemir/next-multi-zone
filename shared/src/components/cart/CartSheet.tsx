"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "../../store/cartStore";
import { createSlug } from "../../lib/utils";
import Button from "../ui/Button";

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cartHref?: string;
}

export default function CartSheet({
  isOpen,
  onClose,
  cartHref = "/cart",
}: CartSheetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 h-screen w-full max-w-md bg-white dark:bg-[#1a1a1a] shadow-2xl overflow-hidden"
          >
            <div className="flex h-full flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Shopping Cart
                  </h2>
                </div>
                <Button
                  variant="icon"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center px-6">
                  <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                    Add some products to get started
                  </p>
                  <Button variant="primary" size="md" onClick={onClose}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    <div className="space-y-3">
                      {items.map((item, index) => (
                        <motion.div
                          key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0"
                        >
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-gray-50 dark:bg-gray-800">
                            <Image
                              src={item.product.image}
                              alt={item.product.title}
                              fill
                              className="object-contain p-2"
                            />
                          </div>

                          <div className="flex flex-1 flex-col gap-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <a
                                  href={`/product/${
                                    item.product.id
                                  }/${createSlug(item.product.title)}`}
                                  onClick={onClose}
                                  className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                  {item.product.title}
                                </a>
                                {(item.selectedColor || item.selectedSize) && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                    {[item.selectedColor, item.selectedSize]
                                      .filter(Boolean)
                                      .join(" • ")}
                                  </p>
                                )}
                              </div>
                              <Button
                                variant="icon"
                                size="icon"
                                onClick={() =>
                                  removeFromCart(
                                    item.product.id,
                                    item.selectedColor,
                                    item.selectedSize
                                  )
                                }
                                className="h-6 w-6"
                                aria-label={`Remove ${item.product.title} from cart`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity - 1,
                                      item.selectedColor,
                                      item.selectedSize
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                  className="h-6 w-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                                  aria-label="Decrease quantity"
                                >
                                  -
                                </button>
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity + 1,
                                      item.selectedColor,
                                      item.selectedSize
                                    )
                                  }
                                  className="h-6 w-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>

                              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                $
                                {(item.product.price * item.quantity).toFixed(
                                  2
                                )}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Total (
                        {items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                        items)
                      </span>
                      <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <a href={cartHref} onClick={onClose}>
                      <Button variant="primary" size="lg" className="w-full">
                        View Cart
                      </Button>
                    </a>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
