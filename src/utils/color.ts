const lightenColors = (hexColors: string[], amount: number = 0.1): string[] => {
  // Validate input
  if (amount < 0 || amount > 1) {
    throw new Error("Amount must be between 0 and 1");
  }

  return hexColors.map((color) => {
    // Validate hex color format
    if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
      throw new Error(`Invalid hex color: ${color}`);
    }

    // Convert hex to RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Lighten each component
    const lightenComponent = (c: number): number =>
      Math.min(255, Math.round(c + (255 - c) * amount));

    const rLight = lightenComponent(r);
    const gLight = lightenComponent(g);
    const bLight = lightenComponent(b);

    // Convert back to hex
    return `#${((1 << 24) + (rLight << 16) + (gLight << 8) + bLight)
      .toString(16)
      .slice(1)}`;
  });
};

export default lightenColors;