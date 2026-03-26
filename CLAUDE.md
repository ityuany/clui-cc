# clui-cc

## 项目信息

- 包管理器：`npm`（lock 文件：`package-lock.json`）

## 架构

三个 Electron 进程，严格隔离：

- **main** (`src/main/`) — Node.js：应用生命周期、IPC 服务器、Claude 子进程、插件
- **renderer** (`src/renderer/`) — React 19 + Zustand + Tailwind：所有 UI
- **preload** (`src/preload/`) — context bridge，通过 `window.clui` 暴露 API
- **shared** (`src/shared/`) — main/renderer 共享的类型定义（`types.ts`）

IPC：传统 Electron IPC（`ipcMain`/`ipcRenderer`），通道名定义在 `src/shared/types.ts` 的 `IPC` 常量对象中，renderer 通过 `window.clui.*` 调用（预加载层封装）

## 进程边界

- **禁止**在 renderer 代码中导入 `src/main/`，反之亦然
- **禁止**在 renderer 代码中导入 `electron`
- 唯一的共享代码存放于 `src/shared/`
- electron-vite 在构建时强制检查——违反会导致难以排查的错误

## 新增 IPC 方法

1. 在 `src/shared/types.ts` 的 `IPC` 常量中添加通道名
2. 在 `src/preload/index.ts` 中暴露对应的 `window.clui.<method>` 方法
3. 在 `src/main/index.ts` 中用 `ipcMain.handle` 或 `ipcMain.on` 注册处理器
4. 在 renderer 中通过 `window.clui.<method>()` 调用

## Renderer 状态管理

- store 使用：`create<State>((set, get) => ({ ... }))`
- 当前只有一个核心 store：`src/renderer/stores/sessionStore.ts`
- 主题状态单独管理：`src/renderer/theme.ts`

## 常用命令

- `npm run dev` — 启动开发服务器（热重载）
- `npm run build` — 构建生产包
- `npm run dist` — 构建 macOS 安装包

## 代码规范

- 提交信息：Conventional Commits 格式（`feat:`、`fix:`、`chore:`）
- renderer 代码使用相对路径导入（不使用 `@/` 别名）
- 调试日志：使用 `src/main/logger.ts` 中的 `log(tag, msg)` 函数，日志写入 `~/.clui-debug.log`
- 类型校验：所有共享类型定义在 `src/shared/types.ts`

## 库选型（不要建议替代方案）

- 动画：`framer-motion`
- 图标：`@phosphor-icons/react`
- 状态管理：`zustand`
- Markdown 渲染：`react-markdown` + `remark-gfm`
- Tailwind CSS 4（CSS 优先配置，`@import "tailwindcss"` 方式，无 tailwind.config.js）
- PTY：`node-pty`

## 设计背景

### 目标用户

每天使用 AI 辅助编程工具的专业开发者。他们重视效率、速度和掌控感。界面应传递**自信与专注**——永远不要成为阻碍，始终给人快速的感觉。

### 品牌个性

**极简、克制、优雅。** 低调的精致感，类似 iA Writer 或 Things。亮粉色主色调（`#fa216e`）在克制的中性色背景中提供唯一的醒目点缀。

### 美学方向

- **视觉基调：** 干净、宽松、低对比度的界面，精准的字体排版，微妙的层次感。需要时信息密度高，但绝不杂乱。
- **参考：** Claude/ChatGPT 对话式 AI 界面——干净的聊天布局，清晰的消息层次，充裕的留白，可读的 markdown 渲染。
- **反面参考：** 过度装饰的 UI、厚重的渐变、游戏化元素、霓虹/赛博朋克风格。
- **主题：** 完整的亮色/暗色模式。亮色使用冷灰蓝（`#f5f7fa`）背景；暗色使用近黑色中性色。两种主题共享 `#fa216e` 强调色。
- **Logo：** 几何角形箭头标志——锐利、抽象、黑白色。契合极简品牌气质。

### 设计原则

1. **沉静的自信** — UI 应给人平静而有力的感觉。避免视觉噪音、多余的边框和相互竞争的视觉焦点。让内容自由呼吸。
2. **开发者优先的信息密度** — 珍视屏幕空间。在需要时提供高密度信息（代码、diff、终端），同时保持聊天界面的对话感和空间感。
3. **一个强调色，克制使用** — `#fa216e` 是唯一的品牌色。仅用于主要操作和关键交互状态，其余保持中性。
4. **有意义的动效** — 动画应引导和告知，而非装饰。使用 `framer-motion` 实现帮助用户跟踪状态变化的过渡效果。
5. **一致的基础组件** — 在所有功能中保持一致的间距、圆角和 token 使用。
