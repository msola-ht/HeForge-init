# 前端模块说明

[文档索引](../docs/README.md) · [前端规则](AGENTS.md) · [后端模块说明](../src-tauri/README.md) · [开发指南](../docs/development.md)

本文描述当前源码的职责与连接关系。前端目前提供应用壳层和页面骨架，尚未接入 Rust 业务 IPC、项目持久化或业务查询缓存。

## 应用入口与布局

| 文件 / 模块 | 用途与连接关系 |
| --- | --- |
| [main.tsx](main.tsx) | 挂载 React，加载全局样式，在 StrictMode 中以 ThemeProvider 包裹 RouterProvider |
| [router.tsx](router.tsx) | 创建 Hash Router，注册控制台、设置、更多及未知路径，共用 AppLayout；子路由提供 Breadcrumb 文案 |
| [app-layout.tsx](components/app-layout.tsx) | 组合 TooltipProvider、SidebarProvider、AppSidebar、顶部栏和 Outlet；读取匹配路由生成 Breadcrumb，提供主题切换按钮和内容滚动区 |
| [page.tsx](components/page.tsx) | 为页面提供统一的纵向 flex 容器、宽度和间距，通过 children 与 className 组合内容 |
| [index.css](index.css) | 加载 Tailwind、动画与字体，定义明暗主题、语义颜色、圆角和全局样式 |

当前渲染关系：

```text
main.tsx
  ThemeProvider
    RouterProvider
      AppLayout
        AppSidebar + 顶部栏
        Outlet
          InDevelopmentPage / NotFoundPage
            Page
```

## 路由页面

| 文件 | 路由 | 用途与当前状态 |
| --- | --- | --- |
| [in-development.tsx](pages/in-development.tsx) | `#/`、`#/settings`、`#/projects` | 控制台、设置和更多的占位内容，显示对应标题与“开发中” |
| [dashboard.tsx](pages/dashboard.tsx) | 未注册 | 保留原概览示例，当前不渲染 |
| [not-found.tsx](pages/not-found.tsx) | 未匹配的 Hash 路径 | 显示未找到页面，并提供返回控制台的路由链接 |

## 侧栏与组合组件

| 文件 / 模块 | 输入、用途与当前状态 |
| --- | --- |
| [app-sidebar.tsx](components/app-sidebar.tsx) | 显示原始完整侧栏，包含示例团队、分组导航、项目和用户信息；示例链接尚未接入业务路由 |
| [nav-main.tsx](components/nav-main.tsx) | 接收 items，渲染可折叠主导航和子链接；当前调用方传入的是示例链接 |
| [nav-projects.tsx](components/nav-projects.tsx) | 接收 projects，渲染项目导航和操作菜单；查看、分享、删除菜单尚未绑定业务处理 |
| [nav-user.tsx](components/nav-user.tsx) | 接收 user，显示头像、用户信息及账户菜单；尚无认证、计费或退出登录实现 |
| [team-switcher.tsx](components/team-switcher.tsx) | 接收 teams，使用组件状态切换展示的团队；当前未被应用引用，也不改变真实工作区 |

## 状态与共享能力

| 文件 / 模块 | 状态或能力 | 当前持久化与边界 |
| --- | --- | --- |
| [theme-provider.tsx](components/theme-provider.tsx) | ThemeProvider 与 useTheme 管理 light、dark、system，响应系统配色、快捷键和 storage 事件 | 使用 localStorage 保存主题偏好，并修改根元素主题 class；不包含业务数据 |
| [sidebar.tsx](components/ui/sidebar.tsx) | SidebarProvider 与 useSidebar 管理桌面展开、移动端抽屉和切换快捷键 | 切换桌面展开状态时写入 cookie；当前初始化使用 defaultOpen 或受控 prop，没有读取 cookie 恢复状态的逻辑 |
| [use-mobile.ts](hooks/use-mobile.ts) | useIsMobile 通过媒体查询判断小于 768px 的视口 | 组件生命周期内监听与清理，不持久化 |
| [utils.ts](lib/utils.ts) | 重导出 `cn` 包的类名组合函数 | 无业务状态；当前组件多直接从 `cn` 包导入 |

目前没有独立的业务 store、远端数据查询缓存或 IPC 订阅。TeamSwitcher 的选择状态仅属于该示例组件，不能视为应用工作区状态。

## 基础 UI 组件

`components/ui` 是 CLI 生成的基础组件集合。业务层通过公开 API 组合，以下按用途列出当前文件：

| 用途 | 文件 |
| --- | --- |
| 操作与输入 | [button.tsx](components/ui/button.tsx)、[input.tsx](components/ui/input.tsx) |
| 内容与占位 | [card.tsx](components/ui/card.tsx)、[skeleton.tsx](components/ui/skeleton.tsx) |
| 导航与布局 | [sidebar.tsx](components/ui/sidebar.tsx)、[breadcrumb.tsx](components/ui/breadcrumb.tsx)、[separator.tsx](components/ui/separator.tsx) |
| 展开与浮层 | [collapsible.tsx](components/ui/collapsible.tsx)、[sheet.tsx](components/ui/sheet.tsx)、[dropdown-menu.tsx](components/ui/dropdown-menu.tsx)、[tooltip.tsx](components/ui/tooltip.tsx) |
| 用户展示 | [avatar.tsx](components/ui/avatar.tsx) |

## 后续业务模块的位置

前端规则定义了 `features/<feature>` 结构，目前尚未建立。实际业务接入后，组件、hooks、API 适配、契约类型及必要的模块状态归入对应业务目录；页面负责组合模块。

预期调用关系为“页面 / 业务组件 → 业务 hook → API 适配 → Tauri command”。这是扩展方向，当前没有已实现的 command 调用链；通信与状态约束见[项目规则](../AGENTS.md)。

`app/` 是按需建立的前端应用组合层，目前也不存在。出现切换工作区等跨模块需求时，它通过业务模块公开接口协调作用域、缓存和选择状态；页面保持展示组合职责。跨资源业务事务由 Rust 应用服务负责，不由前端组合层串联写操作保证一致性。
