import { type Component, For } from 'solid-js'
import { TerminalPrompt, TitleBar } from './About'

// UPDATE: Replace href values with your real links
const LINKS = [
  {
    command: './contact --email',
    display: 'kyle.bui20@email.com',
    href: 'mailto:kyle.bui20@email.com',
  },
  {
    command: './contact --linkedin',
    display: 'linkedin.com/in/kyle-khuong-bui/',
    href: 'https://www.linkedin.com/in/kyle-khuong-bui/',
  },
  {
    command: './contact --github',
    display: 'github.com/kk-b',
    href: 'https://github.com/kk-b',
  },
]

const Contact: Component = () => {
  return (
    <section id="contact" class="py-24">
      <TerminalPrompt command="./contact --list" />

      <div class="border border-[var(--border)] rounded-sm bg-[var(--surface)] overflow-hidden">
        <TitleBar filename="contact" />

        <div class="p-5 sm:p-8">
          {/* UPDATE: Your contact CTA */}
          <p class="text-sm text-[var(--t4)] mb-8 leading-relaxed">
            Want to connect? I'm always open to interesting
            conversations!
          </p>

          <div class="space-y-3">
            <For each={LINKS}>
              {(link) => (
                <a
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  class="flex items-start sm:items-center gap-3 sm:gap-4 px-4 py-3.5 border border-[var(--border-alt)] rounded-sm hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-200 group"
                >
                  <span class="text-[var(--t9)] group-hover:text-[var(--accent)] transition-colors text-sm select-none">
                    $
                  </span>

                  {/* narrow screens stack the command over its value; three
                      columns in ~280px squeezed every one of them to shreds */}
                  <span class="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-4">
                    <span class="text-sm text-[var(--t7)] group-hover:text-[var(--t3)] transition-colors">
                      {link.command}
                    </span>
                    <span class="text-sm text-[var(--t1)] group-hover:text-[var(--accent)] transition-colors break-all sm:break-normal">
                      {link.display}
                    </span>
                  </span>

                  <span class="text-[var(--t9)] group-hover:text-[var(--accent)] transition-colors text-sm select-none">
                    →
                  </span>
                </a>
              )}
            </For>
          </div>

          <div class="mt-8 pt-6 border-t border-[var(--border)] text-xs flex items-center gap-2">
            <span class="text-[var(--accent)]">$</span>
            <span class="cursor-blink text-[var(--t8)]">█</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
