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
      {children}
      <Footer />
    </>
  );
};

export default SharedLayout;
