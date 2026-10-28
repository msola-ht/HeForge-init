import { createHashRouter } from "react-router-dom"

import { AppLayout } from "@/components/app-layout"
import { InDevelopmentPage } from "@/pages/in-development"
import { NotFoundPage } from "@/pages/not-found"

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
        element: <InDevelopmentPage title="更多" />,
        handle: { crumb: "更多" },
      },
      {
        path: "*",
        element: <NotFoundPage />,
        handle: { crumb: "页面未找到" },
      },
    ],
  },
])
