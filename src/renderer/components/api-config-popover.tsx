import React, { useState } from 'react'
import { KeyIcon, EyeIcon, EyeSlashIcon, CheckIcon, PlusIcon, PencilSimpleIcon, TrashIcon, ArrowLeftIcon, XIcon } from '@phosphor-icons/react'
import { useColors } from '../theme'
import { useSessionStore } from '../stores/session-store'
import { FONT_SIZE, BORDER_RADIUS, TRANSITION } from '../constants'

// ─── Types ───

export interface ApiProfile {
  id: string
  name: string
  baseUrl: string
  authToken: string
}

interface ApiConfigData {
  profiles: ApiProfile[]
  activeId: string | null
}

// ─── Persistence ───

const CONFIG_V1_KEY = 'clui-api-config'
const CONFIG_V2_KEY = 'clui-api-config-v2'

function loadConfigData(): ApiConfigData {
  try {
    const raw = localStorage.getItem(CONFIG_V2_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed.profiles)) return parsed as ApiConfigData
    }
    // Migrate v1 → v2
    const v1 = localStorage.getItem(CONFIG_V1_KEY)
    if (v1) {
      const parsed = JSON.parse(v1)
      if (parsed.baseUrl || parsed.authToken) {
        const profile: ApiProfile = { id: 'default', name: '默认', baseUrl: parsed.baseUrl || '', authToken: parsed.authToken || '' }
        const data: ApiConfigData = { profiles: [profile], activeId: 'default' }
        saveConfigData(data)
        return data
      }
    }
  } catch {}
  return { profiles: [], activeId: null }
}

function saveConfigData(data: ApiConfigData): void {
  try { localStorage.setItem(CONFIG_V2_KEY, JSON.stringify(data)) } catch {}
}

export function loadApiConfigData() {
  return loadConfigData()
}

export function loadApiConfig(): { baseUrl: string; authToken: string } {
  const data = loadConfigData()
  if (data.activeId) {
    const active = data.profiles.find(p => p.id === data.activeId)
    if (active) return { baseUrl: active.baseUrl, authToken: active.authToken }
  }
  return { baseUrl: '', authToken: '' }
}

function genId(): string {
  return Math.random().toString(36).slice(2, 10)
}

// ─── ConfigInput ───

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
        borderRadius: BORDER_RADIUS.XXL,
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
          fontSize: FONT_SIZE.BASE,
          fontFamily: 'inherit',
          userSelect: 'text',
          WebkitUserSelect: 'text',
        }}
      />
      {suffix}
    </div>
  )
}

// ─── Edit Panel ───

function EditPanel({
  profile,
  onSave,
  onBack,
  colors,
}: {
  profile: ApiProfile | null
  onSave: (p: ApiProfile) => void
  onBack: () => void
  colors: ReturnType<typeof useColors>
}) {
  const [name, setName] = useState(profile?.name ?? '')
  const [baseUrl, setBaseUrl] = useState(profile?.baseUrl ?? '')
  const [authToken, setAuthToken] = useState(profile?.authToken ?? '')
  const [showToken, setShowToken] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    const p: ApiProfile = {
      id: profile?.id ?? genId(),
      name: name.trim() || '未命名',
      baseUrl: baseUrl.trim(),
      authToken: authToken.trim(),
    }
    onSave(p)
    setSaved(true)
    setTimeout(() => { setSaved(false); onBack() }, 900)
  }

  return (
    <div className="flex flex-col gap-2.5" style={{ padding: '20px 20px' }}>
      <div className="flex items-center gap-1.5">
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'none', border: 'none', cursor: 'pointer',
            color: colors.textTertiary, padding: 2, borderRadius: BORDER_RADIUS.SM,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = colors.textSecondary }}
          onMouseLeave={(e) => { e.currentTarget.style.color = colors.textTertiary }}
        >
          <ArrowLeftIcon size={14} />
        </button>
        <span className="text-[12px] font-medium" style={{ color: colors.textPrimary }}>
          {profile ? '编辑配置' : '新增配置'}
        </span>
      </div>

      <div style={{ height: 1, background: colors.popoverBorder }} />

      <div className="flex flex-col gap-1.5">
        <div className="text-[11px]" style={{ color: colors.textTertiary }}>名称</div>
        <ConfigInput value={name} onChange={setName} placeholder="例如：默认、我的代理..." colors={colors} />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="text-[11px]" style={{ color: colors.textTertiary }}>ANTHROPIC_BASE_URL</div>
        <ConfigInput value={baseUrl} onChange={setBaseUrl} placeholder="https://api.anthropic.com" colors={colors} />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="text-[11px]" style={{ color: colors.textTertiary }}>ANTHROPIC_AUTH_TOKEN</div>
        <ConfigInput
          type={showToken ? 'text' : 'password'}
          value={authToken}
          onChange={setAuthToken}
          placeholder="sk-ant-..."
          colors={colors}
          suffix={
            <button
              type="button"
              onClick={() => setShowToken((s) => !s)}
              style={{ flexShrink: 0, color: colors.textTertiary, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 2, borderRadius: BORDER_RADIUS.SM }}
              onMouseEnter={(e) => { e.currentTarget.style.color = colors.textSecondary }}
              onMouseLeave={(e) => { e.currentTarget.style.color = colors.textTertiary }}
              title={showToken ? '隐藏' : '显示'}
            >
              {showToken ? <EyeSlashIcon size={13} /> : <EyeIcon size={13} />}
            </button>
          }
        />
      </div>

      <div style={{ height: 1, background: colors.popoverBorder }} />

      <button
        onClick={handleSave}
        style={{
          fontSize: FONT_SIZE.BASE, fontWeight: 600, padding: '5px 10px', borderRadius: BORDER_RADIUS.LG,
          background: saved ? colors.statusComplete : colors.accent,
          color: colors.textOnAccent, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => { if (!saved) e.currentTarget.style.background = colors.sendHover }}
        onMouseLeave={(e) => { if (!saved) e.currentTarget.style.background = colors.accent }}
      >
        {saved ? <><CheckIcon size={13} weight="bold" />已保存</> : '保存'}
      </button>
    </div>
  )
}

// ─── Profile Row ───

function ProfileRow({
  profile,
  isActive,
  onActivate,
  onEdit,
  onDelete,
  colors,
}: {
  profile: ApiProfile
  isActive: boolean
  onActivate: () => void
  onEdit: () => void
  onDelete: () => void
  colors: ReturnType<typeof useColors>
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        borderRadius: BORDER_RADIUS.LG, padding: '5px 4px',
        background: hovered ? colors.inputPillBg : 'transparent',
        transition: 'background 0.12s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onActivate}
        style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
      >
        <div style={{
          width: 14, height: 14, borderRadius: BORDER_RADIUS.CIRCLE,
          border: `2px solid ${isActive ? colors.accent : colors.textTertiary}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          transition: 'border-color 0.15s',
        }}>
          {isActive && <div style={{ width: 6, height: 6, borderRadius: BORDER_RADIUS.CIRCLE, background: colors.accent }} />}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: FONT_SIZE.BASE, fontWeight: isActive ? 600 : 400, color: isActive ? colors.textPrimary : colors.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {profile.name}
          </div>
          {profile.baseUrl && (
            <div style={{ fontSize: FONT_SIZE.SM, color: colors.textTertiary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {profile.baseUrl}
            </div>
          )}
        </div>
      </button>

      <div style={{ display: 'flex', gap: 2, opacity: hovered ? 1 : 0, transition: 'opacity 0.12s' }}>
        <button
          onClick={onEdit}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: colors.textTertiary, padding: 3, borderRadius: BORDER_RADIUS.BASE }}
          onMouseEnter={(e) => { e.currentTarget.style.color = colors.textSecondary; e.currentTarget.style.background = colors.containerBorder }}
          onMouseLeave={(e) => { e.currentTarget.style.color = colors.textTertiary; e.currentTarget.style.background = 'none' }}
          title="编辑"
        >
          <PencilSimpleIcon size={12} />
        </button>
        <button
          onClick={onDelete}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: colors.textTertiary, padding: 3, borderRadius: BORDER_RADIUS.BASE }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = 'rgba(239,68,68,0.1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = colors.textTertiary; e.currentTarget.style.background = 'none' }}
          title="删除"
        >
          <TrashIcon size={12} />
        </button>
      </div>
    </div>
  )
}

// ─── ApiConfigContent — the panel body (no container, no trigger) ───

type View = 'list' | 'edit'

export function ApiConfigContent() {
  const colors = useColors()
  const [view, setView] = useState<View>('list')
  const [editingProfile, setEditingProfile] = useState<ApiProfile | null>(null)
  const [configData, setConfigData] = useState<ApiConfigData>(() => loadConfigData())

  const handleActivate = (id: string) => {
    const next = { ...configData, activeId: configData.activeId === id ? null : id }
    setConfigData(next)
    saveConfigData(next)
  }

  const handleEdit = (profile: ApiProfile) => { setEditingProfile(profile); setView('edit') }
  const handleNew = () => { setEditingProfile(null); setView('edit') }
  const handleBack = () => { setView('list'); setEditingProfile(null) }

  const handleDelete = (id: string) => {
    const profiles = configData.profiles.filter(p => p.id !== id)
    const activeId = configData.activeId === id ? (profiles[0]?.id ?? null) : configData.activeId
    const next = { profiles, activeId }
    setConfigData(next)
    saveConfigData(next)
  }

  const handleSaveEdit = (profile: ApiProfile) => {
    const existing = configData.profiles.findIndex(p => p.id === profile.id)
    const profiles = existing >= 0
      ? configData.profiles.map(p => p.id === profile.id ? profile : p)
      : [...configData.profiles, profile]
    const activeId = configData.activeId ?? profile.id
    const next = { profiles, activeId }
    setConfigData(next)
    saveConfigData(next)
  }

  const closePanel = useSessionStore((s) => s.closePanel)

  const content = view === 'edit' ? (
    <EditPanel
      profile={editingProfile}
      onSave={handleSaveEdit}
      onBack={handleBack}
      colors={colors}
    />
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '20px 20px' }}>
      {configData.profiles.length === 0 ? (
        <div className="text-[11px] text-center py-3" style={{ color: colors.textTertiary }}>
          暂无配置，点击下方新增
        </div>
      ) : (
        <div className="flex flex-col" style={{ gap: 1 }}>
          {configData.profiles.map(profile => (
            <ProfileRow
              key={profile.id}
              profile={profile}
              isActive={configData.activeId === profile.id}
              onActivate={() => handleActivate(profile.id)}
              onEdit={() => handleEdit(profile)}
              onDelete={() => handleDelete(profile.id)}
              colors={colors}
            />
          ))}
        </div>
      )}

      <div style={{ height: 1, background: colors.containerBorder }} />

      <button
        onClick={handleNew}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          fontSize: FONT_SIZE.BASE, fontWeight: 500, padding: '5px 10px', borderRadius: BORDER_RADIUS.LG,
          background: 'transparent', color: colors.textSecondary,
          border: `1px solid ${colors.containerBorder}`,
          cursor: 'pointer', fontFamily: 'inherit',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = colors.textPrimary; e.currentTarget.style.borderColor = colors.textTertiary }}
        onMouseLeave={(e) => { e.currentTarget.style.color = colors.textSecondary; e.currentTarget.style.borderColor = colors.containerBorder }}
      >
        <PlusIcon size={13} />
        新增配置
      </button>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 18px 10px',
        borderBottom: `1px solid ${colors.containerBorder}`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <KeyIcon size={20} weight="regular" style={{ color: colors.accent }} />
          <div>
            <div style={{ fontSize: FONT_SIZE.MD, fontWeight: 700, color: colors.textPrimary }}>
              密钥管理
            </div>
            <div style={{ fontSize: FONT_SIZE.BASE_SM, color: colors.textTertiary, marginTop: 2 }}>
              管理 API 密钥和模型接入配置
            </div>
          </div>
        </div>
        <button
          onClick={closePanel}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: colors.textTertiary, padding: 2, display: 'flex',
            borderRadius: BORDER_RADIUS.SM,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = colors.textPrimary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = colors.textTertiary)}
        >
          <XIcon size={14} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          {content}
        </div>
      </div>
    </div>
  )
}

// ─── ApiConfigButton — trigger button only ───

export function ApiConfigButton({
  active,
  disabled,
  onClick,
}: {
  active: boolean
  disabled?: boolean
  onClick: () => void
}) {
  const colors = useColors()
  const hasConfig = loadConfigData().profiles.some(p => p.id === loadConfigData().activeId)

  return (
    <button
      className="stack-btn stack-btn-4 glass-surface"
      title="API 配置"
      onClick={onClick}
      disabled={disabled}
      style={{ background: active ? colors.inputPillBg : undefined }}
    >
      <KeyIcon size={17} />
      {hasConfig && (
        <span style={{
          position: 'absolute', top: 9, right: 9,
          width: 6, height: 6, borderRadius: BORDER_RADIUS.CIRCLE,
          background: colors.accent, pointerEvents: 'none',
        }} />
      )}
    </button>
  )
}
