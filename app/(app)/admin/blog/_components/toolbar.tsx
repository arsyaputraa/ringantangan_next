"use client";

import { Toggle } from "@/components/ui/toggle";
import { type Editor } from "@tiptap/react";

import {
  AlignCenter,
  Bold,
  Heading,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";

import { useRef, useState } from "react";
import { z } from "zod";
import LinkInput from "./linkInput";
import TextAlignTool from "./textAlignTool";

type ToolbarProps = { editor: Editor | null };
const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex px-2 py-1 bg-gray-200 rounded-md items-center">
      <Toggle
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        size="sm"
      >
        <Heading className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        size="sm"
      >
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        size="sm"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>

      <TextAlignTool editor={editor} />
      <Toggle
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        size="sm"
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        size="sm"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        size="sm"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <LinkInput editor={editor} />
    </div>
  );
};

export default Toolbar;
