"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import { cn } from "@/lib/utils";
const Tiptap = ({
  content,
  onChange,
  className,
}: {
  content: string;
  onChange: (richText: string) => void;
  className?: string;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          levels: [2],
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: "underline text-blue-500 cursor-pointer",
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: cn(
          "flex min-h-[300px] w-full rounded-md border border-input border-opacity-80 bg-background px-5 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-2 focus-visible:border-opacity-100 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col gap-1 justify-stetch min-h-[300px]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
