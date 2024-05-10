import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

const SignInButton = () => {
  const router = useRouter();
  return (
    <Button
      className="bg-gray-500"
      onClick={() => {
        router.push("/signin");
      }}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
