import { type Component, onMount, onCleanup } from 'solid-js'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Contact from './components/Contact'
import FloatingMark from './components/FloatingMark'
import { initScrollTracking } from './scroll'

const App: Component = () => {
  onMount(() => onCleanup(initScrollTracking()))

  return (
    <div class="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <Nav />
      {/* sibling of <main> so no ancestor transform can capture its fixed position */}
      <FloatingMark />
      <main class="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-24">
        <Hero />
        <Experience />
        <Contact />
      </main>
      <footer class="border-t border-[var(--border-foot)] py-6 text-center text-xs text-[var(--t7)]">
        <span class="text-[var(--accent)]">~/</span>kk-b · made with 💙
      </footer>
    </div>
  )
}

export default App
