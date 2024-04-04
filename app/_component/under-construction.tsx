import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const UnderConstruction = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center mx-auto min-h-[calc(100vh-100px)]">
      <h1 className="text-2xl font-bold">Ooops...</h1>
      <p>Halaman nya lagi dibikin, sabar yaa</p>
      <Button asChild>
        <Link href="/">Home</Link>
      </Button>
    </div>
  );
};

export default UnderConstruction;
