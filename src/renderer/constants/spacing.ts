/**
 * Spacing constants - 间距常量
 * 统一管理 padding、margin、gap 等
 */

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
