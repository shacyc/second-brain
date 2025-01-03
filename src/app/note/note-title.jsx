import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Image, Smile, Tag } from "lucide-react";

export default function NoteTitle({ title }) {
    return (
        <>
            <div className="flex items-center opacity-0 hover:opacity-50 transition-opacity duration-150 mb-1">
                <Button variant="ghost" size="sm">
                    <Tag />
                    Add tags
                </Button>
                <Button variant="ghost" size="sm">
                    <Smile />
                    Add icon
                </Button>
                <Button variant="ghost" size="sm">
                    <Image />
                    Add cover
                </Button>
            </div>
            <h1
                contentEditable
                placeholder="Untitled"
                className={cn(
                    "mb-4 text-4xl font-bold outline-none",
                    "before:empty:content-[attr(placeholder)]",
                    !title && "opacity-50",
                )}
            >
                {title}
            </h1>
        </>
    );
}