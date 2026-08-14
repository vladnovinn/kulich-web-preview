import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const repoBase = '/kulich-web-preview/'

function prefixPublicCssUrls(base: string): Plugin {
  const pattern = /url\(\s*(['"]?)\/((?:icons|fonts|brand)\/[^'")]+)\1\s*\)/g

  return {
    name: 'prefix-public-css-urls',
    transform(code, id) {
      if (!id.includes('.css')) return
      pattern.lastIndex = 0
      if (!pattern.test(code)) return
      pattern.lastIndex = 0
      return {
        code: code.replace(
          pattern,
          (_match, quote: string, path: string) => {
            const q = quote || "'"
            return `url(${q}${base}${path}${q})`
          },
        ),
        map: null,
      }
    },
  }
}

function spaFallback(): Plugin {
  return {
    name: 'spa-github-pages-fallback',
    closeBundle() {
      const dist = resolve(import.meta.dirname, 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

export default defineConfig({
  base: repoBase,
  plugins: [react(), prefixPublicCssUrls(repoBase), spaFallback()],
})
