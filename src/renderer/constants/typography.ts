/**
 * Typography constants - 字体相关常量
 * 统一管理字体大小、行高、字重等
 */

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
