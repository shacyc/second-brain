import { cn } from "@/lib/utils";

export default function NoteTitle({ title }) {
    return (
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
    );
}