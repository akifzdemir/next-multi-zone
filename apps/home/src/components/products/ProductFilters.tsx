"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface ProductFiltersProps {
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

export default function ProductFilters({
  categories,
  onFilterChange,
}: ProductFiltersProps) {
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    category: "all",
    minPrice: 0,
    maxPrice: 1000,
    sortBy: "default",
  });

  const handleFilterChange = (
    key: keyof FilterState,
    value: string | number
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-end justify-between">
        <div className="w-full lg:w-96">
          <label className="block text-sm font-semibold text-[#333333] dark:text-gray-200 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.searchQuery}
              onChange={(e) =>
                handleFilterChange("searchQuery", e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 pl-10 pr-4 py-2.5 text-sm focus:border-[#3B82F6] dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 dark:focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-end">
          <div className="w-40">
            <label className="block text-sm font-semibold text-[#333333] dark:text-gray-200 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 px-4 py-2.5 pr-10 text-sm focus:border-[#3B82F6] dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 dark:focus:ring-blue-500/20 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTEgMSIgc3Ryb2tlPSIjNkI3MjgwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-size-[12px] bg-position-[center_right_1rem] bg-no-repeat"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="w-48">
            <label className="block text-sm font-semibold text-[#333333] dark:text-gray-200 mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 px-4 py-2.5 pr-10 text-sm focus:border-[#3B82F6] dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 dark:focus:ring-blue-500/20 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTEgMSIgc3Ryb2tlPSIjNkI3MjgwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-size-[12px] bg-position-[center_right_1rem] bg-no-repeat"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-[#333333] dark:text-gray-200 mb-2">
              Price Range
            </label>
            <button
              onClick={() => setIsPriceOpen(!isPriceOpen)}
              className="flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-[#333333] dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />${filters.minPrice} - $
              {filters.maxPrice}
            </button>

            {isPriceOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsPriceOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 z-20 w-80 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-[#333333] dark:text-gray-100">
                      Price Range
                    </h3>
                    <button
                      onClick={() => setIsPriceOpen(false)}
                      className="text-[#6B7280] dark:text-gray-400 hover:text-[#333333] dark:hover:text-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-xs text-[#6B7280] dark:text-gray-400 mb-2">
                        <span>Min Price</span>
                        <span className="font-medium text-[#333333] dark:text-gray-100">
                          ${filters.minPrice}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="10"
                        value={filters.minPrice}
                        onChange={(e) =>
                          handleFilterChange("minPrice", Number(e.target.value))
                        }
                        className="w-full accent-[#3B82F6] dark:accent-blue-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-[#6B7280] dark:text-gray-400 mb-2">
                        <span>Max Price</span>
                        <span className="font-medium text-[#333333] dark:text-gray-100">
                          ${filters.maxPrice}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="10"
                        value={filters.maxPrice}
                        onChange={(e) =>
                          handleFilterChange("maxPrice", Number(e.target.value))
                        }
                        className="w-full accent-[#3B82F6] dark:accent-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
