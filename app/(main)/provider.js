import { AppSidebar }  from "./_components/AppSidebar";
import { SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar";
import React from "react"
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";

function DashboardProvider({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full mt-10 mr-5 ml-5">
                {/* <SidebarTrigger /> */}
                <WelcomeContainer />
                {children}
            </div>
        </SidebarProvider>
    )
}

export default DashboardProvider;