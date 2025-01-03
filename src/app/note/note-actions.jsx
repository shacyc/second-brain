import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, UnfoldHorizontal } from "lucide-react";

export default function NoteActions({ note, onSettingChange }) {
    const [settings, setSettings] = useState({
        fullWidth: note?.fullWidth || false
    })

    const setFullWidth = async (checked) => {
        setSettings({
            ...settings,
            fullWidth: checked
        })

        onSettingChange("fullWidth", checked)
    }

    const stopMenuItemClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <div className="flex item-center gap-1 pr-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => {
                        }}
                    >
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-4 mt-1 rounded-lg">
                    <DropdownMenuItem onClick={stopMenuItemClick}>
                        <UnfoldHorizontal />
                        Full width
                        <DropdownMenuShortcut className={"opacity-100"}>
                            <Switch checked={settings.fullWidth} onCheckedChange={setFullWidth} />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}