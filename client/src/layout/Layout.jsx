import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <SidebarProvider>
        <TopBar />
        <AppSidebar />
        <main className="w-full">
          <div className="w-full min-h-dvh py-24 px-5">
            <Outlet />
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
}

export default Layout;
