export const currencyPairs = [
    "AUDCAD",
    "AUDCHF",
    "AUDJPY",
    "AUDNZD",
    "AUDUSD",

    "CADCHF",
    "CADJPY",

    "CHFJPY",

    "EURAUD",
    "EURCAD",
    "EURCHF",
    "EURGBP",
    "EURJPY",
    "EURNZD",
    "EURUSD",

    "GBPAUD",
    "GBPCAD",
    "GBPCHF",
    "GBPJPY",
    "GBPNZD",
    "GBPUSD",

    "NZDCAD",
    "NZDCHF",
    "NZDJPY",
    "NZDUSD",

    "USDCAD",
    "USDCHF",
    "USDJPY",
] as const;

export type CurrencyPair =
    (typeof currencyPairs)[number];

export function normalizeCurrencyPair(
    value: string,
) {
    return value
        .trim()
        .replace(/\s+/g, "")
        .toUpperCase();
}