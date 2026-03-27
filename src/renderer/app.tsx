import React, { useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PaperclipIcon, CameraIcon, HeadCircuitIcon } from '@phosphor-icons/react'
import { TabStrip } from './components/tab-strip'
import { ConversationView } from './components/conversation-view'
import { InputBar } from './components/input-bar'
import { StatusBar } from './components/status-bar'
import { MarketplacePanel } from './components/marketplace-panel'
import { ApiConfigButton, ApiConfigContent } from './components/api-config-popover'
import { PopoverLayerProvider } from './components/popover-layer'
import { useClaudeEvents } from './hooks/use-claude-events'
import { useHealthReconciliation } from './hooks/use-health-reconciliation'
import { useSessionStore } from './stores/session-store'
import { useColors, useThemeStore } from './theme'
import { TRANSITION, WIDTH, HEIGHT, BORDER_RADIUS, MARGIN, Z_INDEX, SCALE } from './constants'

export default function App() {
  useClaudeEvents()
  useHealthReconciliation()

  const activeTabStatus = useSessionStore((s) => s.tabs.find((t) => t.id === s.activeTabId)?.status)
  const addAttachments = useSessionStore((s) => s.addAttachments)
  const colors = useColors()
  const setSystemTheme = useThemeStore((s) => s.setSystemTheme)
  // ─── Theme initialization ───
  useEffect(() => {
    // Get initial OS theme — setSystemTheme respects themeMode (system/light/dark)
    window.clui.getTheme().then(({ isDark }) => {
      setSystemTheme(isDark)
    }).catch(() => {})

    // Listen for OS theme changes
    const unsub = window.clui.onThemeChange((isDark) => {
      setSystemTheme(isDark)
    })
    return unsub
  }, [setSystemTheme])

  useEffect(() => {
    useSessionStore.getState().initStaticInfo().then(() => {
      const homeDir = useSessionStore.getState().staticInfo?.homePath || '~'
      const tab = useSessionStore.getState().tabs[0]
      if (tab) {
        // Set working directory to home by default (user hasn't chosen yet)
        useSessionStore.setState((s) => ({
          tabs: s.tabs.map((t, i) => (i === 0 ? { ...t, workingDirectory: homeDir, hasChosenDirectory: false } : t)),
        }))
        window.clui.createTab().then(({ tabId }) => {
          useSessionStore.setState((s) => ({
            tabs: s.tabs.map((t, i) => (i === 0 ? { ...t, id: tabId } : t)),
            activeTabId: tabId,
          }))
        }).catch(() => {})
      }
    })
  }, [])

  // Shared drag ref — declared before setIgnoreMouseEvents effect so both closures can read it
  const dragRef = useRef<{ startX: number; startY: number } | null>(null)

  // Vertical position tracking — window moves first (until macOS clamps), then CSS overflows
  const PILL_HEIGHT_CONST = 720
  const PILL_BOTTOM_MARGIN_CONST = 24
  const minWindowY = window.screen.availTop
  const initialWindowY = window.screen.availTop + window.screen.availHeight - PILL_HEIGHT_CONST - PILL_BOTTOM_MARGIN_CONST
  const windowYRef = useRef(initialWindowY)
  const cardYRef = useRef(0)

  // OS-level click-through (RAF-throttled to avoid per-pixel IPC)
  useEffect(() => {
    if (!window.clui?.setIgnoreMouseEvents) return
    let lastIgnored: boolean | null = null

    const onMouseMove = (e: MouseEvent) => {
      // While dragging, keep full mouse capture — don't toggle ignore-events
      if (dragRef.current) return
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const isUI = !!(el && el.closest('[data-clui-ui]'))
      const shouldIgnore = !isUI
      if (shouldIgnore !== lastIgnored) {
        lastIgnored = shouldIgnore
        if (shouldIgnore) {
          window.clui.setIgnoreMouseEvents(true, { forward: true })
        } else {
          window.clui.setIgnoreMouseEvents(false)
        }
      }
    }

    const onMouseLeave = () => {
      if (dragRef.current) return
      if (lastIgnored !== true) {
        lastIgnored = true
        window.clui.setIgnoreMouseEvents(true, { forward: true })
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  // Manual window drag — bypasses -webkit-app-region conflicts with setIgnoreMouseEvents
  useEffect(() => {
    if (!window.clui?.startWindowDrag) return

    const onMouseDown = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('button, input, textarea, a, select, [role="button"], [contenteditable], .cm-editor')) return
      if (!el.closest('[data-clui-ui]')) return
      e.preventDefault()
      // Double-click: snap back to default position
      if (e.detail >= 2) {
        window.clui.resetWindowPosition()
        windowYRef.current = initialWindowY
        cardYRef.current = 0
        document.documentElement.style.setProperty('--clui-card-y', '0px')
        return
      }
      window.clui.setIgnoreMouseEvents(false)
      dragRef.current = { startX: e.screenX, startY: e.screenY }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return
      const dx = e.screenX - dragRef.current.startX
      const dy = e.screenY - dragRef.current.startY
      if (dx !== 0 || dy !== 0) {
        if (dx !== 0) window.clui.startWindowDrag(dx, 0)
        if (dy !== 0) {
          if (dy < 0) {
            const windowCanMove = windowYRef.current - minWindowY
            const windowDy = Math.max(-windowCanMove, dy)
            const cssDy = dy - windowDy
            if (windowDy !== 0) {
              window.clui.startWindowDrag(0, windowDy)
              windowYRef.current += windowDy
            }
            if (cssDy !== 0) {
              cardYRef.current += cssDy
              document.documentElement.style.setProperty('--clui-card-y', `${cardYRef.current}px`)
            }
          } else {
            const cssUndo = Math.min(-cardYRef.current, dy)
            const windowDy = dy - cssUndo
            if (cssUndo !== 0) {
              cardYRef.current += cssUndo
              document.documentElement.style.setProperty('--clui-card-y', `${cardYRef.current}px`)
            }
            if (windowDy !== 0) {
              window.clui.startWindowDrag(0, windowDy)
              windowYRef.current += windowDy
            }
          }
        }
        dragRef.current.startX = e.screenX
        dragRef.current.startY = e.screenY
      }
    }

    const onMouseUp = () => { dragRef.current = null }

    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  const isExpanded = useSessionStore((s) => s.isExpanded)
  const activePanelId = useSessionStore((s) => s.activePanelId)
  const togglePanel = useSessionStore((s) => s.togglePanel)
  const isRunning = activeTabStatus === 'running' || activeTabStatus === 'connecting'

  // Layout dimensions — always full width
  const contentWidth = WIDTH.CONTENT_EXPANDED
  const cardExpandedWidth = WIDTH.CARD_EXPANDED_WIDE
  const cardCollapsedWidth = WIDTH.CARD_COLLAPSED_WIDE
  const cardCollapsedMargin = MARGIN.CARD_COLLAPSED

  const handleScreenshot = useCallback(async () => {
    const result = await window.clui.takeScreenshot()
    if (!result) return
    addAttachments([result])
  }, [addAttachments])

  const handleAttachFile = useCallback(async () => {
    const files = await window.clui.attachFiles()
    if (!files || files.length === 0) return
    addAttachments(files)
  }, [addAttachments])

  return (
    <PopoverLayerProvider>
      <div className="flex flex-col justify-end h-full" style={{ background: 'transparent' }}>

        {/* ─── 460px content column, centered. Circles overflow left. ─── */}
        <div style={{ width: contentWidth, position: 'relative', margin: '0 auto', transition: `width ${TRANSITION.STANDARD.duration}s cubic-bezier(${TRANSITION.STANDARD.ease.join(',')})`, transform: 'translateY(var(--clui-card-y, 0px))' }}>

          <AnimatePresence initial={false}>
            {activePanelId !== null && (
              <div
                data-clui-ui
                style={{
                  width: WIDTH.MARKETPLACE,
                  maxWidth: WIDTH.MARKETPLACE,
                  marginLeft: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: MARGIN.PANEL_BOTTOM,
                  position: 'relative',
                  zIndex: Z_INDEX.PANEL,
                }}
              >
                <motion.div
                  key={activePanelId}
                  initial={{ opacity: 0, y: 14, scale: SCALE.DOWN_NANO }}
                  animate={{ opacity: 1, y: 0, scale: SCALE.NORMAL }}
                  exit={{ opacity: 0, y: 10, scale: SCALE.DOWN_PICO }}
                  transition={TRANSITION.STANDARD}
                >
                  <div
                    data-clui-ui
                    className="glass-surface overflow-hidden no-drag"
                    style={{ borderRadius: BORDER_RADIUS.PANEL, height: HEIGHT.MAX_MARKETPLACE }}
                  >
                    {activePanelId === 'marketplace' && <MarketplacePanel />}
                    {activePanelId === 'api-config' && <ApiConfigContent />}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/*
            ─── Tabs / message shell ───
            This always remains the chat shell. The marketplace is a separate
            panel rendered above it, never inside it.
          */}
          <motion.div
            data-clui-ui
            className="overflow-hidden flex flex-col drag-region"
            animate={{
              width: isExpanded ? cardExpandedWidth : cardCollapsedWidth,
              marginBottom: isExpanded ? MARGIN.CARD_BOTTOM : -14,
              marginLeft: isExpanded ? 0 : cardCollapsedMargin,
              marginRight: isExpanded ? 0 : cardCollapsedMargin,
              background: isExpanded ? colors.containerBg : colors.containerBgCollapsed,
              borderColor: colors.containerBorder,
              boxShadow: isExpanded ? colors.cardShadow : colors.cardShadowCollapsed,
            }}
            transition={TRANSITION.STANDARD}
            style={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderRadius: BORDER_RADIUS.CARD,
              position: 'relative',
              zIndex: isExpanded ? Z_INDEX.TOP : Z_INDEX.BASE,
            }}
          >
            {/* Tab strip — always mounted */}
            <div className="no-drag">
              <TabStrip />
            </div>

            {/* Body — chat history only; the marketplace is a separate overlay above */}
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? HEIGHT.EXPANDED_CONTENT : HEIGHT.COLLAPSED_CONTENT,
                minHeight: isExpanded ? HEIGHT.EXPANDED_CONTENT : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={TRANSITION.STANDARD}
              className="overflow-hidden no-drag"
            >
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                  <ConversationView />
                </div>
                <StatusBar />
              </div>
            </motion.div>
          </motion.div>

          {/* ─── Input row — circles float outside left ─── */}
          {/* marginBottom: shadow buffer so the glass-surface drop shadow isn't clipped at the native window edge */}
          <div data-clui-ui className="relative" style={{ minHeight: HEIGHT.MIN_INPUT_ROW, zIndex: Z_INDEX.MIDDLE, marginBottom: MARGIN.CARD_BOTTOM_SHADOW }}>
            {/* Stacked circle buttons — expand on hover */}
            <div
              data-clui-ui
              className="circles-out"
            >
              <div className="btn-stack">
                {/* btn-1: Attach (front, rightmost) */}
                <button
                  className="stack-btn stack-btn-1 glass-surface"
                  title="Attach file"
                  onClick={handleAttachFile}
                  disabled={isRunning}
                >
                  <PaperclipIcon size={17} />
                </button>
                {/* btn-2: Screenshot (middle) */}
                <button
                  className="stack-btn stack-btn-2 glass-surface"
                  title="Take screenshot"
                  onClick={handleScreenshot}
                  disabled={isRunning}
                >
                  <CameraIcon size={17} />
                </button>
                {/* btn-3: Skills (back) */}
                <button
                  className="stack-btn stack-btn-3 glass-surface"
                  title="Skills & Plugins"
                  onClick={() => useSessionStore.getState().toggleMarketplace()}
                  disabled={isRunning}
                >
                  <HeadCircuitIcon size={17} />
                </button>
                {/* btn-4: API Config (leftmost) */}
                <ApiConfigButton
                  active={activePanelId === 'api-config'}
                  disabled={isRunning}
                  onClick={() => togglePanel('api-config')}
                />
              </div>
            </div>

            {/* Input pill */}
            <div
              data-clui-ui
              className="glass-surface w-full"
              style={{ minHeight: HEIGHT.MIN_BUTTON, borderRadius: BORDER_RADIUS.INPUT, padding: '0 6px 0 16px', background: colors.inputPillBg }}
            >
              <InputBar />
            </div>
          </div>
        </div>
      </div>
    </PopoverLayerProvider>
  )
}
