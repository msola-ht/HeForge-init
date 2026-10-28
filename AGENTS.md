# HeForge 项目规则

本文件约束本仓库的 UI、页面布局和工具使用。必须优先遵守上级全局规则与用户的明确指令。

## UI 组件规范

- UI 组件统一使用 shadcn/ui 的 Base Nova 预设，配置以 `components.json` 为准。
- 新增组件、块或依赖时，先使用官方 CLI，不手写同名基础组件：

  ```bash
  npx shadcn@latest add <component-or-block>
  ```

- 可能覆盖已有文件时，先预览再应用：

  ```bash
  npx shadcn@latest add <component-or-block> --dry-run
  npx shadcn@latest add <component-or-block> --overwrite
  ```

- `src/components/ui/**` 是 CLI 生成的基础组件，禁止手改内部实现。
- 禁止复制生成组件后改名，或另外手写视觉相似的 Button、Card、Dialog、Sidebar、Select 等基础件。
- 页面只组合已有组件的公开 API；布局优先使用 `Sidebar`、`SidebarInset`、`Breadcrumb`、`Card`、`Button`、`DropdownMenu`、`Avatar` 等已有组件。
- 颜色、边框、阴影和状态样式使用 `src/index.css` 中的语义变量与 Tailwind token，不引入任意色值或独立样式文件。
- 组件缺少所需能力时，先检查现有组件、variants 和 shadcn registry；仍无法满足时说明原因并征求用户确认，不自造基础组件。
- CLI 生成的 block 示例数据保持原样。接入真实业务数据时，优先在独立的业务组件中通过 props 传入，不直接改写生成块内部。

## CLI 与技能

- 脚手架、组件、块、图标和依赖优先使用官方 CLI，不手工复刻 CLI 能生成的内容。
- 浏览器验证使用 `ego-browser` 技能；使用前先读取并执行其 `SKILL.md` 要求。
- shadcn 组件与规范优先查官方 CLI、registry 和 shadcn 技能；API 和配置问题查官方文档，不凭记忆猜测。
- 不把“构建通过”当作 UI 已验证的唯一证据。涉及界面时必须同时检查实际页面。

## 全局布局与页面继承

- 应用入口结构固定为 `ThemeProvider -> RouterProvider`，主题必须在路由外层全局生效。
- 路由统一在 `src/router.tsx` 使用 `createHashRouter`，以兼容 Tauri 的本地资源加载。
- `AppLayout` 是父路由和唯一全局壳层，负责侧栏、顶部栏、Provider 与内容区。
- 新页面放在 `src/pages/**`，并在 `src/router.tsx` 注册为 `AppLayout` 的子路由。
- 页面禁止再次包裹 `AppLayout`、`SidebarProvider` 或重复渲染侧栏、顶部栏。
- 每个路由提供 `handle.crumb`，顶部 Breadcrumb 从 `useMatches()` 自动读取。
- 页面根容器使用 `src/components/page.tsx` 的 `Page`，保证内容纵向撑满可用空间。
- 全局壳层保持视口高度：`h-svh`、`min-h-0`、`flex-1`；内容超出时内部滚动，但不显示页面滚动条。
- 真实导航使用 React Router 的 `Link` 或 `NavLink`；不要用 `href="#"` 作为功能页链接。
- 新增页面后必须确认它自动继承侧栏、顶部栏、主题和纵向布局，不需要复制页面外壳代码。

## 工具链与验证

- 前端依赖管理以 `bun.lock` 为准，使用 `bun install`、`bun add`、`bun run`。
- Tauri 命令使用 `bun tauri dev` 或 `bun tauri build`，不混用其他包管理器锁文件。
- 完成 UI 或路由改动后至少执行：

  ```bash
  bun run build
  ```

- 同时验证目标路由能够实际打开、页面继承全局布局、视口内没有意外页面滚动条。
- 未经用户明确要求，不创建提交、不推送远程仓库。
