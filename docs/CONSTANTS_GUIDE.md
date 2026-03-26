# 常量系统使用指南

## 📖 快速开始

所有设计常量都在 `src/renderer/constants.ts` 文件中统一管理。

### 基础用法

```typescript
// 导入需要的常量
import { FONT_SIZE, SPACING, BORDER_RADIUS, TRANSITION } from './constants'

// 在组件中使用
<div style={{
  fontSize: FONT_SIZE.MD,           // 13px
  padding: SPACING.LG,              // 12px
  borderRadius: BORDER_RADIUS.HUGE, // 14px
}}>
  Hello World
</div>

// 动画中使用
<motion.div transition={TRANSITION.STANDARD}>
  Content
</motion.div>
```

## 📚 常量分类

### 🎬 ANIMATION - 动画

```typescript
// 时长
DURATION.INSTANT    // 0.1s
DURATION.FAST       // 0.12s
DURATION.QUICK      // 0.15s
DURATION.STANDARD   // 0.26s

// 缓动
EASING.STANDARD     // [0.4, 0, 0.1, 1]
EASING.LINEAR       // 'linear'

// 预设过渡
TRANSITION.STANDARD // { duration: 0.26, ease: [0.4, 0, 0.1, 1] }
TRANSITION.QUICK    // { duration: 0.15 }
TRANSITION.FAST     // { duration: 0.12 }

// 缩放
SCALE.DOWN          // 0.8
SCALE.NORMAL        // 1
```

### 📐 LAYOUT - 布局

```typescript
// 宽度
WIDTH.CONTENT              // 460
WIDTH.CONTENT_EXPANDED     // 700
WIDTH.SIDEBAR              // 240
WIDTH.MARKETPLACE          // 720

// 高度
HEIGHT.MIN_INPUT           // 20
HEIGHT.MAX_INPUT           // 140
HEIGHT.STATUS_BAR          // 28
HEIGHT.MAX_MARKETPLACE     // 470

// 圆角
BORDER_RADIUS.SM           // 4
BORDER_RADIUS.LG           // 8
BORDER_RADIUS.CARD         // 20
BORDER_RADIUS.PANEL        // 24
BORDER_RADIUS.PILL         // 9999
BORDER_RADIUS.CIRCLE       // '50%'

// 层级
Z_INDEX.BASE               // 10
Z_INDEX.MIDDLE             // 15
Z_INDEX.TOP                // 20
Z_INDEX.PANEL              // 30
```

### 📏 SPACING - 间距

```typescript
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

### 🔤 TYPOGRAPHY - 字体

```typescript
// 字体大小
FONT_SIZE.XS        // 9
FONT_SIZE.SM        // 10
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

### 🔢 LIMITS - 限制

```typescript
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
POLLING_INTERVALS.DEBOUNCE_SEARCH  // 200ms
```

## 🔄 重构示例

### 示例 1: 基础样式

```typescript
// ❌ 重构前
<div style={{
  fontSize: 13,
  padding: 12,
  borderRadius: 14,
}}>

// ✅ 重构后
import { FONT_SIZE, SPACING, BORDER_RADIUS } from './constants'

<div style={{
  fontSize: FONT_SIZE.MD,
  padding: SPACING.LG,
  borderRadius: BORDER_RADIUS.HUGE,
}}>
```

### 示例 2: 动画

```typescript
// ❌ 重构前
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.26, ease: [0.4, 0, 0.1, 1] }}
>

// ✅ 重构后
import { SCALE, TRANSITION } from './constants'

<motion.div
  initial={{ opacity: 0, scale: SCALE.DOWN }}
  animate={{ opacity: 1, scale: SCALE.NORMAL }}
  transition={TRANSITION.STANDARD}
>
```

### 示例 3: 条件布局

```typescript
// ❌ 重构前
const contentWidth = expandedUI ? 700 : 460
const cardWidth = expandedUI ? 700 : 460

// ✅ 重构后
import { WIDTH } from './constants'

const contentWidth = expandedUI ? WIDTH.CONTENT_EXPANDED : WIDTH.CONTENT
const cardWidth = expandedUI ? WIDTH.CARD_EXPANDED_WIDE : WIDTH.CARD_EXPANDED
```

### 示例 4: 组合使用

```typescript
import { FONT_SIZE, FONT_WEIGHT, PADDING, BORDER_RADIUS } from './constants'

// 创建可复用的样式对象
const buttonStyles = {
  fontSize: FONT_SIZE.BASE,
  fontWeight: FONT_WEIGHT.SEMIBOLD,
  padding: PADDING.BUTTON_MD,
  borderRadius: BORDER_RADIUS.LG,
}

<button style={buttonStyles}>Click me</button>
```

## 💡 最佳实践

### ✅ 推荐

```typescript
// 1. 使用语义化的常量名
fontSize: FONT_SIZE.MD  // 而不是直接写 13

// 2. 组合使用创建可复用样式
const cardStyle = {
  padding: SPACING.LG,
  borderRadius: BORDER_RADIUS.CARD,
  gap: GAP.MD,
}

// 3. 在文件顶部集中导入
import { FONT_SIZE, SPACING, TRANSITION } from './constants'

// 4. 使用解构简化代码
const { MD, LG } = FONT_SIZE
```

### ❌ 避免

```typescript
// 1. 不要混用常量和魔法数字
fontSize: FONT_SIZE.MD,
padding: 12,  // ❌ 应该用 SPACING.LG

// 2. 不要创建不必要的中间变量
const myFontSize = FONT_SIZE.MD  // ❌ 直接用 FONT_SIZE.MD

// 3. 不要在常量文件中做计算
export const DOUBLE_SPACING = SPACING.BASE * 2  // ❌ 应该定义新常量
```

## 🎯 迁移步骤

1. **识别魔法数字**
   ```bash
   grep -n "fontSize.*[0-9]" src/renderer/components/your-component.tsx
   ```

2. **导入对应常量**
   ```typescript
   import { FONT_SIZE, SPACING, BORDER_RADIUS } from './constants'
   ```

3. **替换为常量**
   ```typescript
   fontSize: 13 → fontSize: FONT_SIZE.MD
   padding: 12 → padding: SPACING.LG
   ```

4. **测试验证**
   ```bash
   npm run build
   npm run dev
   ```

## 📝 添加新常量

如果需要添加新常量，请遵循以下规范：

1. **选择正确的分类** - 放入对应的常量组
2. **使用语义化命名** - 名称应该清晰表达用途
3. **添加注释** - 说明用途和具体数值
4. **保持一致性** - 遵循现有的命名和组织方式

```typescript
// 示例：添加新的字体大小
export const FONT_SIZE = {
  // ... 现有常量

  /** 18px - 超大标题 */
  XXL: 18,
} as const
```

## 🔗 相关资源

- [主题系统](./theme.ts) - 颜色常量
- [类型定义](../shared/types.ts) - TypeScript 类型
