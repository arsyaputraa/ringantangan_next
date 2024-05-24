"use client";

import React, { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { LinkIcon } from "lucide-react";
import { z } from "zod";
import { type Editor } from "@tiptap/react";

const linkValidation = z.union([z.literal(""), z.string().trim().url()]);

const LinkInput = ({ editor }: { editor: Editor | null }) => {
  const linkInputRef = useRef<HTMLInputElement | null>(null);
  const [linkError, setLinkError] = useState("");
  const [pop, setPop] = useState(false);

  if (!editor) return null;

  const setLink = () => {
    const url = linkInputRef.current?.value;

    // cancelled
    if (url === null || url === undefined) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <Popover open={pop} onOpenChange={setPop}>
      <PopoverTrigger asChild>
        <Toggle size="sm">
          <LinkIcon className="h-4 w-4" />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1">
        <Label htmlFor="link-input">Input link here</Label>
        <Input
          id="link-input"
          ref={linkInputRef}
          defaultValue={editor.getAttributes("link").href}
        />
        <Button
          onClick={() => {
            const validate = linkValidation.safeParse(
              linkInputRef.current?.value
            );
            if (!validate.success) {
              let errorMessage = "";
              validate.error.issues.forEach((issue) => {
                errorMessage = `${issue.message}. `;
              });
              return setLinkError(errorMessage);
            }

            setLink();

            return setPop(false);
          }}
          size="sm"
        >
          ADD LINK
        </Button>
        <p className="text-red-500">{linkError}</p>
      </PopoverContent>
    </Popover>
  );
};

export default LinkInput;
