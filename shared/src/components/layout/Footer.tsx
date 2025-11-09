export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="h-8 w-8 text-[#333333] dark:text-[#e5e5e5]"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                  fill="currentColor"
                ></path>
              </svg>
              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Next Store
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
              Your one-stop shop for quality products. We offer a wide range of
              items to meet all your needs.
            </p>
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} Next Store. All rights reserved.
            </p>
          </div>

          {/* Website Links */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
              Help
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors"
                  href="#"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors"
                  href="#"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors"
                  href="#"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors"
                  href="#"
                >
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors"
                  href="#"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors"
                  href="#"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors"
                  href="#"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors"
                  href="#"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
