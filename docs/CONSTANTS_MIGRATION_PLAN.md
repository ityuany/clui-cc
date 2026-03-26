# 常量提取迁移计划

## 📊 当前状态分析

### 魔法数字统计
- **字体大小**: ~50+ 处硬编码
- **间距值**: ~52 处 padding 硬编码
- **圆角值**: ~20+ 处 borderRadius 硬编码
- **动画时长**: ~15+ 处 duration 硬编码
- **布局尺寸**: ~10+ 处宽高硬编码

### 影响范围
- 总代码行数: ~5,573 行
- TypeScript 文件: 20 个
- 需要重构的组件: 13 个

## 🎯 迁移策略

### 阶段 1: 基础设施（已完成 ✅）
- [x] 创建常量文件结构
- [x] 定义所有常量分类
- [x] 编写文档和示例
- [x] 提交到代码库

### 阶段 2: 核心组件迁移（优先级：高）

#### 2.1 App.tsx
**影响**: 整个应用的布局基础
**工作量**: 1-2 小时
**替换项**:
```typescript
// 动画
const TRANSITION = { duration: 0.26, ease: [0.4, 0, 0.1, 1] }
→ import { TRANSITION } from './constants'

// 布局
width: 720, height: 470, borderRadius: 24
→ WIDTH.MARKETPLACE, HEIGHT.MAX_MARKETPLACE, BORDER_RADIUS.PANEL

// 层级
zIndex: 30, zIndex: 20, zIndex: 15
→ Z_INDEX.PANEL, Z_INDEX.TOP, Z_INDEX.MIDDLE
```

#### 2.2 conversation-view.tsx (852 行)
**影响**: 消息显示核心
**工作量**: 2-3 小时
**替换项**:
```typescript
// 限制
const INITIAL_RENDER_CAP = 100
const PAGE_SIZE = 100
→ MESSAGE_LIMITS.INITIAL_RENDER_CAP, MESSAGE_LIMITS.PAGE_SIZE

// 字体
fontSize: 11, fontSize: 13
→ FONT_SIZE.BASE_SM, FONT_SIZE.MD

// 圆角
borderRadius: '14px 14px 4px 14px'
→ 可以定义为 BORDER_RADIUS.MESSAGE_BUBBLE
```

#### 2.3 input-bar.tsx (709 行)
**影响**: 用户输入核心
**工作量**: 2-3 小时
**替换项**:
```typescript
// 输入限制
const INPUT_MIN_HEIGHT = 20
const INPUT_MAX_HEIGHT = 140
→ INPUT_LIMITS.MIN_HEIGHT, INPUT_LIMITS.MAX_HEIGHT

// 字体
fontSize: 14, lineHeight: '20px'
→ FONT_SIZE.LG, LINE_HEIGHT.INPUT

// 动画
transition={{ duration: 0.1 }}
→ TRANSITION.INSTANT
```

### 阶段 3: UI 组件迁移（优先级：中）

#### 3.1 marketplace-panel.tsx (701 行)
**工作量**: 2-3 小时
**替换项**: 字体大小、间距、圆角

#### 3.2 status-bar.tsx (608 行)
**工作量**: 1-2 小时
**替换项**: 字体大小、弹窗尺寸

#### 3.3 api-config-popover.tsx (447 行)
**工作量**: 1-2 小时
**替换项**: 字体大小、按钮样式、圆角

### 阶段 4: 小组件迁移（优先级：低）

#### 4.1 settings-popover.tsx (230 行)
**工作量**: 30 分钟

#### 4.2 permission-card.tsx (191 行)
**工作量**: 30 分钟

#### 4.3 history-picker.tsx (187 行)
**工作量**: 30 分钟

#### 4.4 其他小组件
- tab-strip.tsx (132 行) - 30 分钟
- slash-command-menu.tsx (137 行) - 30 分钟
- attachment-chips.tsx (87 行) - 20 分钟
- permission-denied-card.tsx (130 行) - 20 分钟
- popover-layer.tsx (50 行) - 10 分钟

### 阶段 5: Hooks 和 Stores（优先级：低）

#### 5.1 use-health-reconciliation.ts
**工作量**: 10 分钟
```typescript
const HEALTH_POLL_INTERVAL_MS = 1500
→ POLLING_INTERVALS.HEALTH_CHECK
```

#### 5.2 session-store.ts (898 行)
**工作量**: 1 小时
**替换项**: 主要是一些阈值和限制

## 📅 时间估算

| 阶段 | 组件数 | 预计时间 | 累计时间 |
|------|--------|----------|----------|
| 阶段 1 | - | 已完成 | - |
| 阶段 2 | 3 | 5-8 小时 | 5-8 小时 |
| 阶段 3 | 3 | 4-7 小时 | 9-15 小时 |
| 阶段 4 | 7 | 3-4 小时 | 12-19 小时 |
| 阶段 5 | 2 | 1-2 小时 | 13-21 小时 |

**总计**: 约 13-21 小时（2-3 个工作日）

## 🔄 迁移流程

### 单个组件迁移步骤

1. **准备阶段**
   ```bash
   # 创建新分支
   git checkout -b refactor/constants-component-name
   ```

2. **识别阶段**
   ```bash
   # 查找魔法数字
   grep -n "fontSize.*[0-9]" src/renderer/components/component-name.tsx
   grep -n "padding.*[0-9]" src/renderer/components/component-name.tsx
   grep -n "borderRadius.*[0-9]" src/renderer/components/component-name.tsx
   ```

3. **替换阶段**
   ```typescript
   // 1. 添加导入
   import { FONT_SIZE, SPACING, BORDER_RADIUS, TRANSITION } from '@/constants'

   // 2. 逐个替换
   fontSize: 13 → fontSize: FONT_SIZE.MD
   padding: 12 → padding: SPACING.LG
   borderRadius: 14 → borderRadius: BORDER_RADIUS.HUGE
   ```

4. **测试阶段**
   ```bash
   # 构建测试
   npm run build

   # 视觉测试
   npm run dev
   ```

5. **提交阶段**
   ```bash
   git add .
   git commit -m "refactor(component-name): 使用常量替换魔法数字"
   ```

## 🎨 迁移示例

### 示例 1: 简单替换

```typescript
// ❌ 重构前
<div style={{
  fontSize: 13,
  padding: 12,
  borderRadius: 14,
}}>

// ✅ 重构后
import { FONT_SIZE, SPACING, BORDER_RADIUS } from '@/constants'

<div style={{
  fontSize: FONT_SIZE.MD,
  padding: SPACING.LG,
  borderRadius: BORDER_RADIUS.HUGE,
}}>
```

### 示例 2: 动画替换

```typescript
// ❌ 重构前
<motion.div
  transition={{ duration: 0.26, ease: [0.4, 0, 0.1, 1] }}
>

// ✅ 重构后
import { TRANSITION } from '@/constants'

<motion.div
  transition={TRANSITION.STANDARD}
>
```

### 示例 3: 条件表达式

```typescript
// ❌ 重构前
const width = expandedUI ? 700 : 460

// ✅ 重构后
import { WIDTH } from '@/constants'

const width = expandedUI ? WIDTH.CONTENT_EXPANDED : WIDTH.CONTENT
```

## ⚠️ 注意事项

### 1. 不要过度抽象
```typescript
// ❌ 不好 - 过度抽象
const MY_CUSTOM_SIZE = FONT_SIZE.MD

// ✅ 好 - 直接使用
fontSize: FONT_SIZE.MD
```

### 2. 保持语义化
```typescript
// ❌ 不好 - 失去语义
fontSize: FONT_SIZE.SIZE_13

// ✅ 好 - 保持语义
fontSize: FONT_SIZE.MD  // 13px
```

### 3. 特殊值处理
```typescript
// 某些特殊的、一次性的值可以保留
// 例如：特定的动画延迟、特殊的布局计算等
const specialOffset = 3.5  // 保留，因为这是特定计算结果
```

### 4. 渐进式迁移
- 不要一次性重构所有文件
- 每次重构一个组件
- 每次提交都要测试
- 保持代码可回滚

## 📈 进度追踪

### 已完成 ✅
- [x] 常量系统基础设施
- [x] 文档和示例

### 进行中 🚧
- [ ] App.tsx 迁移
- [ ] conversation-view.tsx 迁移
- [ ] input-bar.tsx 迁移

### 待开始 📋
- [ ] marketplace-panel.tsx
- [ ] status-bar.tsx
- [ ] api-config-popover.tsx
- [ ] 其他小组件
- [ ] Hooks 和 Stores

## 🎯 成功标准

迁移完成后应该达到：

1. **零魔法数字**: 所有硬编码的数字都被常量替换
2. **构建通过**: `npm run build` 无错误
3. **视觉一致**: UI 外观与迁移前完全一致
4. **类型安全**: TypeScript 无类型错误
5. **文档完整**: 所有新增常量都有注释

## 🚀 下一步行动

1. **立即开始**: 从 App.tsx 开始迁移（影响最大）
2. **每日目标**: 完成 2-3 个组件
3. **持续集成**: 每完成一个组件就提交
4. **团队同步**: 定期更新进度，避免冲突

## 📞 需要帮助？

如果在迁移过程中遇到问题：
1. 查看 `constants/README.md` 文档
2. 参考 `constants/USAGE_EXAMPLES.ts` 示例
3. 查看 `app-refactored-example.tsx` 实际案例
