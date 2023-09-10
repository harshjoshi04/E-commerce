import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from "./ReduxProvider";
import "./globals.css";
import { Inter } from "next/font/google";

import Links from "./Links";
import NextUi from "./NextUi";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Links />
      <body className={inter.className}>
        <ReduxProvider>
          <ToastContainer />
          <NextUi>{children}</NextUi>
        </ReduxProvider>
      </body>
    </html>
  );
}