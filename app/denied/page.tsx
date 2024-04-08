import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const DeniedPage = () => {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center mx-auto min-h-[calc(100vh-100px)]">
      <h1 className="text-2xl font-bold">Kamu nggak punya akses kesini</h1>
      <p>Yuk coba liat-liat halaman lain</p>
      <Button asChild>
        <Link href="/">Home</Link>
      </Button>
    </div>
  );
};

export default DeniedPage;
