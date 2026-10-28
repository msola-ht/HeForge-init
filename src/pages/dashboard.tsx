import { ArrowUpRightIcon, FolderKanbanIcon, SparklesIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Page } from "@/components/page"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const summary = [
  {
    label: "活跃项目",
    value: "0",
    description: "创建项目后会显示在这里",
  },
  {
    label: "自动化任务",
    value: "0",
    description: "构建工作流后开始运行",
  },
  {
    label: "本地工作区",
    value: "1",
    description: "当前设备已经连接",
  },
]

export function DashboardPage() {
  return (
    <Page>
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">概览</p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            欢迎使用 HeForge
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            从左侧导航管理项目、自动化流程和工作区设置。当前布局会在所有页面中保持一致。
          </p>
        </div>
        <Button
          className="self-start sm:self-auto"
          render={<Link to="/projects" />}
        >
          <SparklesIcon data-icon="inline-start" />
          新建项目
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {summary.map((item) => (
          <Card key={item.label} size="sm">
            <CardHeader>
              <CardDescription>{item.label}</CardDescription>
              <CardTitle className="text-3xl font-semibold tracking-tight">
                {item.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs leading-5 text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderKanbanIcon className="size-4 text-muted-foreground" />
              最近项目
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed px-6 text-center">
              <p className="text-sm font-medium">还没有项目</p>
              <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                下一步可以接入项目数据，并在这里展示最近打开的工作内容。
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>快速开始</CardTitle>
            <CardDescription>完善你的桌面工作流</CardDescription>
            <CardAction>
              <ArrowUpRightIcon className="size-4 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-lg bg-muted/60 p-3">使用侧栏切换工作区</div>
            <div className="rounded-lg bg-muted/60 p-3">
              按{" "}
              <kbd className="rounded border bg-background px-1.5 py-0.5 text-xs">
                ⌘B
              </kbd>{" "}
              收起或展开侧栏
            </div>
            <div className="rounded-lg bg-muted/60 p-3">
              点击右上角图标切换明暗主题
            </div>
          </CardContent>
        </Card>
      </section>
    </Page>
  )
}

export default DashboardPage
