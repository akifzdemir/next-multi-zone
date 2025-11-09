import Footer from "./Footer";
import Header from "./Header";

interface SharedLayoutProps {
  children: React.ReactNode;
  themeSwitcher?: React.ReactNode;
  logoHref?: string;
  cartHref?: string;
}

export default function SharedLayout({
  children,
  themeSwitcher,
  logoHref = "/",
  cartHref = "/cart",
}: SharedLayoutProps) {
  return (
    <>
      <Header
        logoHref={logoHref}
        themeSwitcher={themeSwitcher}
        cartHref={cartHref}
      />
      {children}
      <Footer />
    </>
  );
}
