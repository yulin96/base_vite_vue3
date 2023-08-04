export const hitRectangle = (s1: any, s2: any) => {
  const bounds1 = s1.getBounds()
  const bounds2 = s2.getBounds()

  return {
    hit:
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y,
    diffx: Math.abs(bounds1.x - bounds2.x),
    diffy: Math.abs(bounds1.y - bounds2.y),
  }
}
