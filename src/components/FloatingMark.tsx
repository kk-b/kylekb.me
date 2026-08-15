import { type Component, createMemo, Show } from 'solid-js'
import { MONOGRAM_ART, artToPath } from './asciiArt'
import { collapse, layoutTick } from '../scroll'

const MONOGRAM = artToPath(MONOGRAM_ART)

const HERO_WIDTH = 176 // matches the w-44 slot the hero reserves for it
// docked size: narrower on phones, where the nav has no room to spare
const NAV_WIDTH = 72
const NAV_WIDTH_SM = 52

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/* The monogram travels from the hero up into the nav as the page scrolls, then
   stays docked there. It lives outside <main> because it is position: fixed —
   inside, the reveal animation's transform would become its containing block.
   Both anchors are measured live, so it survives resizes and reflows. */
const FloatingMark: Component = () => {
  const box = createMemo(() => {
    layoutTick()
    const hero = document.getElementById('mark-slot')?.getBoundingClientRect()
    const nav = document.getElementById('nav-mark-slot')?.getBoundingClientRect()
    if (!hero || !nav) return null

    const p = collapse()
    const docked = window.innerWidth < 640 ? NAV_WIDTH_SM : NAV_WIDTH
    return {
      left: lerp(hero.left, nav.left, p),
      top: lerp(hero.top + hero.height / 2, nav.top + nav.height / 2, p),
      width: lerp(HERO_WIDTH, docked, p),
      p,
    }
  })

  return (
    <Show when={box()}>
      {(b) => (
        <svg
          viewBox={`0 0 ${MONOGRAM.width} ${MONOGRAM.height}`}
          class="floating-mark fixed z-[60] pointer-events-none text-[var(--accent)] select-none"
          style={{
            left: `${b().left}px`,
            top: `${b().top}px`,
            width: `${b().width}px`,
            transform: 'translateY(-50%)',
            /* full name is only shown at md+, so only there does the monogram
               need to fade in behind it — see .floating-mark in index.css */
            '--mark-o': `${b().p}`,
          }}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d={MONOGRAM.d} />
        </svg>
      )}
    </Show>
  )
}

export default FloatingMark
