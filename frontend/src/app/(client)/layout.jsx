import Footer from "@/components/common/Footer";
import { MainNavbar } from "@/components/common/MainNavbar";

export default function RootLayout({ children }) {
  return (
    <>
      <MainNavbar />
      {children}
      <Footer />
    </>
  );
}
