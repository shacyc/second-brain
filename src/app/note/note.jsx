import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NoteFeatures } from "./note-features";
import { firebase } from "@/firebase/firebase";

export default function Note() {
    const { noteId } = useParams();
    const [note, setNote] = useState(null);

    useEffect(() => {
        const getNode = async () => {
            let note = firebase.services.notes.get(noteId)
            if (note) {
                setNote(note);
            }
        }

        getNode();
    }, [noteId]);

    return !noteId ? <NoteFeatures /> : (<>
        <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                                Building Your Application
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {note}
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
                <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
                <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
            </div>
            <div
                className="min-h-[100vh] flex-1 rounded-xl bg-zinc-100/50 md:min-h-min dark:bg-zinc-800/50"
            />
        </div> */}
    </>)
}