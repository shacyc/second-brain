import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { useMemo } from "react";
import { Outlet } from "react-router";

export default function Home({ user }) {

  const preparedUser = useMemo(() => {
    if (!user) return null;

    const getInitials = (name) => {
      if (!name) return '';

      const parts = name.trim().split(/\s+/); // Splits by any whitespace
      let initials = parts[0].charAt(0).toUpperCase(); // First initial

      if (parts.length > 1) {
        initials += parts[parts.length - 1].charAt(0).toUpperCase(); // Last initial
      }

      return initials.substring(0, 2); // Ensure max 2 characters
    }

    return {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      avatar: user.avatar,
      avatarFallback: getInitials(user.displayName),
    };
  }, []);

  return (
    (<SidebarProvider>
      <AppSidebar user={preparedUser} />
      <SidebarInset>
        {/* Note component, navigate by /note-id */}
        <Outlet />
      </SidebarInset>
    </SidebarProvider>)
  );
}
