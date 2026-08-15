import { createSignal } from 'solid-js'

function getInitial(): boolean {
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') return true
    if (stored === 'light') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch {
    return false
  }
}

// Sync DOM before first paint (index.html script handles initial load;
// this keeps the signal in sync for subsequent renders)
const initial = getInitial()

export const [isDark, setIsDark] = createSignal(initial)

// keep in step with the transition duration in index.css
const TRANSITION_MS = 300
let transitionTimer: ReturnType<typeof setTimeout> | undefined

export function toggleTheme() {
  const next = !isDark()
  const root = document.documentElement

  // Only transition colours while the theme is actually changing, so hover
  // states elsewhere keep their own (faster) timings the rest of the time.
  root.classList.add('theme-transition')
  // flush the style change, so the transition is in effect before the swap
  void root.offsetWidth

  setIsDark(next)
  root.classList.toggle('dark', next)
  try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch (_) {}

  // a rapid second click restarts the window rather than cutting it short
  clearTimeout(transitionTimer)
  transitionTimer = setTimeout(
    () => root.classList.remove('theme-transition'),
    TRANSITION_MS,
  )
}
