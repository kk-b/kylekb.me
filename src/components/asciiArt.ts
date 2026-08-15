/* ANSI Compact (the FIGlet font) rendered as vector art.

   The art can't be shown as text: it is built from block-drawing characters
   (U+2580-2588) that IBM Plex Mono has no glyphs for, so the browser would
   substitute them one at a time from a fallback font with a different advance
   width — which is what made the letters ragged and out of line. Instead we
   keep the ASCII art as the source of truth and stamp out each character's real
   outline, so the result is pixel-exact and needs no font at all.

   ANSI Compact is used rather than the more ornate ANSI Shadow because it is
   one of the few block fonts with true lowercase, so the name keeps its casing.

   To change the wordmarks, edit the art below (`figlet -f "ANSI Compact"`). */

const CELL_W = 60
const CELL_H = 132

/* Outlines of the characters the art uses, in cell space, as closed polygons
   of [x0, y0, x1, y1, ...]. Every edge is axis-aligned. */
const GLYPHS: Record<string, number[][]> = {
  '█': [[0,132,0,0,60,0,60,132]],
  '▀': [[0,66,0,0,60,0,60,66]],
  '▄': [[0,132,0,66,60,66,60,132]],
}

export const FULL_NAME_ART = [
  '██ ▄█▀ ▄▄ ▄▄ ▄▄    ▄▄▄▄▄   ██ ▄█▀ ▄▄ ▄▄ ▄▄ ▄▄  ▄▄▄  ▄▄  ▄▄  ▄▄▄▄     █████▄ ▄▄ ▄▄ ▀▀',
  '████   ▀███▀ ██    ██▄▄    ████   ██▄██ ██ ██ ██▀██ ███▄██ ██ ▄▄ ▄▄▄ ██▄▄██ ██ ██ ██',
  '██ ▀█▄   █   ██▄▄▄ ██▄▄▄   ██ ▀█▄ ██ ██ ▀███▀ ▀███▀ ██ ▀██ ▀███▀     ██▄▄█▀ ▀███▀ ██',
]

export const MONOGRAM_ART = [
  '██ ▄█▀ ██ ▄█▀     █████▄',
  '████   ████   ▄▄▄ ██▄▄██',
  '██ ▀█▄ ██ ▀█▄     ██▄▄█▀',
]

export type Art = { d: string; width: number; height: number }

/* Stamps each character's outline into one path, trimmed to its bounding box. */
export function artToPath(art: string[]): Art {
  const polys: number[][] = []

  art.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      const glyph = GLYPHS[row[c]]
      if (!glyph) continue
      const ox = c * CELL_W
      const oy = r * CELL_H
      for (const poly of glyph) {
        const moved = poly.slice()
        for (let i = 0; i < moved.length; i += 2) {
          moved[i] += ox
          moved[i + 1] += oy
        }
        polys.push(moved)
      }
    }
  })

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const p of polys) {
    for (let i = 0; i < p.length; i += 2) {
      minX = Math.min(minX, p[i]); maxX = Math.max(maxX, p[i])
      minY = Math.min(minY, p[i + 1]); maxY = Math.max(maxY, p[i + 1])
    }
  }

  const d = polys
    .map((p) => {
      let out = `M${p[0] - minX} ${p[1] - minY}`
      for (let i = 2; i < p.length; i += 2) {
        // edges alternate, so only the changing axis needs emitting
        out += p[i + 1] === p[i - 1] ? `H${p[i] - minX}` : `V${p[i + 1] - minY}`
      }
      return out + 'Z'
    })
    .join('')

  return { d, width: maxX - minX, height: maxY - minY }
}
