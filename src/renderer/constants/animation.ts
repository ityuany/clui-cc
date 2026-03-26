/**
 * Animation constants - 动画常量
 * 统一管理动画时长、缓动函数等
 */

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

export const ANIMATION_DELAY = {
  /** 0ms - 无延迟 */
  NONE: '0ms',
  /** 150ms - 第一个点 */
  DOT_1: '0ms',
  /** 150ms - 第二个点 */
  DOT_2: '150ms',
  /** 300ms - 第三个点 */
  DOT_3: '300ms',
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
