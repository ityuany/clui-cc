# 常量系统 (Constants System)

统一管理项目中的魔法数字、硬编码值，提高代码可维护性和一致性。

## 📁 文件结构

```
src/renderer/constants/
├── index.ts              # 统一导出
├── animation.ts          # 动画相关常量
├── layout.ts             # 布局相关常量
├── spacing.ts            # 间距相关常量
├── typography.ts         # 字体相关常量
├── limits.ts             # 限制相关常量
├── USAGE_EXAMPLES.ts     # 使用示例
└── README.md             # 本文档
```

## 🎯 设计原则

### 1. **语义化命名**
```typescript
// ❌ 不好
const SIZE_1 = 12
const SIZE_2 = 14

// ✅ 好
const FONT_SIZE = {
  BASE: 12,
  LG: 14,
}
```

### 2. **分类清晰**
- `animation.ts` - 动画时长、缓动函数
- `layout.ts` - 宽度、高度、圆角、层级
- `spacing.ts` - 内边距、外边距、间隙
- `typography.ts` - 字体大小、行高、字重
- `limits.ts` - 数量限制、阈值

### 3. **类型安全**
```typescript
// 使用 const assertions 确保类型推断
export const FONT_SIZE = {
  SM: 10,
  BASE: 12,
  LG: 14,
} as const

// TypeScript 会推断为：
// {
//   readonly SM: 10;
//   readonly BASE: 12;
//   readonly LG: 14;
// }
```

### 4. **易于扩展**
```typescript
// 添加新常量很简单
export const FONT_SIZE = {
  // ... 现有常量
  XXL: 16, // 新增
} as const
```

## 📖 使用指南

### 基础用法

```typescript
// 1. 导入需要的常量
import { FONT_SIZE, SPACING, BORDER_RADIUS } from '@/constants'

// 2. 在组件中使用
<div style={{
  fontSize: FONT_SIZE.MD,
  padding: SPACING.LG,
  borderRadius: BORDER_RADIUS.HUGE,
}}>
  Hello World
</div>
```

### 解构使用

```typescript
import { MESSAGE_LIMITS } from '@/constants'

// 解构出需要的值
const { INITIAL_RENDER_CAP, PAGE_SIZE } = MESSAGE_LIMITS

// 使用
const visibleMessages = messages.slice(0, INITIAL_RENDER_CAP)
```

### 组合使用

```typescript
import { FONT_SIZE, FONT_WEIGHT, PADDING, BORDER_RADIUS } from '@/constants'

// 创建可复用的样式对象
const buttonStyles = {
  fontSize: FONT_SIZE.BASE,
  fontWeight: FONT_WEIGHT.SEMIBOLD,
  padding: PADDING.BUTTON_MD,
  borderRadius: BORDER_RADIUS.LG,
}
```

## 📚 常量分类详解

### 🎬 Animation (动画)

```typescript
import { DURATION, EASING, TRANSITION, SCALE } from '@/constants'

// 动画时长
DURATION.INSTANT    // 0.1s - 极快
DURATION.FAST       // 0.12s - 很快
DURATION.QUICK      // 0.15s - 快速
DURATION.STANDARD   // 0.26s - 标准

// 缓动函数
EASING.STANDARD     // [0.4, 0, 0.1, 1]
EASING.LINEAR       // 'linear'

// 预设过渡
TRANSITION.STANDARD // { duration: 0.26, ease: [0.4, 0, 0.1, 1] }
TRANSITION.QUICK    // { duration: 0.15 }

// 缩放比例
SCALE.DOWN          // 0.8
SCALE.NORMAL        // 1
```

### 📐 Layout (布局)

```typescript
import { WIDTH, HEIGHT, BORDER_RADIUS, Z_INDEX } from '@/constants'

// 宽度
WIDTH.CONTENT              // 460
WIDTH.CONTENT_EXPANDED     // 700
WIDTH.SIDEBAR              // 240

// 高度
HEIGHT.MIN_INPUT           // 20
HEIGHT.MAX_INPUT           // 140
HEIGHT.STATUS_BAR          // 28

// 圆角
BORDER_RADIUS.SM           // 4
BORDER_RADIUS.CARD         // 20
BORDER_RADIUS.PILL         // 9999
BORDER_RADIUS.CIRCLE       // '50%'

// 层级
Z_INDEX.BASE               // 10
Z_INDEX.PANEL              // 30
```

### 📏 Spacing (间距)

```typescript
import { SPACING, PADDING, GAP } from '@/constants'

// 基础间距
SPACING.XS          // 4
SPACING.BASE        // 8
SPACING.LG          // 12
SPACING.XL          // 16

// 预设内边距
PADDING.BUTTON_MD   // '4px 10px'
PADDING.CARD_LG     // '12px'
PADDING.INPUT       // '0 6px 0 16px'

// 间隙
GAP.SM              // 2
GAP.BASE            // 4
GAP.LG              // 8
```

### 🔤 Typography (字体)

```typescript
import { FONT_SIZE, LINE_HEIGHT, FONT_WEIGHT } from '@/constants'

// 字体大小
FONT_SIZE.XS        // 9
FONT_SIZE.BASE      // 12
FONT_SIZE.MD        // 13
FONT_SIZE.LG        // 14

// 行高
LINE_HEIGHT.TIGHT   // 1.4
LINE_HEIGHT.NORMAL  // 1.5
LINE_HEIGHT.RELAXED // 1.6

// 字重
FONT_WEIGHT.NORMAL  // 400
FONT_WEIGHT.MEDIUM  // 500
FONT_WEIGHT.SEMIBOLD // 600
```

### 🔢 Limits (限制)

```typescript
import {
  MESSAGE_LIMITS,
  INPUT_LIMITS,
  SCROLL_LIMITS,
  POLLING_INTERVALS
} from '@/constants'

// 消息限制
MESSAGE_LIMITS.INITIAL_RENDER_CAP  // 100
MESSAGE_LIMITS.PAGE_SIZE           // 100

// 输入限制
INPUT_LIMITS.MIN_HEIGHT            // 20
INPUT_LIMITS.MAX_HEIGHT            // 140

// 滚动限制
SCROLL_LIMITS.NEAR_BOTTOM_THRESHOLD // 60

// 轮询间隔
POLLING_INTERVALS.HEALTH_CHECK     // 1500ms
```

## 🔄 迁移指南

### 步骤 1: 识别魔法数字

```typescript
// ❌ 重构前
<div style={{ fontSize: 13, padding: 12, borderRadius: 14 }}>
```

### 步骤 2: 导入对应常量

```typescript
import { FONT_SIZE, SPACING, BORDER_RADIUS } from '@/constants'
```

### 步骤 3: 替换为常量

```typescript
// ✅ 重构后
<div style={{
  fontSize: FONT_SIZE.MD,
  padding: SPACING.LG,
  borderRadius: BORDER_RADIUS.HUGE
}}>
```

## 💡 最佳实践

### ✅ 推荐做法

```typescript
// 1. 使用语义化的常量名
fontSize: FONT_SIZE.MD  // 而不是 FONT_SIZE.SIZE_13

// 2. 组合使用创建可复用样式
const cardStyle = {
  padding: SPACING.LG,
  borderRadius: BORDER_RADIUS.CARD,
  gap: GAP.MD,
}

// 3. 在组件顶部集中导入
import { FONT_SIZE, SPACING, TRANSITION } from '@/constants'

// 4. 使用解构简化代码
const { MD, LG } = FONT_SIZE
```

### ❌ 避免做法

```typescript
// 1. 不要混用常量和魔法数字
fontSize: FONT_SIZE.MD,
padding: 12,  // ❌ 应该用 SPACING.LG

// 2. 不要创建不必要的中间变量
const myFontSize = FONT_SIZE.MD  // ❌ 直接用 FONT_SIZE.MD

// 3. 不要在常量文件中做计算
export const DOUBLE_SPACING = SPACING.BASE * 2  // ❌ 应该定义新常量
```

## 🎨 实际案例

### 案例 1: 重构按钮组件

```typescript
// 重构前
<button style={{
  fontSize: 12,
  fontWeight: 600,
  padding: '4px 10px',
  borderRadius: 8,
}}>

// 重构后
import { FONT_SIZE, FONT_WEIGHT, PADDING, BORDER_RADIUS } from '@/constants'

<button style={{
  fontSize: FONT_SIZE.BASE,
  fontWeight: FONT_WEIGHT.SEMIBOLD,
  padding: PADDING.BUTTON_MD,
  borderRadius: BORDER_RADIUS.LG,
}}>
```

### 案例 2: 重构动画

```typescript
// 重构前
<motion.div
  transition={{ duration: 0.26, ease: [0.4, 0, 0.1, 1] }}
>

// 重构后
import { TRANSITION } from '@/constants'

<motion.div
  transition={TRANSITION.STANDARD}
>
```

### 案例 3: 重构布局

```typescript
// 重构前
const contentWidth = expandedUI ? 700 : 460

// 重构后
import { WIDTH } from '@/constants'

const contentWidth = expandedUI
  ? WIDTH.CONTENT_EXPANDED
  : WIDTH.CONTENT
```

## 🚀 下一步

1. **逐步迁移**: 从最常用的组件开始
2. **团队对齐**: 确保团队成员了解新的常量系统
3. **持续优化**: 发现新的魔法数字时及时添加到常量文件
4. **文档更新**: 添加新常量时更新本文档

## 📝 贡献指南

添加新常量时，请遵循以下规范：

1. **选择正确的文件**: 根据常量类型放入对应文件
2. **使用语义化命名**: 名称应该清晰表达用途
3. **添加注释**: 复杂的常量需要添加说明
4. **保持一致性**: 遵循现有的命名和组织方式
5. **更新文档**: 在 README 中添加使用说明

```typescript
// 示例：添加新的字体大小
export const FONT_SIZE = {
  // ... 现有常量

  /** 18px - 超大标题 */
  XXL: 18,
} as const
```

## 🔗 相关资源

- [主题系统](../theme.ts) - 颜色常量
- [类型定义](../../shared/types.ts) - TypeScript 类型
- [使用示例](./USAGE_EXAMPLES.ts) - 更多示例代码
