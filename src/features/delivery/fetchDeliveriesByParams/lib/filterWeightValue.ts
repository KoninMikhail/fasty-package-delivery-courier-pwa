export const filterWeightValue = (weight: number, maxWeight?: number): number | undefined => {
  if (!weight || weight === 0 || weight === maxWeight) {
    return undefined
  }
  return weight
}