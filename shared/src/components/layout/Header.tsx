"use client";

import { Search, ShoppingBag, User } from "lucide-react";
import Button from "../ui/Button";
import { useCartStore } from "../../store/cartStore";

interface HeaderProps {
  logoHref?: string;
  themeSwitcher?: React.ReactNode;
  cartHref?: string;
}

export default function Header({
  logoHref = "/",
  themeSwitcher,
  cartHref = "/cart",
}: HeaderProps) {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-700/50 bg-[#F9F9F9]/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href={logoHref} className="flex items-center gap-4">
            <svg
              className="h-6 w-6 text-[#333333] dark:text-[#e5e5e5]"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                fill="currentColor"
              ></path>
            </svg>
            <h2 className="text-xl font-bold tracking-tight text-[#333333] dark:text-[#e5e5e5]">
              Next Store
            </h2>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            <a
              className="text-sm font-medium text-[#6B7280] hover:text-[#333333] dark:text-gray-400 dark:hover:text-[#e5e5e5] transition-colors"
              href="#"
            >
              New Arrivals
            </a>
            <a
              className="text-sm font-medium text-[#6B7280] hover:text-[#333333] dark:text-gray-400 dark:hover:text-[#e5e5e5] transition-colors"
              href="#"
            >
              Women
            </a>
            <a
              className="text-sm font-medium text-[#6B7280] hover:text-[#333333] dark:text-gray-400 dark:hover:text-[#e5e5e5] transition-colors"
              href="#"
            >
              Men
            </a>
            <a
              className="text-sm font-medium text-[#6B7280] hover:text-[#333333] dark:text-gray-400 dark:hover:text-[#e5e5e5] transition-colors"
              href="#"
            >
              Accessories
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="icon" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="icon" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <a href={cartHref} className="relative">
              <Button variant="icon" size="icon">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </Button>
            </a>
            {themeSwitcher}
          </div>
        </div>
      </div>
    </header>
  );
}
