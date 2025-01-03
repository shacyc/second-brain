import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/sonner"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { CommonFunction } from "@/lib/common-function";

import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { Outlet } from "react-router";
import Cursor from "@/components/ui/cursor/cursor";

export default function Home({ user }) {

  useEffect(() => {
    CommonFunction.eventBus.on("toggle-sidebar", toggleSidebar)

    return () => {
      CommonFunction.eventBus.remove("toggle-sidebar", toggleSidebar)
    }
  }, []);

  const refSidebar = useRef({
    component: createRef(),
    size: 15,
    collapsed: false
  });

  const preparedUser = useMemo(() => {
    if (!user) return null;

    const getInitials = (name) => {
      if (!name) return '';

      const parts = name.trim().split(/\s+/); // Splits by any whitespace
      let initials = parts[0].charAt(0).toUpperCase(); // First initial

      if (parts.length > 1) {
        initials += parts[parts.length - 1].charAt(0).toUpperCase(); // Last initial
      }

      return initials.substring(0, 1); // Ensure max 2 characters
    }

    return {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      avatar: user.avatar,
      avatarFallback: getInitials(user.displayName),
    };
  }, []);

  const toggleSidebar = () => {
    if (refSidebar.current.collapsed) {
      refSidebar.current.component.current.resize(refSidebar.current.size);
      refSidebar.current.collapsed = false;
    } else {
      refSidebar.current.component.current.resize(0);
      refSidebar.current.collapsed = true;
    }
  }

  return (<>
    <ResizablePanelGroup direction="horizontal" >
      <ResizablePanel
        minSize={0}
        maxSize={50}
        defaultSize={15}
        ref={refSidebar.current.component}
        onResize={(size) => {
          if (size > 0) refSidebar.current.size = size
        }}
        className="bg-sidebar"
      >
        <AppSidebar user={preparedUser} />
      </ResizablePanel>
      <ResizableHandle className="opacity-0" />
      <ResizablePanel defaultSize={85} className="bg-sidebar">
        <div className="m-2 ml-0 h-[calc(100%-theme(spacing.4))] bg-background rounded-xl" >
          <Outlet />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup >
    <Toaster />
    <Cursor variant={localStorage.getItem("cursor-variant") || "canvas"} />
  </>)
}
