import React from "react";
import Navbar from "../_component/navbar/Navbar";

const SharedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default SharedLayout;
