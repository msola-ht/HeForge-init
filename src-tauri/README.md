# Rust 后端模块说明

[文档索引](../docs/README.md) · [后端规则](AGENTS.md) · [前端模块说明](../src/README.md) · [开发指南](../docs/development.md)

本文描述当前 Rust 与 Tauri 源码、配置的职责。当前后端仅有应用启动与开发日志初始化，尚未实现项目业务、持久化、后台任务或自定义 IPC command。

## 运行入口

| 文件 / 模块 | 用途与连接关系 |
| --- | --- |
| [src/main.rs](src/main.rs) | 桌面二进制入口，调用 `app_lib::run()`；Windows 发布构建使用 windows_subsystem 配置避免额外控制台窗口 |
| [src/lib.rs](src/lib.rs) | `run()` 创建 Tauri Builder，设置 setup 回调并启动应用；函数带移动端入口条件属性，但该属性本身不代表已交付移动端支持 |
| `lib.rs` 中的日志初始化 | debug 构建注册 tauri-plugin-log，日志级别为 Info；当前 release 分支不注册该插件 |

当前运行关系：

```text
main.rs
  app_lib::run()
    Tauri Builder
      setup：debug 构建注册日志插件
      generate_context!：加载 Tauri 上下文
      run：启动应用事件循环
```

## 构建与应用配置

| 文件 / 目录 | 用途与当前配置 |
| --- | --- |
| [Cargo.toml](Cargo.toml) | 定义 Rust package、`app_lib` 库及 Tauri、Serde、日志依赖；当前 edition 为 2024，rust-version 为 1.90 |
| [Cargo.lock](Cargo.lock) | 固定 Rust 依赖解析结果 |
| [build.rs](build.rs) | 调用 `tauri_build::build()`，执行 Tauri 构建期集成 |
| [tauri.conf.json](tauri.conf.json) | 定义应用标识、主窗口、开发地址、前端产物目录及打包公共配置；开发地址为 localhost:3000，产物来自 `../dist` |
| [tauri.linux.conf.json](tauri.linux.conf.json) | Linux 打包目标：AppImage、deb、rpm |
| [tauri.macos.conf.json](tauri.macos.conf.json) | macOS 打包目标：app、dmg；配置最低系统版本和 hardened runtime |
| [tauri.windows.conf.json](tauri.windows.conf.json) | Windows 打包目标：NSIS、MSI；配置安装范围、WebView 安装方式和降级限制 |
| [capabilities/default.json](capabilities/default.json) | 为 main 窗口声明 `core:default` 权限；当前没有业务资源授权模型 |
| [icons/](icons/) | 各平台窗口与安装包图标资源 |

以上描述的是源码配置，不代表各平台已经实际构建或验证。当前公共配置中的 CSP 为 null，也不能据此推断应用已经具备完整安全隔离。

## 通信与状态现状

当前 `lib.rs` 没有注册自定义 command handler，也没有注入业务应用状态。前端没有业务 invoke 调用，因此暂时没有可列出的业务请求、响应或错误 DTO。

| 能力 | 当前状态 |
| --- | --- |
| 项目创建、查询与修改 | 未实现 |
| 持久化与迁移 | 未实现 |
| 业务服务、资源授权与类型化业务错误 | 未实现 |
| 后台任务、取消与结果查询 | 未实现 |
| 业务 event / channel | 未实现 |
| 应用业务状态、连接池与任务注册表 | 未实现 |

## 后续模块的位置

以下目录由[后端规则](AGENTS.md)定义，目前尚未建立：

| 目标位置 | 预期用途 |
| --- | --- |
| `src/state.rs` | 保存应用服务、资源句柄和必要的任务注册表 |
| `src/ipc/` | 定义 command、请求响应 DTO 和边界错误映射 |
| `src/modules/<feature>/` | 按业务组织模型、应用服务、业务错误与必要的存储接口 |
| `src/infrastructure/` | 提供实际存储、文件系统等资源适配 |

预期依赖关系为“IPC → 应用服务 → 领域模型与资源接口或具体适配”，由应用入口组装依赖。单一实现且用途限于本模块时，应用服务可以使用具体适配；多实现、独立复用或跨模块资源需求使用资源接口，跨模块访问仍经过所属模块公开服务。领域模型始终不依赖基础设施，业务公开接口不泄漏存储框架类型。

跨资源一致性由 Rust 应用服务或按需建立的上层编排服务负责，前端组合层仅协调交互和缓存。Rust 持有业务权威状态，前端保存查询缓存与编辑草稿；当前尚无这条业务链路的运行实现。
