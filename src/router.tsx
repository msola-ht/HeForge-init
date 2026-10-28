import { createHashRouter } from "react-router-dom"

import { AppLayout } from "@/components/app-layout"
import { InDevelopmentPage } from "@/pages/in-development"
import { NotFoundPage } from "@/pages/not-found"
import { ProjectsPage } from "@/pages/projects"

export const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <InDevelopmentPage title="控制台" />,
        handle: { crumb: "控制台" },
      },
      {
        path: "settings",
        element: <InDevelopmentPage title="设置" />,
        handle: { crumb: "设置" },
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
