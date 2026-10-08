// ─── Design Tokens (brandbook: Inter + JetBrains Mono) ───────
export const colors = {
  navy: "#0B1D35",
  navyLight: "#132D4F",
  blue: "#2B8FD4",
  blueLight: "#4FC3F7",
  bluePale: "#E8F4FD",
  green: "#5DB348",
  greenLight: "#7CB342",
  greenPale: "#EDF7E8",
  white: "#FFFFFF",
  gray50: "#F8FAFB",
  gray100: "#F0F3F5",
  gray200: "#D8DFE5",
  gray400: "#94A3B8",
  gray600: "#5A6A7A",
  gray800: "#2D3A48",
};

// Numerals use a mono face for typographic texture.
export const MONO = "'JetBrains Mono', ui-monospace, 'SF Mono', monospace";
export const SANS = "'Inter', system-ui, sans-serif";

export const sectionStyle = { maxWidth: 1200, margin: "0 auto", padding: "0 24px" };

export const headingStyle = {
  fontFamily: SANS,
  fontWeight: 800,
  color: colors.navy,
  letterSpacing: "-0.03em",
  lineHeight: 1.15,
};

export const bodyStyle = { fontFamily: SANS, color: colors.gray600, lineHeight: 1.7 };
