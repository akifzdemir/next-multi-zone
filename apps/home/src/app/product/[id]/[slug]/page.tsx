import { notFound } from "next/navigation";
import { API_URL } from "@/config/endpoints";
import type { ProductModel } from "@repo/shared";
import ImageGallery from "@/components/product-detail/ImageGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import Breadcrumbs from "@/components/product-detail/Breadcrumbs";
import type { Metadata } from "next";
import { cache } from "react";

const getProduct = cache(async (id: string): Promise<ProductModel | null> => {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) return null;
  const data = (await res.json()) as ProductModel;
  return data;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist",
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="w-full max-w-6xl mx-auto px-6 lg:px-8 py-10 lg:py-16">
      <Breadcrumbs category={product.category} productName={product.title} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <ImageGallery image={product.image} title={product.title} />
        <ProductInfo product={product} />
      </div>
    </main>
  );
}
