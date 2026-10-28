import { MoreHorizontalIcon, Settings2Icon, TerminalSquareIcon } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const overviewItems = [
  { title: "控制台", to: "/", icon: TerminalSquareIcon },
  { title: "设置", to: "/settings", icon: Settings2Icon },
]

export function AppNavigation() {
  const { pathname } = useLocation()

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>概览</SidebarGroupLabel>
        <SidebarMenu className="gap-[2.5px]">
          {overviewItems.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={pathname === item.to}
                render={<NavLink to={item.to} end />}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>项目</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/projects"}
              render={<NavLink to="/projects" end />}
            >
              <MoreHorizontalIcon />
              <span>更多</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}
