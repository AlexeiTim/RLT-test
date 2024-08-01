export function generateTwoColors(): [string, string] {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  const alpha1 = 1
  const alpha2 = 0.35

  const color1 = `rgba(${r}, ${g}, ${b}, ${alpha1})`
  const color2 = `rgba(${r}, ${g}, ${b}, ${alpha2})`

  return [color1, color2]
}
