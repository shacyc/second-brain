import { useEffect, useMemo, useState } from "react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuGroup, SidebarMenuItem } from "../ui/sidebar";
import { firebase } from "@/firebase/firebase";
import { MoreHorizontal, PlusIcon, SquarePenIcon } from "lucide-react";
import { CommonFunction } from "@/lib/common-function";
import { useNavigate } from "react-router";

export default function UserNotes({ user }) {
    const [userNotes, setUserNotes] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserNotes = async () => {
            const _userNotes = await firebase.services.userNotes.get(user.uid);
            if (_userNotes?.notes) {
                setUserNotes(_userNotes.notes);
            } else {
                console.error("Error fetching user notes");
            }
        };

        fetchUserNotes();

        CommonFunction.eventBus.on("create-note", createNote)

        return () => {
            CommonFunction.eventBus.remove("create-note", createNote)
        }
    }, []);

    /**
     * create a new note
     * @param {*} pId parent id
     */
    const createNote = async (pId) => {
        let id = CommonFunction.generateId();
        let _newNote = { id, note: {} };

        const _userNotes = structuredClone(userNotes || []);
        if (!pId) {
            _userNotes.push(_newNote);
        } else {
            CommonFunction.recursive(_userNotes, (note, parentNote, breakFn) => {
                if (note.id === pId) {
                    if (!note.items) {
                        note.items = [];
                    }
                    note.items.push(_newNote);
                    breakFn();
                }

                return note;
            }, { childrenProp: "items" });
        }

        // update user note
        let success = await firebase.services.userNotes.update(user.uid, { notes: _userNotes });

        // create new note
        if (success) {
            success = await firebase.services.notes.create(id, {
                uid: user.uid,
            });
        }

        if (success) {
            setUserNotes(_userNotes);
            navigate(`/${id}`);
        }

    }

    const preparedUserNotes = useMemo(() => {
        if (!userNotes) return null;

        let _userNotes = structuredClone(userNotes);
        _userNotes = CommonFunction.recursive(_userNotes, (note, parentNote, breakFn) => {
            if (!note.title) note.title = "New note New note New note New note New note";
            note.href = "#";
            note.url = `/${note.id}`;
            return note;
        }, { childrenProp: "items" });
        return _userNotes;
    }, [userNotes]);

    return userNotes && (<>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {[
                        {
                            title: "Create a new note",
                            url: "#",
                            icon: SquarePenIcon,
                            onClick: (e => {
                                e.stopPropagation();
                                createNote();
                            })
                        },

                    ].map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild size="sm" onClick={item.onClick}>
                                <a href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>

        <SidebarMenuGroup
            title={userNotes.length > 0 ? "Notes" : "No notes"}
            items={preparedUserNotes}
            itemActionsHoverClassName="pr-14"
            itemActions={(item) => <>
                <SidebarMenuAction
                    position="left"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <MoreHorizontal className="opacity-50" />
                </SidebarMenuAction>
                <SidebarMenuAction
                    position="left"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        createNote(item.id);
                    }}
                >
                    <PlusIcon className="opacity-50" />
                </SidebarMenuAction>
            </>}
        />

    </>);
}