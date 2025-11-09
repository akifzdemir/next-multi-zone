import Footer from "./Footer";
import Header from "./Header";

interface SharedLayoutProps {
  children: React.ReactNode;
  themeSwitcher?: React.ReactNode;
  logoHref?: string;
}

export default function SharedLayout({
  children,
  themeSwitcher,
  logoHref = "/",
}: SharedLayoutProps) {
  return (
    <>
      <Header logoHref={logoHref} themeSwitcher={themeSwitcher} />
      {children}
      <Footer />
    </>
  );
}
