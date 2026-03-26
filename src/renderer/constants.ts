/**
 * Design Constants - 设计常量
 * 统一管理项目中的所有魔法数字和硬编码值
 *
 * 分类：
 * - ANIMATION: 动画相关（时长、缓动、过渡、缩放）
 * - LAYOUT: 布局相关（宽度、高度、圆角、层级、边距）
 * - SPACING: 间距相关（padding、margin、gap）
 * - TYPOGRAPHY: 字体相关（大小、行高、字重）
 * - LIMITS: 限制相关（数量、阈值、轮询间隔）
 */

// ============================================
// 🎬 ANIMATION - 动画常量
// ============================================

export const DURATION = {
  /** 100ms - 极快 */
  INSTANT: 0.1,
  /** 120ms - 很快 */
  FAST: 0.12,
  /** 150ms - 快速 */
  QUICK: 0.15,
  /** 200ms - 常规 */
  NORMAL: 0.2,
  /** 220ms - 中等 */
  MEDIUM: 0.22,
  /** 260ms - 标准 */
  STANDARD: 0.26,
  /** 630ms - 慢速 */
  SLOW: 0.63,
  /** 1000ms - 很慢 */
  VERY_SLOW: 1,
  /** 1500ms - 极慢 */
  ULTRA_SLOW: 1.5,
} as const

export const EASING = {
  /** 标准缓动 - [0.4, 0, 0.1, 1] */
  STANDARD: [0.4, 0, 0.1, 1] as const,
  /** 线性 */
  LINEAR: 'linear' as const,
} as const

export const TRANSITION = {
  /** 标准过渡 - 260ms */
  STANDARD: {
    duration: DURATION.STANDARD,
    ease: EASING.STANDARD,
  } as const,

  /** 快速过渡 - 150ms */
  QUICK: {
    duration: DURATION.QUICK,
  } as const,

  /** 很快过渡 - 120ms */
  FAST: {
    duration: DURATION.FAST,
  } as const,

  /** 极快过渡 - 100ms */
  INSTANT: {
    duration: DURATION.INSTANT,
  } as const,

  /** 中等过渡 - 220ms */
  MEDIUM: {
    duration: DURATION.MEDIUM,
    ease: EASING.STANDARD,
  } as const,
} as const

export const SCALE = {
  /** 0.8 - 缩小 */
  DOWN: 0.8,
  /** 0.85 - 轻微缩小 */
  DOWN_SLIGHT: 0.85,
  /** 0.9 - 很轻微缩小 */
  DOWN_TINY: 0.9,
  /** 0.95 - 极轻微缩小 */
  DOWN_MINIMAL: 0.95,
  /** 0.97 - 几乎不缩小 */
  DOWN_MICRO: 0.97,
  /** 0.98 - 微小缩小 */
  DOWN_NANO: 0.98,
  /** 0.985 - 极微小缩小 */
  DOWN_PICO: 0.985,
  /** 1 - 正常 */
  NORMAL: 1,
} as const

// ============================================
// 📐 LAYOUT - 布局常量
// ============================================

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

// ============================================
// 📏 SPACING - 间距常量
// ============================================

export const SPACING = {
  /** 0px */
  NONE: 0,
  /** 2px - 极小间距 */
  XXS: 2,
  /** 4px - 很小间距 */
  XS: 4,
  /** 6px - 小间距 */
  SM: 6,
  /** 8px - 基础间距 */
  BASE: 8,
  /** 10px - 中等间距 */
  MD: 10,
  /** 12px - 较大间距 */
  LG: 12,
  /** 16px - 大间距 */
  XL: 16,
  /** 20px - 很大间距 */
  XXL: 20,
  /** 24px - 特大间距 */
  XXXL: 24,
  /** 32px - 超大间距 */
  HUGE: 32,
} as const

export const PADDING = {
  /** 按钮内边距 */
  BUTTON_SM: '2px 8px',
  BUTTON_MD: '4px 10px',
  BUTTON_LG: '5px 10px',

  /** 卡片内边距 */
  CARD_SM: '8px 10px',
  CARD_MD: '10px 12px',
  CARD_LG: '12px',

  /** 输入框内边距 */
  INPUT: '0 6px 0 16px',

  /** 弹窗内边距 */
  POPOVER: '12px 18px',
} as const

export const GAP = {
  /** 1px - 极小间隙 */
  XXS: 1,
  /** 1.5px - 很小间隙 */
  XS: 1.5,
  /** 2px - 小间隙 */
  SM: 2,
  /** 4px - 基础间隙 */
  BASE: 4,
  /** 6px - 中等间隙 */
  MD: 6,
  /** 8px - 较大间隙 */
  LG: 8,
  /** 10px - 大间隙 */
  XL: 10,
  /** 16px - 很大间隙 */
  XXL: 16,
  /** 24px - 特大间隙 */
  XXXL: 24,
} as const

// ============================================
// 🔤 TYPOGRAPHY - 字体常量
// ============================================

export const FONT_SIZE = {
  /** 9px - 极小文本（标签、徽章） */
  XS: 9,
  /** 10px - 小文本（次要信息、时间戳） */
  SM: 10,
  /** 11px - 常规小文本（描述、提示） */
  BASE_SM: 11,
  /** 12px - 基础文本（按钮、标签） */
  BASE: 12,
  /** 13px - 中等文本（正文、消息） */
  MD: 13,
  /** 14px - 大文本（输入框、标题） */
  LG: 14,
  /** 15px - 特大文本 */
  XL: 15,
} as const

export const LINE_HEIGHT = {
  /** 1.4 - 紧凑行高 */
  TIGHT: 1.4,
  /** 1.5 - 常规行高 */
  NORMAL: 1.5,
  /** 1.6 - 宽松行高（正文） */
  RELAXED: 1.6,
  /** 20px - 固定行高（输入框） */
  INPUT: '20px',
} as const

export const FONT_WEIGHT = {
  /** 400 - 常规 */
  NORMAL: 400,
  /** 500 - 中等 */
  MEDIUM: 500,
  /** 600 - 半粗 */
  SEMIBOLD: 600,
  /** 700 - 粗体 */
  BOLD: 700,
} as const

export const FONT_FAMILY = {
  /** 系统默认字体 */
  DEFAULT: 'inherit',
  /** 等宽字体（代码） */
  MONO: 'monospace',
} as const

// ============================================
// 🔢 LIMITS - 限制常量
// ============================================

export const MESSAGE_LIMITS = {
  /** 初始渲染消息数量上限 */
  INITIAL_RENDER_CAP: 100,
  /** 分页加载数量 */
  PAGE_SIZE: 100,
  /** 历史消息阈值 */
  HISTORICAL_THRESHOLD: 20,
} as const

export const INPUT_LIMITS = {
  /** 输入框最小高度 */
  MIN_HEIGHT: 20,
  /** 输入框最大高度 */
  MAX_HEIGHT: 140,
  /** 多行模式进入阈值 */
  MULTILINE_ENTER_HEIGHT: 52,
  /** 多行模式退出阈值 */
  MULTILINE_EXIT_HEIGHT: 50,
  /** 内联控件预留宽度 */
  INLINE_CONTROLS_RESERVED_WIDTH: 104,
} as const

export const SCROLL_LIMITS = {
  /** 接近底部的阈值（px） */
  NEAR_BOTTOM_THRESHOLD: 60,
} as const

export const TEXT_LIMITS = {
  /** 标签页标题最大宽度 */
  TAB_TITLE_MAX_WIDTH: 160,
  /** 工具描述截断长度 */
  TOOL_DESC_TRUNCATE: 60,
  /** 错误消息截断长度 */
  ERROR_TRUNCATE: 100,
  /** 文件名截断长度 */
  FILENAME_TRUNCATE: 30,
} as const

export const MARKETPLACE_LIMITS = {
  /** 每次批量操作最大数量 */
  MAX_BATCH_SIZE: 25,
  /** 标签显示数量（折叠状态） */
  COLLAPSED_TAGS_COUNT: 2,
} as const

export const AUDIO_LIMITS = {
  /** 最小音量阈值（RMS） */
  MIN_RMS_THRESHOLD: 0.003,
  /** 最大增益 */
  MAX_GAIN: 8,
  /** 目标峰值 */
  TARGET_PEAK: 0.95,
  /** 最小峰值 */
  MIN_PEAK: 0.0001,
  /** 采样率 */
  SAMPLE_RATE: 16000,
} as const

export const POLLING_INTERVALS = {
  /** 健康检查轮询间隔（ms） */
  HEALTH_CHECK: 1500,
  /** 防抖延迟（ms） */
  DEBOUNCE_SEARCH: 200,
} as const
