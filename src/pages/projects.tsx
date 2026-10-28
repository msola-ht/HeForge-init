import { FolderKanbanIcon, PlusIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Page } from "@/components/page"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ProjectsPage() {
  return (
    <Page>
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">项目</p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            全部项目
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            此页面没有重复声明侧栏或顶部栏，全局布局由父路由自动继承。
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" render={<Link to="/" />}>
            返回概览
          </Button>
          <Button>
            <PlusIcon data-icon="inline-start" />
            新建项目
          </Button>
        </div>
      </section>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderKanbanIcon className="size-4 text-muted-foreground" />
            项目列表
          </CardTitle>
          <CardDescription>新建的项目会显示在这里。</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center">
          <div className="flex h-full min-h-48 w-full flex-col items-center justify-center rounded-lg border border-dashed text-center">
            <p className="text-sm font-medium">还没有项目</p>
            <p className="mt-1 text-xs text-muted-foreground">
              从这里创建第一个本地项目。
            </p>
          </div>
        </CardContent>
      </Card>
    </Page>
  )
}
