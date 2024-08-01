function generateColorWithAlpha(r: number, g: number, b: number, alpha: number) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function generateTwoColors(diff = 50): [string, string] {
  const r1 = Math.floor(Math.random() * 256)
  const g1 = Math.floor(Math.random() * 256)
  const b1 = Math.floor(Math.random() * 256)

  const r2 = Math.min(Math.max(r1 + Math.floor(Math.random() * (diff * 2)) - diff, 0), 255)
  const g2 = Math.min(Math.max(g1 + Math.floor(Math.random() * (diff * 2)) - diff, 0), 255)
  const b2 = Math.min(Math.max(b1 + Math.floor(Math.random() * (diff * 2)) - diff, 0), 255)

  const alpha1 = 1
  const alpha2 = 0.35

  const color1 = generateColorWithAlpha(r1, g1, b1, alpha1)
  const color2 = generateColorWithAlpha(r2, g2, b2, alpha2)

  return [color1, color2]
}
