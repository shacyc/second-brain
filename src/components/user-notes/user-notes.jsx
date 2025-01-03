import { useEffect, useMemo, useState } from "react";
import { firebase } from "@/firebase/firebase";
import { MoreHorizontal, PlusIcon, ScrollText, SquarePenIcon } from "lucide-react";
import { CommonFunction } from "@/lib/common-function";
import { useNavigate } from "react-router";
import { SidebarMenu, SidebarTitle } from "../ui/sidebar-menu";
import { toast } from "sonner"

export default function UserNotes({ user }) {
    const [userNotes, setUserNotes] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserNotes = async () => {
            const _userNotes = await firebase.services.userNotes.get(user.uid);
            if (_userNotes?.struct) {
                setUserNotes(_userNotes);
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
        const _userNotes = structuredClone(userNotes || {});

        let _notePath = "",
            defaultStructNote = {},
            defaultNote = {};

        if (pId) {
            // push new note to struct
            _userNotes.struct = CommonFunction.recursive(_userNotes.struct, (note, parentNote, breakFn, _noteKey) => {
                if (!parentNote) {
                    _notePath = _noteKey;
                } else {
                    _notePath = `${_notePath}.items.${_noteKey}`;
                }

                if (_noteKey === pId) {
                    if (!note.items) note.items = {};
                    note.items[id] = defaultStructNote;
                    breakFn();
                }
                return note;
            }, { childrenProp: "items", childrenType: "object" });

            // push new note to notes
            _userNotes.notes[id] = defaultNote;

        } else {
            // push new note to struct
            _userNotes.struct[id] = defaultStructNote;

            // push new note to notes
            _userNotes.notes[id] = defaultNote;
        }

        const promise = new Promise(async (resolve, reject) => {
            try {
                // update user note
                let _params = {
                    [`struct${_notePath ? `.${_notePath}.items` : ""}.${id}`]: defaultStructNote,
                    [`notes.${id}`]: defaultNote
                }
                let success = await firebase.services.userNotes.update(user.uid, _params);

                // create new note
                if (success) {
                    success = await firebase.services.notes.create(id, {
                        uid: user.uid,
                    });
                }

                if (success) {
                    setUserNotes(_userNotes);
                    navigate(`/${id}`);

                    // expand node
                    if (pId) {
                        let el = document.querySelector(`[data-sidebar-menu-item="${pId}"] .collapse-icon`);
                        if (el && el.dataset?.state === "closed") {
                            el.click();
                        }
                    }

                    resolve(true);
                } else {
                    reject(false);
                }
            } catch (error) {
                console.error("Error creating note: ", error);
                reject(error);
            }

        });

        toast.promise(promise, {
            loading: "Creating note...",
            success: "Note created successfully!",
            error: "Failed to create note."
        })

    }
    /**
     * create a new note
     * @param {*} pId parent id
     */
    const createNote1 = async (pId) => {
        let id = CommonFunction.generateId();
        let _newNote = { id, note: {} };

        const _userNotes = structuredClone(userNotes || {});
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

        const promise = new Promise(async (resolve, reject) => {
            try {
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

                    // expand node
                    if (pId) {
                        let el = document.querySelector(`[data-sidebar-menu-item="${pId}"] .collapse-icon`);
                        if (el && el.dataset?.state === "closed") {
                            el.click();
                        }
                    }

                    resolve(true);
                } else {
                    reject(false);
                }
            } catch (error) {
                console.error("Error creating note: ", error);
                reject(error);
            }

        });

        toast.promise(promise, {
            loading: "Creating note...",
            success: "Note created successfully!",
            error: "Failed to create note."
        })

    }

    const preparedUserNotes = useMemo(() => {
        if (!userNotes) return null;

        let _notes = structuredClone(userNotes.struct);
        _notes = CommonFunction.recursive(_notes, (_note, parentNote, breakFn, _noteKey) => {
            if (!_note.title) _note.title = "New note";
            _note.key = _noteKey;
            _note.url = `/${_noteKey}`;
            return _note;
        }, { childrenProp: "items", childrenType: "object" });
        return _notes;
    }, [userNotes]);

    return userNotes && (<>
        <SidebarMenu
            menu={{
                items: [{
                    key: "create-note",
                    title: "New note",
                    icon: SquarePenIcon,
                }],
                onClick: item => {
                    switch (item.key) {
                        case "create-note":
                            createNote();
                            break;
                        default:
                            break;
                    }
                }
            }}
            className="mt-2"
        ></SidebarMenu>

        <SidebarTitle>
            {Object.keys(userNotes.struct).length > 0 ? "Notes" : "No notes"}
        </SidebarTitle>

        <SidebarMenu
            menu={{
                items: preparedUserNotes,
                icon: ScrollText,
                menuItemHoverClassName: "pr-12",
                onClick: (item) => {
                    navigate(item.url);
                },
                actions: [{
                    key: "more",
                    icon: MoreHorizontal,
                    onClick: (item) => {
                    }
                }, {
                    key: "create",
                    icon: PlusIcon,
                    onClick: (item) => {
                        createNote(item.key);
                    }
                }]
            }}
            childrenProperty="items"
            showEmptyChildren
            emptyChildrenContent="No notes"
            variant="notion"
        ></SidebarMenu>
    </>)
}