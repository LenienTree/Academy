export const BRAND_COLORS = {
  o: "#FE6500",
  ink: "#19181D",
  cream: "#F5EFE3",
  deep: "#EBDBCD",
  od: "#B84400",
  g: "#5D5B62",
} as const;

export const SKINS = [
  "#F1C9A5",
  "#D8A27A",
  "#B97B54",
  "#8D5A3B",
  "#F6D8C2",
  "#6F4430",
];

export const HAIRS = ["#19181D", "#3A2A22", "#5D5B62", "#7A4A2B"];

export function rng(seed: number) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pick<T>(random: () => number, array: T[]): T {
  return array[Math.floor(random() * array.length)];
}

export function avatar(seed: number): string {
  const r = rng(seed * 97 + 13);
  const bgs = [
    BRAND_COLORS.deep,
    BRAND_COLORS.o,
    BRAND_COLORS.ink,
    BRAND_COLORS.deep,
    BRAND_COLORS.o,
    BRAND_COLORS.cream,
  ];
  const bg = bgs[Math.abs(seed) % bgs.length];
  const skin = pick(r, SKINS);
  const hair = pick(r, HAIRS);
  const shirtColors = [
    BRAND_COLORS.ink,
    BRAND_COLORS.cream,
    BRAND_COLORS.o,
    BRAND_COLORS.od,
    BRAND_COLORS.g,
  ].filter((c) => c !== bg);
  const shirt = pick(r, shirtColors);
  const style = Math.floor(r() * 5);
  const glasses = r() > 0.62;

  let s = `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" class="w-full h-full block"><rect width="200" height="200" fill="${bg}"/>`;

  if (style === 1) {
    s += `<path d="M62 100C58 55 80 44 100 44C122 44 144 55 138 100L144 160L56 160Z" fill="${hair}"/>`;
  }

  s += `<path d="M26 200C26 160 58 146 100 146C142 146 174 160 174 200Z" fill="${shirt}"/>`;
  s += `<rect x="87" y="122" width="26" height="30" fill="${skin}"/><rect x="87" y="122" width="26" height="30" fill="#19181D" opacity=".12"/>`;
  s += `<ellipse cx="100" cy="98" rx="34" ry="38" fill="${skin}"/>`;

  if (style === 0) {
    s += `<path d="M65 94C62 58 82 48 100 48C120 48 140 58 135 94C130 77 118 70 100 70C82 70 70 77 65 94Z" fill="${hair}"/>`;
  }
  if (style === 1) {
    s += `<path d="M66 88C70 62 90 56 100 56C114 56 132 62 134 88C124 74 110 70 100 70C88 70 76 76 66 88Z" fill="${hair}"/>`;
  }
  if (style === 2) {
    s += `<path d="M65 94C62 58 82 48 100 48C120 48 140 58 135 94C130 77 118 70 100 70C82 70 70 77 65 94Z" fill="${hair}"/><circle cx="100" cy="40" r="15" fill="${hair}"/>`;
  }
  if (style === 3) {
    const hatColor = bg === BRAND_COLORS.ink ? BRAND_COLORS.o : BRAND_COLORS.ink;
    s += `<path d="M64 90C64 62 80 52 100 52C120 52 136 62 136 90Z" fill="${hatColor}"/><rect x="60" y="88" width="82" height="7" fill="${hatColor}"/>`;
  }
  if (style === 4) {
    for (let i = 0; i < 6; i++) {
      s += `<circle cx="${68 + i * 13}" cy="${66 - Math.abs(i - 2.5) * 3}" r="15" fill="${hair}"/>`;
    }
  }

  s += '<circle cx="88" cy="100" r="3.2" fill="#19181D"/><circle cx="112" cy="100" r="3.2" fill="#19181D"/>';
  s += '<path d="M89 114Q100 123 111 114" fill="none" stroke="#19181D" stroke-width="2.6" stroke-linecap="round"/>';

  if (glasses) {
    s += '<circle cx="88" cy="100" r="9" fill="none" stroke="#19181D" stroke-width="2.4"/><circle cx="112" cy="100" r="9" fill="none" stroke="#19181D" stroke-width="2.4"/><path d="M97 100h6" stroke="#19181D" stroke-width="2.4"/>';
  }

  return s + "</svg>";
}

export function scene(seed: number): string {
  const r = rng(seed * 53 + 7);
  const dark = seed % 2 === 0;
  const bd = dark ? BRAND_COLORS.ink : BRAND_COLORS.o;
  const fg = dark ? BRAND_COLORS.cream : BRAND_COLORS.ink;

  let s = `<svg viewBox="0 0 340 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true" class="w-full h-full block"><rect width="340" height="260" fill="${BRAND_COLORS.deep}"/>`;
  s += `<rect x="24" y="26" width="292" height="124" fill="${bd}"/>`;
  s += `<rect x="232" y="26" width="84" height="84" fill="${dark ? BRAND_COLORS.o : BRAND_COLORS.ink}"/><use href="#L" x="258" y="38" width="32" height="62" fill="#fff"/>`;
  s += `<rect x="44" y="50" width="120" height="9" fill="${fg}"/><rect x="44" y="68" width="84" height="9" fill="${fg}"/><rect x="44" y="92" width="60" height="5" fill="${fg}" opacity=".6"/>`;
  s += '<rect x="0" y="150" width="340" height="110" fill="#E2CDBB"/>';
  s += `<circle cx="196" cy="106" r="11" fill="${pick(r, SKINS)}"/><rect x="186" y="118" width="20" height="32" fill="${dark ? BRAND_COLORS.o : BRAND_COLORS.cream}"/>`;

  const rows = [
    { y: 206, rad: 13, n: 8 },
    { y: 240, rad: 18, n: 5 },
  ];

  rows.forEach((row, ri) => {
    for (let i = 0; i < row.n; i++) {
      const x = (i + 0.5) * (340 / row.n) + (ri ? 0 : 6);
      const sh = pick(r, [
        BRAND_COLORS.ink,
        BRAND_COLORS.o,
        BRAND_COLORS.cream,
        BRAND_COLORS.od,
        BRAND_COLORS.g,
      ]);
      s += `<ellipse cx="${x}" cy="${row.y + row.rad * 1.9}" rx="${row.rad * 1.6}" ry="${row.rad * 1.3}" fill="${sh}"/>`;
      s += `<circle cx="${x}" cy="${row.y}" r="${row.rad}" fill="${pick(r, SKINS)}"/>`;
      s += `<path d="M${x - row.rad} ${row.y - 2}C${x - row.rad} ${row.y - row.rad - 4} ${x + row.rad} ${row.y - row.rad - 4} ${x + row.rad} ${row.y - 2}C${x + 4} ${row.y - row.rad * 0.55} ${x - 4} ${row.y - row.rad * 0.55} ${x - row.rad} ${row.y - 2}Z" fill="${pick(r, HAIRS)}"/>`;
    }
  });

  return s + "</svg>";
}
