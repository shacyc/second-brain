import * as React from "react"
import {
  ChevronDown,
  LogOut,
  MousePointerClick,
  Wand2,
} from "lucide-react"

import { ScrollArea } from "./ui/scroll-area"
import UserNotes from "./user-notes/user-notes"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useTheme } from "./theme-provider"
import { firebase } from "@/firebase/firebase"


export function AppSidebar({
  user,
}) {

  const { setTheme, theme } = useTheme()
  const [cursor, setCursor] = React.useState(localStorage.getItem("cursor-variant") || "default")

  const changeCursor = (variant) => {
    if (cursor !== variant) {
      // save to local storage
      localStorage.setItem("cursor-variant", variant)

      // reload page
      window.location.reload()

    }
  }

  const logoutRenderer =
    <DropdownMenuItem onClick={firebase.logout}>
      <LogOut />
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>

  const themeRenderer = <DropdownMenuSub>
    <DropdownMenuSubTrigger>
      <Wand2 />
      Theme
    </DropdownMenuSubTrigger>
    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        <DropdownMenuCheckboxItem
          checked={theme === "light"}
          onCheckedChange={() => setTheme("light")}
        >
          Light
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={theme === "dark"}
          onCheckedChange={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={theme === "system"}
          onCheckedChange={() => setTheme("system")}
        >
          System
        </DropdownMenuCheckboxItem>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>

  const cursorRenderer = <DropdownMenuSub>
    <DropdownMenuSubTrigger>
      <MousePointerClick />
      Cursor
    </DropdownMenuSubTrigger>
    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        <DropdownMenuCheckboxItem
          checked={cursor === "canvas"}
          onCheckedChange={() => changeCursor("canvas")}
        >
          Canvas
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={cursor === "animated"}
          onCheckedChange={() => changeCursor("animated")}
        >
          Animated
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={cursor === "donut"}
          onCheckedChange={() => changeCursor("donut")}
        >
          Donut
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={cursor === "default"}
          onCheckedChange={() => changeCursor("default")}
        >
          Default
        </DropdownMenuCheckboxItem>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>

  return (
    <ScrollArea className="size-full">
      <div className="p-2">
        <div className="flex justify-between items-center p-2 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent rounded-md">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="h-5 w-5 rounded-md">
                  <AvatarImage src={user.avatar} alt={user.name} className="bg-primary dark:bg-primary rounded-md" />
                  <AvatarFallback className="bg-primary dark:bg-primary text-xs rounded-md text-white">{user.avatarFallback}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                </div>
                <ChevronDown className="opacity-50 size-4" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 ml-4 mt-1 rounded-lg">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {themeRenderer}
              {cursorRenderer}

              <DropdownMenuSeparator />
              {logoutRenderer}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <UserNotes user={user} />
      </div>
    </ScrollArea>
  )

}
