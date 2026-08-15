import { type Component, For, Show } from 'solid-js'
import { TerminalPrompt } from './About'

interface Project {
  name: string
  description: string
  tags: string[]
  /* the shipped, public page — not a demo, so it is named for what it is */
  url?: string
  year: string
}

/* One title held at a company. Kept separate from the company itself so a
   promotion reads as a promotion rather than as two unrelated jobs. */
interface Position {
  title: string
  period: string
  projects: Project[]
}

interface Role {
  company: string
  /* the full span across every position below */
  period: string
  positions: Position[]
}

const EXPERIENCE: Role[] = [
  {
    company: 'Capital One',
    period: '2023 — Present',
    positions: [
      {
        title: 'Senior Associate Software Engineer',
        period: 'May 2024 — Present',
        projects: [
          {
            name: 'auto-navigator-my-garage',
            description:
              "The Auto Navigator section where customers track a vehicle's value over time — enter a VIN or plate and get Kelley Blue Book valuations that update as you adjust mileage and condition. I built across the frontend (lookup, onboarding, valuation display, and the reusable components behind them) and the pipeline underneath it: a monthly AWS Lambda and DynamoDB job that refreshes saved estimates for 100K+ user-tracked vehicles and surfaces them on the dashboard. I also integrated the share-with-dealer flow end to end, from BFF to UI, so a dealer lead carries the customer's actual trade-in vehicle rather than contact details alone.",
            tags: ['SolidJS', 'Java/Spring Boot', 'AWS', 'Lambda', 'DynamoDB', 'ECS', 'Vite', 'Playwright', ],
            year: '2024',
            url: 'https://www.capitalone.com/cars/my-garage'
          },
          {
            name: 'auto-navigator-trade-in',
            description:
              'The experience that connects customers trading in or selling a vehicle with dealers who bid on it. I helped re-architect it from a legacy single-marketplace component into a scalable multi-marketplace SolidJS platform, building the shared component structures and the dealer-connection flow along with the Java/Spring Boot BFF services and REST APIs that integrate third-party dealer and CRM systems — across 4–6 marketplace deployments on shared DynamoDB data contracts, inside a regulated financial services environment. The re-architecture contributed to a 3x increase in dealer lead volume, and shipped behind feature flags with A/B variants to validate changes before progressive rollout.',
            tags: ['SolidJS', 'Java/Spring Boot', 'AWS', 'DynamoDB', 'ECS', 'Lambda', 'S3', 'Vite', 'Playwright'],
            year: '2024',
            url: 'https://www.capitalone.com/cars/sell-my-car'
          },
        ],
      },
      {
        title: 'Associate Software Engineer',
        period: 'Feb 2023 — May 2024',
        projects: [
          {
            name: 'auto-navigator-search-results-page',
            description:
              "The high-traffic search experience where customers filter across millions of vehicle listings. I owned the legacy LitElement results page — shipping features and stabilizing critical paths while keeping analytics instrumentation intact — then helped drive Auto Navigator's first adoption of a SolidJS and Astro stack, rebuilding search to improve page-load performance across millions of monthly searches. Alongside it I built the testing and observability foundation: Playwright end-to-end coverage, New Relic monitoring, and CI work that cut suite runtime from 20 to 12 minutes and reduced flaky failures by 40%.",
            tags: ['SolidJS', 'Astro', 'Lit', 'Java/Spring Boot', 'S3', 'Playwright', 'New Relic', 'Vite'],
            year: '2023',
            url: 'https://www.capitalone.com/cars/search'
          },
        ],
      },
    ],
  },
]

/* drawn, not typed: ↗ (U+2197) is not guaranteed in IBM Plex Mono, and a
   fallback glyph would sit at a different width than the text beside it */
const ExternalLink: Component = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17L17 7M17 7H9M17 7v8" />
  </svg>
)

const Experience: Component = () => {
  return (
    <section id="experience" class="py-24">
      <TerminalPrompt command="cat ./experience" />

      <div class="space-y-16">
        <For each={EXPERIENCE}>{(role) => <RoleBlock role={role} />}</For>
      </div>
    </section>
  )
}

/* Company and position were previously separated only by 2px of type size and
   one step of grey, which reads as two peers. They are now distinct on five
   axes — size, weight, case, colour and indentation — with the positions
   nested behind a rule so the hierarchy is structural, not just typographic. */
const RoleBlock: Component<{ role: Role }> = (props) => (
  <div>
    <div class="flex items-baseline justify-between gap-4 pb-3 mb-6 border-b border-[var(--border)]">
      <h2 class="text-xl font-bold text-[var(--t1)]">{props.role.company}</h2>
      <span class="text-sm text-[var(--t6)] shrink-0">{props.role.period}</span>
    </div>

    {/* indentation alone carries the nesting; a left rule would only earn its
        place once there is more than one company to tell apart */}
    <div class="pl-4 sm:pl-8 space-y-10">
      <For each={props.role.positions}>
        {(position) => (
          <div>
            {/* the title runs long once uppercased, so it takes its own line
                on narrow screens rather than fighting the dates for room */}
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-4">
              <h3 class="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--t3)]">
                {position.title}
              </h3>
              <span class="text-xs text-[var(--t7)] sm:shrink-0">{position.period}</span>
            </div>

            <div class="space-y-4">
              <For each={position.projects}>
                {(project) => <ProjectCard project={project} />}
              </For>
            </div>
          </div>
        )}
      </For>
    </div>
  </div>
)

const ProjectCard: Component<{ project: Project }> = (props) => {
  const p = props.project
  return (
    <div class="border border-[var(--border)] rounded-sm bg-[var(--surface)] overflow-hidden hover:border-[var(--border-hover)] transition-colors duration-300 group">
      <div class="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-alt)] bg-[var(--surface-title)]">
        <div class="flex items-center gap-3 min-w-0">
          <div class="flex gap-1.5 shrink-0">
            <span class="w-2.5 h-2.5 rounded-full bg-[var(--dot-1)]" />
            <span class="w-2.5 h-2.5 rounded-full bg-[var(--dot-2)]" />
            <span class="w-2.5 h-2.5 rounded-full bg-[var(--dot-3)]" />
          </div>
          {/* these paths run to 36 characters — truncate rather than overflow */}
          <span class="text-xs text-[var(--t7)] group-hover:text-[var(--t5)] transition-colors truncate">
            ~/{p.name}
          </span>
        </div>
        <span class="text-xs text-[var(--t8)] shrink-0 pl-3">{p.year}</span>
      </div>

      <div class="p-5 sm:p-6">
        {/* h4 keeps the outline in order: h1 page → h2 company → h3 title → h4 */}
        <h4 class="text-sm font-semibold text-[var(--t1)] mb-2">
          <span class="text-[var(--accent)] mr-2 select-none">&gt;</span>
          {p.name}
        </h4>
        <p class="text-sm text-[var(--t4)] leading-relaxed mb-5">
          {p.description}
        </p>

        <div class="flex items-center justify-between gap-4">
          <div class="flex gap-2 flex-wrap">
            <For each={p.tags}>
              {(tag) => (
                <span class="text-xs px-2 py-0.5 border border-[var(--border-sub)] text-[var(--t5)] rounded-sm">
                  {tag}
                </span>
              )}
            </For>
          </div>

          <div class="flex gap-5 shrink-0">
            <Show when={p.url}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 rounded-sm text-xs text-[var(--t5)]
                       hover:text-[var(--accent)] focus-visible:text-[var(--accent)]
                       focus-visible:outline-2 focus-visible:outline-offset-2
                       focus-visible:outline-[var(--accent)] transition-colors duration-200"
              >
                ./live
                <ExternalLink />
                {/* the visible label repeats across cards, so name the target */}
                <span class="sr-only"> — {p.name}, opens in a new tab</span>
              </a>
            </Show>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Experience
