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
  const path = usePathname();
  console.log("Current Path:", path); 

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center mt-3">
        <Image src="/Logo.png" alt="Logo" width={200} height={100} className="w-[150px]" />
        <Button className="w-full"> <Plus />Create New Interview</Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* Note: You had nested <SidebarContent> tags, I removed the redundant inner one */}
          <SidebarMenu>
            {SidebarOptions.map((option, index) => {
              // 1. Check if the current route matches the option's path
              const isActive = path === option.path;
              
              return (
                <SidebarMenuItem key={index}>
                  {/* 2. Use SidebarMenuButton to get the proper hover/active styling */}
                  <SidebarMenuButton asChild isActive={isActive}>
                    {/* 3. Use Next.js Link for actual navigation */}
                    <Link href={option.path} className="flex items-center gap-3 cursor-pointer">
                      {option.icon && <option.icon className="h-5 w-5" />}
                      <span>{option.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}