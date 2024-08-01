export interface IBoardCell {
  id: number
  item: { colors: [string, string]; count: number } | null
}
