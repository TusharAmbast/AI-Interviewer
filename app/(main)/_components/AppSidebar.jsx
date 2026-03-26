"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import Image from "next/image"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SidebarOptions } from "@/services/Constants";
import React, { use } from "react";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  
  const path= usePathname();
  console.log("Current Path:", path); // Debugging line to check the current path
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center mt-3">
        <Image src="/logo.png" alt="Logo" width={200} height={100}
        className="w-[150px]" />
        <Button className="w-full"> <Plus />Create New Interview</Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SidebarOptions.map((option, index) => (
                  <div key={index}>
                      {option.icon && <option.icon className="h-5 w-5" />}
                      <span>{option.name}</span>
                  </div>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}