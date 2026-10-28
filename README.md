# HeForge

基于 React、TypeScript、Vite、shadcn/ui 与 Tauri 2 的桌面应用。

## 开发

```bash
bun install
bun tauri dev
```

仅调试前端：

```bash
bun run dev
```

## 多平台构建

Tauri 会按当前操作系统自动加载 `src-tauri/tauri.<platform>.conf.json`。应在目标系统上执行原生构建，不建议从单一系统直接交叉打包桌面安装文件。

| 平台 | 命令 | 产物 |
| --- | --- | --- |
| macOS | `bun tauri build` | `.app`、`.dmg` |
| Linux | `bun tauri build` | AppImage、`.deb`、`.rpm` |
| Windows | `bun tauri build` | NSIS `.exe`、MSI |

macOS 通用二进制需要先安装两种架构的 Rust target：

```bash
rustup target add aarch64-apple-darwin x86_64-apple-darwin
bun run tauri:build:macos:universal
```

Ubuntu 22.04 或更新版本构建前可安装 Tauri 系统依赖：

```bash
sudo apt update
sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

安装包默认未配置 macOS 公证和 Windows 代码签名。发布前需在对应构建环境中补充证书与签名密钥。

## 添加 UI 组件

使用 shadcn CLI 添加组件：

```bash
bunx --bun shadcn@latest add button
```

组件会生成到 `src/components/ui`。
