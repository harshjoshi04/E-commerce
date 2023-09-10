import AdminNavbar from "@/components/dashbord/AdminNavbar";

export default function RootLayout({ children }) {
  return (
    <>
      <AdminNavbar>{children}</AdminNavbar>
    </>
  );
}
