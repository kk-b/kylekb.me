import { type Component, createSignal, onMount, onCleanup } from 'solid-js'
import { collapse } from '../scroll'
import { FULL_NAME_ART, MONOGRAM_ART, artToPath } from './asciiArt'
import About from './About'

const ROLES = [
  'Full Stack Developer',
  'UI/UX Enthusiast',
  'Cooking Enthusiast',
  'Traveler',
  'Foodie',
]

const FULL_NAME = artToPath(FULL_NAME_ART)
const MONOGRAM = artToPath(MONOGRAM_ART)

/* The slot the travelling monogram flies out of — see FloatingMark. It must
   not be transformed itself (the reveal animation goes on the child), so that
   measuring it gives a stable rect while the entrance animation plays. */
const Wordmark: Component<{ p: () => number }> = (props) => (
  <div id="mark-slot">
    <div class="reveal" style={{ '--d': '110ms' }}>
      {/* the full name sets the height of the slot; hidden on narrow screens,
          where 85 columns of art would collapse into unreadable slivers */}
      <svg
        viewBox={`0 0 ${FULL_NAME.width} ${FULL_NAME.height}`}
        class="hidden md:block w-full text-[var(--accent)] select-none"
        style={{ opacity: `${1 - props.p()}` }}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={FULL_NAME.d} />
      </svg>

      {/* narrow screens show only the monogram, so reserve its box here */}
      <div
        class="md:hidden w-44"
        style={{ 'aspect-ratio': `${MONOGRAM.width} / ${MONOGRAM.height}` }}
      />
    </div>
  </div>
)

/* drawn rather than typed: ▼ (U+25BC) is outside IBM Plex Mono's coverage and
   would be substituted from a fallback face, the same trap the wordmark hit */
const ChevronDown: Component = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="nudge"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
)

const Hero: Component = () => {
  const [displayText, setDisplayText] = createSignal('')
  const [roleIndex, setRoleIndex] = createSignal(0)
  const [isDeleting, setIsDeleting] = createSignal(false)

  onMount(() => {
    let timeout: ReturnType<typeof setTimeout>

    const tick = () => {
      const current = ROLES[roleIndex()]
      const speed = isDeleting() ? 40 : 90

      if (!isDeleting()) {
        const next = current.slice(0, displayText().length + 1)
        setDisplayText(next)
        if (next === current) {
          setIsDeleting(true)
          timeout = setTimeout(tick, 2200)
          return
        }
      } else {
        const next = current.slice(0, displayText().length - 1)
        setDisplayText(next)
        if (next === '') {
          setIsDeleting(false)
          setRoleIndex((i) => (i + 1) % ROLES.length)
        }
      }
      timeout = setTimeout(tick, speed)
    }

    timeout = setTimeout(tick, 600)
    onCleanup(() => clearTimeout(timeout))
  })


  return (
    /* fills the viewport exactly: 100svh less the pt-20 on <main> that
       clears the fixed nav, so the next section starts below the fold */
    <section class="min-h-[calc(100svh-5rem)] flex flex-col justify-center">

      <div class="mb-6">
        <div class="reveal text-sm text-[var(--t8)] mb-4 flex items-center gap-2">
          <span class="text-[var(--accent)]">●</span>
          <span>kk-b@portfolio:~$</span>
          <span>whoami</span>
        </div>

        <Wordmark p={collapse} />
      </div>

      {/* the name is the <h1> in index.html — served in the static HTML and
          visually hidden, so it is indexed without repeating the wordmark */}

      

      <div class="reveal" style={{ '--d': '330ms' }}>
        <About />
      </div>

      <button
        onClick={() =>
          document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
        }
        aria-label="Go to experience"
        class="reveal self-center mt-12 p-2 rounded-sm text-[var(--t7)]
               hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer
               focus-visible:outline-2 focus-visible:outline-offset-4
               focus-visible:outline-[var(--accent)] focus-visible:text-[var(--accent)]"
        style={{ '--d': '340ms' }}
      >
        <ChevronDown />
      </button>

    </section>
  )
}

export default Hero
