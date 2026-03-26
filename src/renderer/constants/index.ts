/**
 * Constants barrel export
 * 统一导出所有常量
 */

export * from './typography'
export * from './spacing'
export * from './layout'
export * from './animation'
export * from './limits'

// 重新导出常用的组合
export { FONT_SIZE, LINE_HEIGHT, FONT_WEIGHT } from './typography'
export { SPACING, PADDING, GAP } from './spacing'
export { WIDTH, HEIGHT, BORDER_RADIUS, MARGIN, Z_INDEX } from './layout'
export { DURATION, EASING, TRANSITION, SCALE } from './animation'
export {
  MESSAGE_LIMITS,
  INPUT_LIMITS,
  SCROLL_LIMITS,
  TEXT_LIMITS,
  MARKETPLACE_LIMITS,
  AUDIO_LIMITS,
  POLLING_INTERVALS,
} from './limits'
