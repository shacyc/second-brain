import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
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
  return (
    (<Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                >
                  <IconAppleFilled className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Second Brain</span>
                  <span className="truncate text-xs">Knowledge Hub</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="size-full">
          <UserNotes user={user} />
          <NavMain items={data.navMain} />
          {/* <NavProjects projects={data.projects} />
          <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>)
  );
}
