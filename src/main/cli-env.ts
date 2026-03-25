import { execSync } from 'child_process'

let cachedPath: string | null = null

// Env vars that may be set in .zshrc/.bashrc but not inherited by GUI apps
const SHELL_ENV_VARS = [
  'ANTHROPIC_AUTH_TOKEN',
  'ANTHROPIC_API_KEY',
  'ANTHROPIC_BASE_URL',
]

let cachedShellEnv: Record<string, string> | null = null

function getShellEnv(): Record<string, string> {
  if (cachedShellEnv) return cachedShellEnv
  cachedShellEnv = {}

  const SEP = '__CLUI__'
  const commands = [
    `/bin/zsh -ilc "echo ${SHELL_ENV_VARS.map(v => `\${${v}}`).join(SEP)}"`,
    `/bin/bash -lc "echo ${SHELL_ENV_VARS.map(v => `\${${v}}`).join(SEP)}"`,
  ]

  for (const cmd of commands) {
    try {
      const out = execSync(cmd, { encoding: 'utf-8', timeout: 3000 }).trim()
      const parts = out.split(SEP)
      if (parts.length === SHELL_ENV_VARS.length) {
        for (let i = 0; i < SHELL_ENV_VARS.length; i++) {
          const val = parts[i].trim()
          if (val) cachedShellEnv[SHELL_ENV_VARS[i]] = val
        }
        break
      }
    } catch {
      // Try next shell
    }
  }

  return cachedShellEnv
}

function appendPathEntries(target: string[], seen: Set<string>, rawPath: string | undefined): void {
  if (!rawPath) return
  for (const entry of rawPath.split(':')) {
    const p = entry.trim()
    if (!p || seen.has(p)) continue
    seen.add(p)
    target.push(p)
  }
}

export function getCliPath(): string {
  if (cachedPath) return cachedPath

  const ordered: string[] = []
  const seen = new Set<string>()

  // Start from current process PATH.
  appendPathEntries(ordered, seen, process.env.PATH)

  // Add common binary locations used on macOS (Homebrew + system).
  appendPathEntries(ordered, seen, '/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin')

  // Try interactive login shell first so nvm/asdf/etc. PATH hooks are loaded.
  const pathCommands = [
    '/bin/zsh -ilc "echo $PATH"',
    '/bin/zsh -lc "echo $PATH"',
    '/bin/bash -lc "echo $PATH"',
  ]

  for (const cmd of pathCommands) {
    try {
      const discovered = execSync(cmd, { encoding: 'utf-8', timeout: 3000 }).trim()
      appendPathEntries(ordered, seen, discovered)
    } catch {
      // Keep trying fallbacks.
    }
  }

  cachedPath = ordered.join(':')
  return cachedPath
}

export function getCliEnv(extraEnv?: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    ...getShellEnv(), // pick up vars defined in .zshrc/.bashrc not inherited by GUI apps
    ...extraEnv,
    PATH: getCliPath(),
  }
  delete env.CLAUDECODE
  return env
}

