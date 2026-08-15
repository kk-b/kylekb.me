import { createSignal } from 'solid-js'

/* 0 = the wordmark sits in the hero as the full name;
   1 = collapsed to the monogram and docked in the nav. */
export const [collapse, setCollapse] = createSignal(0)

/* Bumped every frame the page moves, so anything reading element positions
   re-runs. Position readers depend on scroll *and* on layout, and collapse
   alone stops changing once it saturates. */
export const [layoutTick, setLayoutTick] = createSignal(0)

export function initScrollTracking() {
  let raf = 0

  const measure = () => {
    raf = 0
    // collapse over the first third of a screen height
    const distance = Math.max(1, window.innerHeight * 0.33)
    setCollapse(Math.min(1, window.scrollY / distance))
    setLayoutTick((n) => n + 1)
  }

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(measure)
  }

  measure()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)

  return () => {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    if (raf) cancelAnimationFrame(raf)
  }
}
