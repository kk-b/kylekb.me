import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  // relative, so the build works both at the domain root (kylekb.me) and
  // under a subpath (kk-b.github.io/kylekb.me/)
  base: './',
})
