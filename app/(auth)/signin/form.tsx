"use client";

import {
  createGoogleAuthorizationURL,
  resendEmailVerification,
  signIn,
  signUp,
} from "@/actions/auth.actions";
import MainLogo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { signInSchema } from "@/lib/validationSchema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { RedirectType, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCountdown } from "usehooks-ts";

const SignInForm = () => {
  const router = useRouter();

  const [showResendEmailVerification, setShowResendEmailVerification] =
    useState<boolean>(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [count, { startCountdown, resetCountdown, stopCountdown }] =
    useCountdown({ countStart: 60, intervalMs: 1000 });

  useEffect(() => {
    if (count === 0) {
      stopCountdown();
      resetCountdown();
    }
  }, [count, resetCountdown, stopCountdown]);

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log(values);
    const res = await signIn(values);
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
      if (res.key === "email_not_verified") {
        setShowResendEmailVerification(true);
      }
    } else if (res.success) {
      toast({
        variant: "default",
        description: res.success ?? "Logged in",
      });
      router.replace("/");
    }
  }

  async function handleResendEmailVerification() {
    const res = await resendEmailVerification(form.getValues("email"));

    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
    } else if (res.success) {
      toast({ variant: "default", description: res.success });
      startCountdown();
    }
  }

  const handleGoogleLogin = async () => {
    const res = await createGoogleAuthorizationURL();
    if (res.error) {
      toast({ variant: "destructive", description: res.error });
    } else if (res.success) {
      window.location.href = res.data.toString();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="bg-secondary flex flex-col px-10 w-2/6 py-5 ">
        <Image
          width={250}
          height={250}
          alt="login logo"
          className="self-center"
          src={MainLogo}
        />
        <h1 className="text-2xl text-secondary-forefround font-bold text-center mb-5">
          Sign In
        </h1>
        <Button type="button" className="mb-5" onClick={handleGoogleLogin}>
          Sign in with Google
        </Button>
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={
                form.formState.isSubmitting ||
                form.formState.isValidating ||
                !form.formState.isValid
              }
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form> */}
        {/* {showResendEmailVerification && (
          <Button
            disabled={count > 0 && count < 60}
            variant="link"
            onClick={handleResendEmailVerification}
          >
            Resend email verification {count > 0 && count < 60 && count}
          </Button>
        )} */}
      </Card>
    </div>
  );
};

export default SignInForm;
