/**
 * 使用常量重构示例
 *
 * 这个文件展示了如何使用新的常量系统重构现有代码
 */

// ❌ 重构前 - app.tsx
const TRANSITION_OLD = { duration: 0.26, ease: [0.4, 0, 0.1, 1] as const }

// ✅ 重构后
import { TRANSITION } from './constants'
const TRANSITION_NEW = TRANSITION.STANDARD

// ========================================

// ❌ 重构前 - conversation-view.tsx
const INITIAL_RENDER_CAP = 100
const PAGE_SIZE = 100

// ✅ 重构后
import { MESSAGE_LIMITS } from './constants'
const { INITIAL_RENDER_CAP, PAGE_SIZE } = MESSAGE_LIMITS

// ========================================

// ❌ 重构前 - input-bar.tsx
const INPUT_MIN_HEIGHT = 20
const INPUT_MAX_HEIGHT = 140
const MULTILINE_ENTER_HEIGHT = 52

// ✅ 重构后
import { INPUT_LIMITS } from './constants'
const { MIN_HEIGHT, MAX_HEIGHT, MULTILINE_ENTER_HEIGHT } = INPUT_LIMITS

// ========================================

// ❌ 重构前 - 内联样式
<div style={{
  fontSize: 13,
  fontWeight: 600,
  padding: '12px',
  borderRadius: 14,
  gap: 8
}}>

// ✅ 重构后
import { FONT_SIZE, FONT_WEIGHT, SPACING, BORDER_RADIUS, GAP } from './constants'

<div style={{
  fontSize: FONT_SIZE.MD,
  fontWeight: FONT_WEIGHT.SEMIBOLD,
  padding: SPACING.LG,
  borderRadius: BORDER_RADIUS.HUGE,
  gap: GAP.LG
}}>

// ========================================

// ❌ 重构前 - motion 动画
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.8 }}
  transition={{ duration: 0.1 }}
>

// ✅ 重构后
import { SCALE, TRANSITION } from './constants'

<motion.div
  initial={{ opacity: 0, scale: SCALE.DOWN }}
  animate={{ opacity: 1, scale: SCALE.NORMAL }}
  exit={{ opacity: 0, scale: SCALE.DOWN }}
  transition={TRANSITION.INSTANT}
>

// ========================================

// ❌ 重构前 - 布局尺寸
const contentWidth = expandedUI ? 700 : 460
const cardExpandedWidth = expandedUI ? 700 : 460
const cardCollapsedWidth = expandedUI ? 670 : 430

// ✅ 重构后
import { WIDTH } from './constants'

const contentWidth = expandedUI ? WIDTH.CONTENT_EXPANDED : WIDTH.CONTENT
const cardExpandedWidth = expandedUI ? WIDTH.CARD_EXPANDED_WIDE : WIDTH.CARD_EXPANDED
const cardCollapsedWidth = expandedUI ? WIDTH.CARD_COLLAPSED_WIDE : WIDTH.CARD_COLLAPSED

// ========================================

// ❌ 重构前 - 轮询间隔
const HEALTH_POLL_INTERVAL_MS = 1500

// ✅ 重构后
import { POLLING_INTERVALS } from './constants'
const HEALTH_POLL_INTERVAL_MS = POLLING_INTERVALS.HEALTH_CHECK

// ========================================

// ❌ 重构前 - 滚动阈值
isNearBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 60

// ✅ 重构后
import { SCROLL_LIMITS } from './constants'
isNearBottomRef.current =
  el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_LIMITS.NEAR_BOTTOM_THRESHOLD

// ========================================

// 🎨 组合使用示例 - 创建一致的按钮样式

import { FONT_SIZE, FONT_WEIGHT, PADDING, BORDER_RADIUS, TRANSITION } from './constants'

const buttonStyles = {
  small: {
    fontSize: FONT_SIZE.XS,
    fontWeight: FONT_WEIGHT.MEDIUM,
    padding: PADDING.BUTTON_SM,
    borderRadius: BORDER_RADIUS.LG,
  },
  medium: {
    fontSize: FONT_SIZE.BASE,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    padding: PADDING.BUTTON_MD,
    borderRadius: BORDER_RADIUS.LG,
  },
  large: {
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    padding: PADDING.BUTTON_LG,
    borderRadius: BORDER_RADIUS.XL,
  },
}

// 使用
<button style={buttonStyles.medium}>Click me</button>

// ========================================

// 🎨 组合使用示例 - 创建一致的卡片样式

import { SPACING, BORDER_RADIUS, GAP } from './constants'

const cardStyles = {
  container: {
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.HUGE,
    gap: GAP.MD,
  },
  header: {
    marginBottom: SPACING.BASE,
  },
  content: {
    gap: GAP.SM,
  },
}

// ========================================

// 💡 TypeScript 类型安全

// 所有常量都是 const assertions，提供完整的类型推断
import { FONT_SIZE } from './constants'

// ✅ 类型安全
const size: number = FONT_SIZE.MD // 13

// ✅ 自动补全
FONT_SIZE. // IDE 会提示所有可用的字体大小

// ========================================

// 📦 按需导入

// 只导入需要的常量
import { FONT_SIZE, SPACING } from './constants'

// 或导入整个分类
import { TYPOGRAPHY } from './constants/typography'
import { LAYOUT } from './constants/layout'
