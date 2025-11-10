import { API_URL } from "@/config/endpoints";
import ProductsGrid from "@/components/products/ProductsGrid";
import { ProductModel } from "@repo/shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products | Next Store",
  description: "Browse our complete collection of quality products",
  openGraph: {
    title: "All Products | Next Store",
    description: "Browse our complete collection of quality products",
    type: "website",
  },
};

const getAllProducts = async (): Promise<ProductModel[]> => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) return [];
  const data = (await res.json()) as ProductModel[];
  return data;
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
          <p className="mt-2 text-sm text-[#6B7280]">Browse all products</p>
        </div>

        <ProductsGrid products={products} />
      </div>
    </div>
  );
}
