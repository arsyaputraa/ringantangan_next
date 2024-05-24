import React from "react";
import Navbar from "../_component/navbar/Navbar";
import Footer from "../_component/footer";
import { Toaster } from "sonner";

const SharedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-150px)]">{children}</main>
      <Toaster
        toastOptions={{
          classNames: {
            error: "bg-red-400",
            success: "bg-green-500 text-primary-foreground",
            warning: "text-yellow-400",
            info: "bg-blue-400",
            loading: "bg-gray-300",
          },
        }}
      />
      <Footer />
    </>
  );
};

export default SharedLayout;
