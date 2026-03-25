import { execSync } from 'child_process'
import { homedir } from 'os'
import { join } from 'path'
import { getCliEnv } from '../cli-env'

/**
 * Locate the `claude` CLI binary.
 *
 * Resolution order:
 * 1. Well-known absolute paths (Homebrew, npm-global)
 * 2. Login-shell lookup via zsh `whence -p`
 * 3. Login-shell lookup via bash `which`
 * 4. Fall back to bare `"claude"` and let PATH resolve at spawn time
 */
export function findClaudeBinary(): string {
  const candidates = [
    '/usr/local/bin/claude',
    '/opt/homebrew/bin/claude',
    join(homedir(), '.npm-global/bin/claude'),
  ]

  for (const c of candidates) {
    try {
      execSync(`test -x "${c}"`, { stdio: 'ignore' })
      return c
    } catch {}
  }

  try {
    return execSync('/bin/zsh -ilc "whence -p claude"', { encoding: 'utf-8', env: getCliEnv() }).trim()
  } catch {}

  try {
    return execSync('/bin/bash -lc "which claude"', { encoding: 'utf-8', env: getCliEnv() }).trim()
  } catch {}

  return 'claude'
}
