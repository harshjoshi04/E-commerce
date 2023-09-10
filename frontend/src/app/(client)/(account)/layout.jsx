import MainProfile from "@/components/common/profile/MainProfile";

export default function RootLayout({ children }) {
  return (
    <>
      <MainProfile>{children}</MainProfile>
    </>
  );
}
