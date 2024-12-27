import { useEffect, useState } from "react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuGroup, SidebarMenuItem } from "../ui/sidebar";
import { firebase } from "@/firebase/firebase";
import { PlusCircle, SquarePenIcon } from "lucide-react";

export default function UserNotes({ user }) {
    const [loading, setLoading] = useState(true);
    const [userNotes, setUserNotes] = useState(null);

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
    }, []);


    return userNotes && (<>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {[
                        {
                            title: "Create a new note",
                            url: "#",
                            icon: SquarePenIcon,
                        },

                    ].map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild size="sm">
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>

        <SidebarMenuGroup
            title="Notes"
            items={userNotes}
        />
    </>);
}