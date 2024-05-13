"use client";
import { POSTEditBlog } from "@/actions/post.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { editPostSchema, Post } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, Trash, Undo } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Tiptap from "../../_components/tiptap";
import { toast } from "sonner";

const EditBlogForm = ({ post }: { post: Post }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof editPostSchema>>({
    reValidateMode: "onBlur",
    resolver: zodResolver(editPostSchema),
    defaultValues: { ...post, isDeleteImage: false },
  });

  const [imagePreview, setImagePreview] = useState(post.imgUrl);

  async function onSubmit(values: z.infer<typeof editPostSchema>) {
    if (values.isDeleteImage) {
      values = { ...values, blogImage: {} as File };
    }
    const newValue: Post = { ...post, ...values };

    const formData = new FormData();

    for (const [key, value] of Object.entries(newValue)) {
      if (key === "blogImage") {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }

    const editBlogPromise = new Promise(async (resolve, reject) => {
      const res = await POSTEditBlog(formData);
      if (!!res.error) {
        reject(res.error);
      } else resolve(res.success);
    });

    toast.promise(editBlogPromise, {
      loading: (
        <span className="flex gap-2 items-center justify-center">
          <LoaderIcon className="animate-spin w-4 h-4" />{" "}
          <p>Processing your changes..</p>
        </span>
      ),
      success: "Data has been updated.",
      error: (error) => `Something went wrong : ${error}`,
      finally: () => router.replace("/admin/blog"),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col mt-4 pb-10 gap-3 items-center relative justify-start w-full mx-auto"
      >
        <h1 className="text-2xl font-bold">EDIT POST</h1>
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
                        form.setValue("isDeleteImage", true);
                        setImagePreview("");
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                  {!imagePreview && !!post.imgUrl && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-400"
                      type="button"
                      onClick={() => {
                        form.setValue("blogImage", {} as File);
                        form.setValue("isDeleteImage", false);
                        setImagePreview(post.imgUrl);
                      }}
                    >
                      <Undo className="h-4 w-4" />
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
        <div className="w-full flex flex-col max-w-2xl justify-center ">
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
                      id="public post"
                    />
                    <Label htmlFor="public post">Make Post Public</Label>
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
            className="w-full px-2 md:p-0 mt-4"
          >
            SUBMIT
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditBlogForm;
