import { Settings2Icon, TerminalSquareIcon } from "lucide-react"
import { Link, matchPath, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "控制台", url: "/", icon: TerminalSquareIcon },
  { title: "设置", url: "/settings", icon: Settings2Icon },
]

export function WorkspaceSidebar() {
  const { pathname } = useLocation()
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={Boolean(
                    matchPath({ path: item.url, end: true }, pathname)
                  )}
                  render={
                    <Link
                      to={item.url}
                      aria-label={item.title}
                      aria-current={
                        matchPath({ path: item.url, end: true }, pathname)
                          ? "page"
                          : undefined
                      }
                    />
                  }
                  onClick={() => {
                    if (isMobile) setOpenMobile(false)
                  }}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
