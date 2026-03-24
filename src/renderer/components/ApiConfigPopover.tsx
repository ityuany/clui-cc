import React, { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { Key, Eye, EyeSlash, Check } from '@phosphor-icons/react'
import { usePopoverLayer } from './PopoverLayer'
import { useColors } from '../theme'

// ─── Persistence ───

const CONFIG_KEY = 'clui-api-config'

function loadConfig(): { baseUrl: string; authToken: string } {
  try {
    const raw = localStorage.getItem(CONFIG_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        baseUrl: typeof parsed.baseUrl === 'string' ? parsed.baseUrl : '',
        authToken: typeof parsed.authToken === 'string' ? parsed.authToken : '',
      }
    }
  } catch {}
  return { baseUrl: '', authToken: '' }
}

function saveConfig(config: { baseUrl: string; authToken: string }): void {
  try { localStorage.setItem(CONFIG_KEY, JSON.stringify(config)) } catch {}
}

export function loadApiConfig(): { baseUrl: string; authToken: string } {
  return loadConfig()
}

// ─── Input wrapper that highlights border on focus ───

function ConfigInput({
  type = 'text',
  value,
  onChange,
  placeholder,
  suffix,
  colors,
}: {
  type?: 'text' | 'password'
  value: string
  onChange: (v: string) => void
  placeholder: string
  suffix?: React.ReactNode
  colors: ReturnType<typeof useColors>
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: colors.inputPillBg,
        borderRadius: 10,
        padding: suffix ? '7px 8px 7px 10px' : '7px 10px',
        border: `1px solid ${focused ? colors.inputFocusBorder : colors.containerBorder}`,
        transition: 'border-color 0.15s',
      }}
    >
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          flex: 1,
          minWidth: 0,
          background: 'none',
          border: 'none',
          outline: 'none',
          color: colors.textPrimary,
          fontSize: 12,
          fontFamily: 'inherit',
          userSelect: 'text',
          WebkitUserSelect: 'text',
        }}
      />
      {suffix}
    </div>
  )
}

// ─── Component ───

export function ApiConfigPopover({ disabled }: { disabled?: boolean }) {
  const colors = useColors()
  const popoverLayer = usePopoverLayer()

  const [open, setOpen] = useState(false)
  const [baseUrl, setBaseUrl] = useState('')
  const [authToken, setAuthToken] = useState('')
  const [showToken, setShowToken] = useState(false)
  const [saved, setSaved] = useState(false)
  const [isConfigured, setIsConfigured] = useState(() => {
    const cfg = loadConfig()
    return !!(cfg.baseUrl || cfg.authToken)
  })

  const triggerRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ left: number; bottom: number }>({ left: 0, bottom: 0 })

  // Load saved values when popover opens
  useEffect(() => {
    if (!open) return
    const cfg = loadConfig()
    setBaseUrl(cfg.baseUrl)
    setAuthToken(cfg.authToken)
    setSaved(false)
    setShowToken(false)
  }, [open])

  const updatePos = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    setPos({ left: rect.left, bottom: window.innerHeight - rect.top + 6 })
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target)) return
      if (popoverRef.current?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Track button position while open
  useEffect(() => {
    if (!open) return
    const onResize = () => updatePos()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open, updatePos])

  const handleToggle = () => {
    if (!open) updatePos()
    setOpen((o) => !o)
  }

  const handleSave = () => {
    const cfg = { baseUrl: baseUrl.trim(), authToken: authToken.trim() }
    saveConfig(cfg)
    setIsConfigured(!!(cfg.baseUrl || cfg.authToken))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleClear = () => {
    setBaseUrl('')
    setAuthToken('')
    saveConfig({ baseUrl: '', authToken: '' })
    setIsConfigured(false)
    setSaved(false)
  }

  return (
    <>
      <button
        ref={triggerRef}
        className="stack-btn stack-btn-4 glass-surface"
        title="API 配置"
        onClick={handleToggle}
        disabled={disabled}
      >
        <Key size={17} />
        {isConfigured && (
          <span
            style={{
              position: 'absolute',
              top: 9,
              right: 9,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: colors.accent,
              pointerEvents: 'none',
            }}
          />
        )}
      </button>

      {popoverLayer && open && createPortal(
        <motion.div
          ref={popoverRef}
          data-clui-ui
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.12 }}
          className="rounded-xl"
          style={{
            position: 'fixed',
            left: pos.left,
            bottom: pos.bottom,
            width: 280,
            pointerEvents: 'auto',
            background: colors.popoverBg,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: colors.popoverShadow,
            border: `1px solid ${colors.popoverBorder}`,
          }}
        >
          <div className="p-3 flex flex-col gap-2.5">

            {/* Header row — same icon+label pattern as SettingsPopover rows */}
            <div className="flex items-center gap-2">
              <Key size={14} style={{ color: colors.textTertiary }} />
              <span className="text-[12px] font-medium" style={{ color: colors.textPrimary }}>
                API 配置
              </span>
            </div>

            <div style={{ height: 1, background: colors.popoverBorder }} />

            {/* Base URL */}
            <div className="flex flex-col gap-1.5">
              <div className="text-[11px]" style={{ color: colors.textTertiary }}>
                ANTHROPIC_BASE_URL
              </div>
              <ConfigInput
                value={baseUrl}
                onChange={(v) => { setBaseUrl(v); setSaved(false) }}
                placeholder="https://api.anthropic.com"
                colors={colors}
              />
            </div>

            {/* Auth Token */}
            <div className="flex flex-col gap-1.5">
              <div className="text-[11px]" style={{ color: colors.textTertiary }}>
                ANTHROPIC_AUTH_TOKEN
              </div>
              <ConfigInput
                type={showToken ? 'text' : 'password'}
                value={authToken}
                onChange={(v) => { setAuthToken(v); setSaved(false) }}
                placeholder="sk-ant-..."
                colors={colors}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowToken((s) => !s)}
                    style={{
                      flexShrink: 0,
                      color: colors.textTertiary,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      padding: 2,
                      borderRadius: 4,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = colors.textSecondary }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = colors.textTertiary }}
                    title={showToken ? '隐藏' : '显示'}
                  >
                    {showToken ? <EyeSlash size={13} /> : <Eye size={13} />}
                  </button>
                }
              />
            </div>

            <div style={{ height: 1, background: colors.popoverBorder }} />

            {/* Actions */}
            <div className="flex gap-1.5">
              {isConfigured && (
                <button
                  onClick={handleClear}
                  style={{
                    flexShrink: 0,
                    fontSize: 12,
                    fontWeight: 500,
                    padding: '5px 10px',
                    borderRadius: 8,
                    background: 'transparent',
                    color: colors.textSecondary,
                    border: `1px solid ${colors.containerBorder}`,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.textPrimary
                    e.currentTarget.style.borderColor = colors.textTertiary
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.textSecondary
                    e.currentTarget.style.borderColor = colors.containerBorder
                  }}
                >
                  清除
                </button>
              )}
              <button
                onClick={handleSave}
                style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '5px 10px',
                  borderRadius: 8,
                  background: saved ? colors.statusComplete : colors.accent,
                  color: colors.textOnAccent,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!saved) e.currentTarget.style.background = colors.sendHover
                }}
                onMouseLeave={(e) => {
                  if (!saved) e.currentTarget.style.background = colors.accent
                }}
              >
                {saved ? (
                  <>
                    <Check size={13} weight="bold" />
                    已保存
                  </>
                ) : '保存'}
              </button>
            </div>

          </div>
        </motion.div>,
        popoverLayer,
      )}
    </>
  )
}
