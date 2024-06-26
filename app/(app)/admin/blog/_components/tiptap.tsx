"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import { cn } from "@/lib/utils";
import HardBreak from "@tiptap/extension-hard-break";
import BulletList from "@tiptap/extension-bullet-list";
import TextAlign from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extension-placeholder";

const tiptapPlaceholder = "Start writing post content here...";
export const tiptapExtensions = [
  StarterKit.configure({}),
  Placeholder.configure({
    placeholder: tiptapPlaceholder,
    emptyEditorClass:
      "cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-4 before:left-5 before:text-mauve-11 before:opacity-50 before-pointer-events-none",
  }),
  Heading.configure({
    HTMLAttributes: {
      class: "text-xl font-bold",
    },
    levels: [2],
  }),
  Link.extend({ inclusive: false }).configure({
    HTMLAttributes: {
      class: "underline text-blue-500 cursor-pointer",
    },
  }),
  HardBreak.configure({
    keepMarks: false,
  }),
  BulletList.configure({
    itemTypeName: "listItem",
    keepMarks: true,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

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
    extensions: tiptapExtensions,
    content: content,
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[350px] list-decimal w-full rounded-md bg-background px-5 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
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
      <EditorContent
        editor={editor}
        placeholder="Start writing the post content..."
      />
    </div>
  );
};

export default Tiptap;
