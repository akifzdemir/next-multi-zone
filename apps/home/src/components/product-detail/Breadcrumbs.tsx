import Link from "next/link";

interface BreadcrumbsProps {
  category: string;
  productName: string;
}

export default function Breadcrumbs({
  category,
  productName,
}: BreadcrumbsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link
        href="/"
        className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        Home
      </Link>
      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
        /
      </span>
      <Link
        href="/"
        className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal hover:text-blue-600 dark:hover:text-blue-400 transition-colors capitalize"
      >
        {category}
      </Link>
      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
        /
      </span>
      <span className="text-gray-900 dark:text-gray-100 text-sm font-medium leading-normal">
        {productName}
      </span>
    </div>
  );
}
