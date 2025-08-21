import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { Home } from "lucide-react";
import { User } from "lucide-react";
import { ChartBarIcon } from "lucide-react";
import { MessageCircle } from "lucide-react";
const items = [
  {
    path: "/",
    text: "Home",
    icon: Home,
  },
  {
    path: "/comments",
    text: "Comments",
    icon: MessageCircle,
  },
  {
    path: "/users",
    text: "Users",
    icon: User,
  },
];

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-bold">Blog App</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.text}>
                <SidebarMenuButton>
                  <item.icon />
                  <Link className="font-bold" to={item.path}>{item.text}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
