import * as React from "react"
import {
  BookOpen,
  Bot,
  ChevronDown,
  Frame,
  LifeBuoy,
  LogOut,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ScrollArea } from "./ui/scroll-area"
import { IconAppleFilled } from "@tabler/icons-react"
import UserNotes from "./user-notes/user-notes"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useTheme } from "./theme-provider"
import { firebase } from "@/firebase/firebase"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Playground Playground Playground Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History History History History",
          icon: SquareTerminal,
          url: "#",
          items: [
            {
              title: "2021",
              icon: SquareTerminal,
              url: "#",
              items: [
                {
                  title: "January",
                  icon: SquareTerminal,
                  url: "#",
                },
                {
                  title: "February",
                  url: "#",
                },
                {
                  title: "March",
                  url: "#",
                },
                {
                  title: "April",
                  url: "#",
                },
                {
                  title: "May",
                  url: "#",
                },
                {
                  title: "June",
                  url: "#",
                },
                {
                  title: "July",
                  url: "#",
                },
                {
                  title: "August",
                  url: "#",
                },
                {
                  title: "September",
                  url: "#",
                },
                {
                  title: "October",
                  url: "#",
                },
                {
                  title: "November",
                  url: "#",
                },
                {
                  title: "December",
                  url: "#",
                }
              ]
            },
            {
              title: "2020",
              url: "#",
            },
            {
              title: "2019",
              url: "#",
            },
          ]
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  user,
  ...props
}) {

  const { setTheme, theme } = useTheme()

  const logoutRenderer =
    <DropdownMenuItem onClick={firebase.logout}>
      <LogOut />
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>

  const themeRenderer = <>
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
  </>

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
              {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem> */}

              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {themeRenderer}

              <DropdownMenuSeparator />
              {logoutRenderer}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <UserNotes user={user} />
      </div>
    </ScrollArea>
  )

  // return (
  //   (<Sidebar variant="inset" {...props}>
  //     <SidebarHeader>
  //       <SidebarMenu>
  //         <SidebarMenuItem>
  //           <SidebarMenuButton size="lg" asChild>
  //             <a href="#">
  //               <div
  //                 className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
  //               >
  //                 <IconAppleFilled className="size-6" />
  //               </div>
  //               <div className="grid flex-1 text-left text-sm leading-tight">
  //                 <span className="truncate font-semibold">Second Brain</span>
  //                 <span className="truncate text-xs">Knowledge Hub</span>
  //               </div>
  //             </a>
  //           </SidebarMenuButton>
  //         </SidebarMenuItem>
  //       </SidebarMenu>
  //     </SidebarHeader>
  //     <SidebarContent>
  //       <ScrollArea className="size-full">
  //         <UserNotes user={user} />
  //         {/* <NavMain items={data.navMain} /> */}
  //         {/* <NavProjects projects={data.projects} />
  //         <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
  //       </ScrollArea>
  //     </SidebarContent>
  //     <SidebarFooter>
  //       <NavUser user={user} />
  //     </SidebarFooter>
  //   </Sidebar>)
  // );
}
