import { type Component, For } from 'solid-js'
import { isDark, toggleTheme } from '../theme'
import { collapse } from '../scroll'
import { RESUME_URL } from '../site'

const sections = [
  { label: 'experience', id: 'experience' },
  { label: 'contact', id: 'contact' },
]

const SunIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

const Nav: Component = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      class="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-foot)] backdrop-blur-sm"
      style={{ background: 'var(--nav-bg)' }}
    >
      <div class="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        {/* the monogram docks here as the page scrolls (see FloatingMark), so
            the text logo fades out to hand over. The button keeps its box, so
            it stays a working scroll-to-top target throughout. */}
        <button
          id="nav-mark-slot"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          class="text-sm hover:opacity-70 transition-opacity cursor-pointer"
          style={{ opacity: `${1 - collapse()}` }}
        >
          <span class="text-[var(--t8)]">~/</span>
          <span class="text-[var(--accent)]">kk-b</span>
        </button>

        <div class="flex items-center gap-3.5 sm:gap-6">
          <For each={sections}>
            {(section) => (
              <button
                onClick={() => scrollTo(section.id)}
                class="text-xs text-[var(--t6)] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
              >
                <span class="hidden sm:inline">./</span>{section.label}
              </button>
            )}
          </For>

          {/* a file rather than a section, so it opens instead of scrolling */}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs text-[var(--t6)] hover:text-[var(--accent)] transition-colors duration-200"
          >
            <span class="hidden sm:inline">./</span>resume<span class="hidden sm:inline">.pdf</span>
            <span class="sr-only"> (opens in a new tab)</span>
          </a>

          <button
            onClick={toggleTheme}
            aria-label={isDark() ? 'Switch to light mode' : 'Switch to dark mode'}
            class="text-[var(--t6)] hover:text-[var(--accent)] transition-colors duration-200 flex items-center cursor-pointer"
          >
            {isDark() ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
