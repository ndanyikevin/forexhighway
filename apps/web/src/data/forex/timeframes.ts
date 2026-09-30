export const mt5Timeframes = [
    "M1",
    "M2",
    "M3",
    "M4",
    "M5",
    "M6",
    "M10",
    "M12",
    "M15",
    "M20",
    "M30",
    "H1",
    "H2",
    "H3",
    "H4",
    "H6",
    "H8",
    "H12",
    "D1",
    "W1",
    "MN1",
] as const;

export type MT5Timeframe =
    (typeof mt5Timeframes)[number];

export function normalizeTimeframe(
    value: string,
) {
    return value
        .trim()
        .replace(/\s+/g, "")
        .toUpperCase();
}