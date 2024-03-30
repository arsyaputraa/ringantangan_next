"use client";
import { POSTCreateBlog, POSTEditBlog } from "@/actions/post.actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { createPostSchema, editPostSchema, Post } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EditBlogForm = ({ post }: { post: Post }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof editPostSchema>>({
    reValidateMode: "onBlur",
    resolver: zodResolver(editPostSchema),
    defaultValues: post,
  });

  async function onSubmit(values: z.infer<typeof editPostSchema>) {
    const newValue: Post = { ...post, ...values };
    const res = await POSTEditBlog(newValue);

    if (!!res.error) {
      return toast({
        variant: "destructive",
        description: res.error,
        duration: 2000,
      });
    } else if (!!res.success) {
      return toast({
        variant: "success",
        duration: 2000,

        description: res.success ?? "Success",
        action: (
          <Button
            onClick={() => {
              router.replace("/blog");
            }}
          >
            Great!
          </Button>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col mt-4 pb-10 gap-3 items-center justify-start w-full mx-auto"
      >
        <div className="w-full max-w-lg">
          <h1
            onClick={() => {
              console.log(form.formState.errors);
            }}
            className="text-xl font-bold"
          >
            Edit a Post
          </h1>
          {/* <p>Last Updated : {dayjs()}</p> */}
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full max-w-lg">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className="mt-2"
                  type="text"
                  placeholder="Title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full max-w-lg">
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  id="content"
                  className="mt-2"
                  placeholder="hari ini ringantangan telah..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="w-full max-w-lg">
              <FormLabel>Content</FormLabel>
              <FormControl>
                <div className="w-full flex justify-start items-start max-w-lg gap-1.5">
                  <Checkbox
                    defaultChecked
                    id="isPublic"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label className="" htmlFor="isPublic">
                    Make Post Public
                  </Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
          variant="default"
          className="w-full max-w-lg mt-4"
        >
          SUBMIT
        </Button>
      </form>
    </Form>
  );
};

export default EditBlogForm;
