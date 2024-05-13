import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

const SignInButton = () => {
  const router = useRouter();
  return (
    <Button
      className="bg-blue-700 hover:bg-blue-600 md:bg-primary"
      onClick={() => {
        router.push("/signin");
      }}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
