"use client";

import React, { useRef, useState } from "react";
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
  return (
    <Popover open={pop} onOpenChange={setPop}>
      <PopoverTrigger asChild>
        <Toggle size="sm">
          <LinkIcon className="h-4 w-4" />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1">
        <Label htmlFor="link-input">Input link here</Label>
        <Input id="link-input" ref={linkInputRef} />
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

            editor.commands.setLink({
              href: validate.data,
              target: "_blank",
            });

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
