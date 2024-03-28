import React from "react";
import Navbar from "../_component/Navbar";

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
