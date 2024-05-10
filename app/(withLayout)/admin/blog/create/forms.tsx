"use client";
import { DELETEImage, POSTCreateBlog } from "@/actions/post.actions";
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
import { CreatePostType, createPostSchema } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Tiptap from "../_components/tiptap";
import { Switch } from "@/components/ui/switch";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import post4 from "@/assets/images/ig/post_4.jpg";
import { Trash, XIcon } from "lucide-react";
import { File } from "buffer";

const CreateBlogForm = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState("");
  const form = useForm<CreatePostType>({
    reValidateMode: "onBlur",
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      blogImage: {} as File,
      title: "Change this with your title",
      subtitle: "change this with your subtitle...",
      content: "<p>start writing here...</p>",
      isPublic: true,
    },
  });

  async function onSubmit(values: CreatePostType) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      if (key === "blogImage") {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }

    const res = await POSTCreateBlog(formData);

    if (!!res.error) {
      return toast({
        variant: "destructive",
        description: res.error,
        duration: 2000,
      });
    } else if (!!res.success) {
      router.replace("/blog");

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
        className="flex flex-col mt-4 pb-10 gap-3 items-center relative justify-start w-full mx-auto"
      >
        <h1 className="text-2xl font-bold">CREATE POST</h1>
        <FormField
          control={form.control}
          name="blogImage"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem className="w-full flex flex-col justify-center items-center font-semibold space-around max-w-2xl">
              <FormControl>
                <div className="flex w-full items-center  justify-center">
                  <Input
                    {...fieldProps}
                    id="blogImageInput"
                    className="border-none cursor-pointer  focus-visible:border-none"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                    placeholder="blog image"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      try {
                        if (!!e.target.files) {
                          setImagePreview(
                            URL?.createObjectURL(e.target.files[0])
                          );
                          form.setValue("blogImage", e.target.files[0]);
                        }
                      } catch (error) {
                        form.setValue("blogImage", {} as File);
                        setImagePreview("");
                      }
                    }}
                  />
                  {!!imagePreview && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-400"
                      type="button"
                      onClick={() => {
                        form.setValue("blogImage", {} as File);
                        setImagePreview("");
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </FormControl>
              {!!imagePreview && (
                <>
                  <Image
                    src={imagePreview}
                    alt="blog image"
                    className="object-contain"
                    width={300}
                    height={300}
                  />
                </>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full max-w-2xl">
              <FormControl>
                <Input
                  className="mt-2 border-none focus-visible:border-none text-xl font-bold"
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
          name="subtitle"
          render={({ field }) => (
            <FormItem className="w-full max-w-2xl">
              <FormControl>
                <Input
                  className="mt-2 border-none focus-visible:border-none text-lg"
                  type="text"
                  placeholder="subtitle"
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
            <FormItem className="w-full max-w-2xl">
              <FormControl>
                {/* <Textarea
                  {...field}
                  id="content"
                  className="mt-2"
                  placeholder="hari ini ringantangan telah..."
                /> */}

                <Tiptap content={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-col max-w-2xl justify-center">
          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  {/* <div className="w-full flex justify-start items-start max-w-lg gap-1.5 ">
                    <Checkbox
                      defaultChecked
                      id="isPublic"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label className="" htmlFor="isPublic">
                      Make Post Public
                    </Label>
                  </div> */}

                  <div className="flex items-center px-2 md:p-0 space-x-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="public_post"
                    />
                    <Label htmlFor="public_post">Make Post Public</Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={
              form.formState.isSubmitting ||
              form.formState.isValidating ||
              !form.formState.isValid ||
              !form.formState.isDirty
            }
            type="submit"
            variant="default"
            className="w-full px-2 md:p-0  mt-4"
          >
            SUBMIT
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateBlogForm;
