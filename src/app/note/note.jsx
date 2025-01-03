import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NoteFeatures } from "./note-features";
import { firebase } from "@/firebase/firebase";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PanelLeft, UnfoldHorizontal } from "lucide-react";
import { CommonFunction } from "@/lib/common-function";
import NoteTitle from "./note-title";

import NoteActions from "./note-actions";
import NoteCover from "./note-cover";

export default function Note() {
    const { noteId } = useParams();
    const [note, setNote] = useState(null);
    const refNoteContainer = useRef();

    useEffect(() => {
        const getNode = async () => {
            if (noteId) {
                let note = firebase.services.notes.get(noteId)
                if (note) {
                    setNote(note);
                }
            }
        }

        getNode();
    }, [noteId]);

    const onSettingChange = (key, value) => {
        switch (key) {
            case "fullWidth":
                refNoteContainer.current.classList.toggle("full-width")
                break;
            default:
                break;
        }
    }

    return !noteId ? <NoteFeatures /> : (<>
        <header className="flex h-12 shrink-0 items-center justify-between">
            <div className="flex items-center gap-1 pl-4">
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 -ml-1"
                    onClick={() => {
                        CommonFunction.eventBus.dispatch("toggle-sidebar");
                    }}
                >
                    <PanelLeft />
                </Button>
                <Separator orientation="vertical" className="mr-1 h-4" />
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

            <NoteActions note={note} onSettingChange={onSettingChange} />
        </header>
        <div className="container px-8 lg:px-0 lg:mx-auto lg:max-w-screen-md [&.full-width]:!max-w-full [&.full-width]:!px-12" ref={refNoteContainer}>
            <NoteCover />
            <NoteTitle />
        </div>
    </>)
}