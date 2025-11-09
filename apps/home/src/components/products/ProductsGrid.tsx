"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ProductModel } from "@repo/shared";
import ProductCard from "./ProductCard";
import ProductFilters, { FilterState } from "./ProductFilters";

interface ProductsGridProps {
  products: ProductModel[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    category: "all",
    minPrice: 0,
    maxPrice: 1000,
    sortBy: "default",
  });

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return Array.from(cats);
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(query));
    }

    if (filters.category !== "all") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    filtered = filtered.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, filters]);

  return (
    <div>
      <ProductFilters categories={categories} onFilterChange={setFilters} />

      <div className="mb-6">
        <p className="text-sm text-[#6B7280] dark:text-gray-400">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg font-semibold text-[#333333] dark:text-gray-100">
            No products found
          </p>
          <p className="text-sm text-[#6B7280] dark:text-gray-400 mt-2">
            Try adjusting your filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.2 },
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
