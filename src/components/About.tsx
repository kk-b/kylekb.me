import { type Component, For } from 'solid-js'
import { RESUME_URL } from '../site'

const SKILLS = [
  'TypeScript',
  'React',
  'Java',
  'SolidJS',
  'Spring Boot',
  'Cross-functional Collaboration',
  'AWS',
  'EC2',
  'S3',
  'Lambda',
  'DynamoDB',
  'Microservices',
  'CI/CD',
  'Lit Element',
  'Angular',
  'Astro',
  'Node.js',
  'PostgreSQL',
  'Docker',
  'Git',
]

const About: Component = () => {
  return (
    /* lives inside the hero now, which owns the surrounding spacing */
    <section id="about">
      <TerminalPrompt command="cat about.txt" />

      <div class="border border-[var(--border)] rounded-sm bg-[var(--surface)] overflow-hidden">
        <TitleBar filename="about.txt" />

        <div class="p-5 sm:p-8 space-y-6 sm:space-y-8 text-sm">
          <div class="grid grid-cols-[max-content_auto] gap-x-6 gap-y-2 text-sm">
            <Field label="name    " value="Kyle Khuong-Bui" />
            <Field label="company    " value="Capital One" />
            <Field label="role    " value="Senior Associate Software Engineer" />
            <Field label="location" value="Dallas, Texas" />
            <Field label="school  " value="University of California, Irvine - B.S. Computer Science" />
          </div>

          <div class="border-t border-[var(--border)] pt-6">
            <p class="text-[var(--t3)] leading-relaxed">
                Hello!{' '}
                <span class="font-bold">
                  I'm a Software Engineer at Capital One working on their AutoNavigator platform.
                </span>{' '}
                I'm a full-stack developer with a passion for building scalable and efficient systems.
                I enjoy solving complex problems and learning. I love cooking, climbing rocks, watching anime, and traveling in my free time. :&#125;
            </p>
          </div>

          <div class="border-t border-[var(--border)] pt-6">
            <p class="text-xs text-[var(--t8)] mb-3">// skills</p>
            <div class="flex flex-wrap gap-2">
              <For each={SKILLS}>
                {(skill) => (
                  <span class="px-2.5 py-0.5 text-xs bg-[var(--chip-bg)]/25 border border-[var(--border-sub)] text-[var(--t5)] rounded-sm transition-all duration-200 cursor-default">
                    {skill}
                  </span>
                )}
              </For>
            </div>
          </div>

          <div class="border-t border-[var(--border)] pt-6">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm
                     bg-[var(--chip-bg)] border border-[var(--accent)] text-[var(--accent)]
                     hover:bg-[var(--accent)] hover:text-[var(--bg)]
                     focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-[var(--accent)]
                     transition-colors duration-200"
            >
              <span aria-hidden="true">$</span>
              open ./resume.pdf
              <span class="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

const Field: Component<{ label: string; value: string }> = (props) => (
  <>
    <span class="text-[var(--t7)]">{props.label}</span>
    <span class="text-[var(--t3)]">{props.value}</span>
  </>
)

export const TerminalPrompt: Component<{ command: string }> = (props) => (
  <div class="mb-6 text-sm text-[var(--t7)] flex items-center gap-2">
    <span class="text-[var(--accent)]">$</span>
    <span>{props.command}</span>
  </div>
)

export const TitleBar: Component<{ filename: string }> = (props) => (
  <div class="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-alt)] bg-[var(--surface-title)]">
    <span class="w-2.5 h-2.5 rounded-full bg-[var(--dot-1)]" />
    <span class="w-2.5 h-2.5 rounded-full bg-[var(--dot-2)]" />
    <span class="w-2.5 h-2.5 rounded-full bg-[var(--dot-3)]" />
    <span class="ml-4 text-xs text-[var(--t7)]">{props.filename}</span>
  </div>
)

export default About
