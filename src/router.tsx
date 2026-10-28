import { createHashRouter } from "react-router-dom"

import { AppLayout } from "@/components/app-layout"
import { DashboardPage } from "@/pages/dashboard"
import { NotFoundPage } from "@/pages/not-found"
import { ProjectsPage } from "@/pages/projects"

export const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
        handle: { crumb: "概览" },
      },
      {
        path: "projects",
        element: <ProjectsPage />,
        handle: { crumb: "项目" },
      },
      {
        path: "*",
        element: <NotFoundPage />,
        handle: { crumb: "页面未找到" },
      },
    ],
  },
])
