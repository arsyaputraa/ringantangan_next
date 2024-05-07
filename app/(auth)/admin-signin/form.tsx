"use client";

import { signUp } from "@/actions/auth.actions";
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
import { signUpSchema } from "@/lib/validationSchema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AdminLoginForm = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    signUp(values);
  }
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="bg-secondary flex flex-col px-10 md:w-2/6 py-5 ">
        <Image
          width={250}
          height={250}
          alt="login logo"
          className="self-center"
          src={MainLogo}
        />
        <h1 className="text-2xl text-secondary-forefround font-bold text-center mb-5">
          Sign Up
        </h1>
        <Form {...form}>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="confirm password"
                      type="password"
                      {...field}
                    />
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
        </Form>
      </Card>
    </div>
  );
};

export default AdminLoginForm;
