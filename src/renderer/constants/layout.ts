/**
 * Layout constants - 布局常量
 * 统一管理宽度、高度、圆角等
 */

export const WIDTH = {
  /** 内容区域宽度 */
  CONTENT: 460,
  CONTENT_EXPANDED: 700,

  /** 卡片宽度 */
  CARD_EXPANDED: 460,
  CARD_EXPANDED_WIDE: 700,
  CARD_COLLAPSED: 430,
  CARD_COLLAPSED_WIDE: 670,

  /** 侧边栏宽度 */
  SIDEBAR: 240,

  /** 弹窗宽度 */
  POPOVER_SM: 180,
  POPOVER_MD: 192,
  POPOVER_LG: 220,
  POPOVER_XL: 240,
  POPOVER_XXL: 280,

  /** Marketplace 宽度 */
  MARKETPLACE: 720,
} as const

export const HEIGHT = {
  /** 最小高度 */
  MIN_INPUT: 20,
  MIN_TAB_STRIP: 28,
  MIN_INPUT_ROW: 46,
  MIN_BUTTON: 50,

  /** 最大高度 */
  MAX_INPUT: 140,
  MAX_BODY: 400,
  MAX_BODY_EXPANDED: 520,
  MAX_CONVERSATION: 336,
  MAX_CONVERSATION_EXPANDED: 460,
  MAX_MARKETPLACE: 470,
  MAX_CODE_PREVIEW: 80,

  /** 固定高度 */
  STATUS_BAR: 28,
  CARD_MIN: 154,
  EXPANDED_CONTENT: 600,
  COLLAPSED_CONTENT: 12,
} as const

export const BORDER_RADIUS = {
  /** 0 - 无圆角 */
  NONE: 0,
  /** 4px - 小圆角 */
  SM: 4,
  /** 5px - 基础圆角 */
  BASE: 5,
  /** 6px - 中等圆角 */
  MD: 6,
  /** 8px - 较大圆角 */
  LG: 8,
  /** 9px - 大圆角 */
  XL: 9,
  /** 10px - 很大圆角 */
  XXL: 10,
  /** 12px - 特大圆角 */
  XXXL: 12,
  /** 14px - 超大圆角 */
  HUGE: 14,
  /** 20px - 卡片圆角 */
  CARD: 20,
  /** 24px - 面板圆角 */
  PANEL: 24,
  /** 25px - 输入框圆角 */
  INPUT: 25,
  /** 50% - 圆形 */
  CIRCLE: '50%',
  /** 9999px - 胶囊形 */
  PILL: 9999,
} as const

export const MARGIN = {
  /** 卡片边距 */
  CARD_COLLAPSED: 15,
  CARD_BOTTOM: 10,
  CARD_BOTTOM_SHADOW: 10,

  /** 面板边距 */
  PANEL_BOTTOM: 14,
} as const

export const Z_INDEX = {
  /** 基础层 */
  BASE: 10,
  /** 中间层 */
  MIDDLE: 15,
  /** 顶层 */
  TOP: 20,
  /** 面板层 */
  PANEL: 30,
} as const
