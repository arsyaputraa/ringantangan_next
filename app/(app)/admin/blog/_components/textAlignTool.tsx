"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle, toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { type Editor } from "@tiptap/react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

const TextAlignTool = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const getActiveAlignmentIcon = () => {
    if (editor.isActive({ textAlign: "center" }))
      return <AlignCenter className="w-4 h-4" />;
    if (editor.isActive({ textAlign: "left" }))
      return <AlignLeft className="w-4 h-4" />;

    if (editor.isActive({ textAlign: "right" }))
      return <AlignRight className="w-4 h-4" />;

    if (editor.isActive({ textAlign: "justify" }))
      return <AlignJustify className="w-4 h-4" />;
  };
  return (
    <Popover>
      <PopoverTrigger className={cn(toggleVariants({ variant: "default" }))}>
        {getActiveAlignmentIcon()}
      </PopoverTrigger>
      <PopoverContent className="flex items-center gap-1 w-fit p-1">
        <Toggle
          pressed={editor.isActive({ textAlign: "center" })}
          onPressedChange={() => {
            editor.isActive({ textAlign: "center" })
              ? editor.chain().focus().unsetTextAlign().run()
              : editor.chain().focus().setTextAlign("center").run();
          }}
          size="sm"
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive({ textAlign: "left" })}
          onPressedChange={() => {
            editor.isActive({ textAlign: "left" })
              ? editor.chain().focus().unsetTextAlign().run()
              : editor.chain().focus().setTextAlign("left").run();
          }}
          size="sm"
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive({ textAlign: "right" })}
          onPressedChange={() => {
            editor.isActive({ textAlign: "right" })
              ? editor.chain().focus().unsetTextAlign().run()
              : editor.chain().focus().setTextAlign("right").run();
          }}
          size="sm"
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive({ textAlign: "justify" })}
          onPressedChange={() => {
            editor.isActive({ textAlign: "justify" })
              ? editor.chain().focus().unsetTextAlign().run()
              : editor.chain().focus().setTextAlign("justify").run();
          }}
          size="sm"
        >
          <AlignJustify className="h-4 w-4" />
        </Toggle>
      </PopoverContent>
    </Popover>
  );
};

export default TextAlignTool;
