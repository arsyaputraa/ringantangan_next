import React from "react";
import Navbar from "../_component/navbar/Navbar";
import Footer from "../_component/footer";

const SharedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-150px)]">{children}</main>

      <Footer />
    </>
  );
};

export default SharedLayout;
