/**
 * Limits constants - 限制常量
 * 统一管理各种数量、大小限制
 */

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
