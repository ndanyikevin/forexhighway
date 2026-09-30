import { createSignal, Show } from "solid-js";
import { A } from "@solidjs/router";
import {
    ArrowLeft,
    Check,
    ExternalLink,
} from "lucide-solid";

import {
    TextField,
    TextFieldInput,
    TextFieldLabel,
    TextFieldTextArea,
} from "~/components/ui/text-field";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

import { Button } from "~/components/ui/button";

import CurrencyPairCombobox from "~/components/journal/currency-pair-combobox";
import TimeframeCombobox from "~/components/journal/timeframe-combobox";

import {
    normalizeCurrencyPair,
} from "~/data/forex/currency-pairs";

import type {
    CreateJournalTradeInput,
    TradeDirection,
    TradeSession,
    TradeOutcome,
    TradeStatus,
} from "~/data/journal/trades";

interface JournalTradeFormProps {
    initialValues?: Partial<CreateJournalTradeInput>;

    title?: string;
    descriptionText?: string;
    submitLabel?: string;

    backHref?: string;
    backLabel?: string;

    onSubmit: (
        values: CreateJournalTradeInput,
    ) => void;
}

/**
 * Formats an ISO string (or empty string) to the
 * value format expected by <input type="datetime-local">.
 */
function toDateTimeLocal(value: string): string {
    if (!value) return "";
    return value.slice(0, 16);
}

export default function JournalTradeForm(
    props: JournalTradeFormProps,
) {
    const [symbol, setSymbol] = createSignal(
        props.initialValues?.symbol ?? "",
    );

    const [direction, setDirection] =
        createSignal<TradeDirection>(
            props.initialValues?.direction ?? "Buy",
        );

    const [status, setStatus] =
        createSignal<TradeStatus>(
            props.initialValues?.status ?? "Closed",
        );

    const [outcome, setOutcome] =
        createSignal<TradeOutcome>(
            props.initialValues?.outcome ?? "Pending",
        );

    const [timeframe, setTimeframe] =
        createSignal(
            props.initialValues?.timeframe ?? "1M",
        );

    const [session, setSession] =
        createSignal<TradeSession>(
            props.initialValues?.session ?? "London",
        );

    /*
     * Keep numeric values as strings while the
     * user is typing, and use plain text inputs
     * with inputmode="decimal" so the browser
     * does not normalize / rewrite the value on
     * every keystroke (which resets the caret).
     */
    const [entry, setEntry] = createSignal(
        props.initialValues?.entry?.toString() ?? "",
    );

    const [stopLoss, setStopLoss] =
        createSignal(
            props.initialValues?.stopLoss?.toString() ?? "",
        );

    const [takeProfit, setTakeProfit] =
        createSignal(
            props.initialValues?.takeProfit?.toString() ?? "",
        );

    const [exit, setExit] = createSignal(
        props.initialValues?.exit?.toString() ?? "",
    );

    const [riskPercent, setRiskPercent] =
        createSignal(
            props.initialValues?.riskPercent?.toString() ?? "",
        );

    const [resultR, setResultR] = createSignal(
        props.initialValues?.resultR?.toString() ?? "",
    );

    const [profitLoss, setProfitLoss] =
        createSignal(
            props.initialValues?.profitLoss?.toString() ?? "",
        );

    const [setup, setSetup] = createSignal(
        props.initialValues?.setup ?? "",
    );

    const [entryReason, setEntryReason] =
        createSignal(
            props.initialValues?.entryReason ?? "",
        );

    const [exitReason, setExitReason] =
        createSignal(
            props.initialValues?.exitReason ?? "",
        );

    const [notes, setNotes] = createSignal(
        props.initialValues?.notes ?? "",
    );

    const [tradingViewUrl, setTradingViewUrl] =
        createSignal(
            props.initialValues?.tradingViewUrl ?? "",
        );

    const [metaTraderUrl, setMetaTraderUrl] =
        createSignal(
            props.initialValues?.metaTraderUrl ?? "",
        );

    const [openedAt, setOpenedAt] =
        createSignal(
            toDateTimeLocal(
                props.initialValues?.openedAt ??
                new Date().toISOString(),
            ),
        );

    const [closedAt, setClosedAt] =
        createSignal(
            toDateTimeLocal(
                props.initialValues?.closedAt ?? "",
            ),
        );

    const [error, setError] =
        createSignal("");

    function parseRequiredNumber(
        value: string,
    ) {
        const number = Number(value);

        return Number.isFinite(number)
            ? number
            : undefined;
    }

    function parseOptionalNumber(
        value: string,
    ) {
        if (!value.trim()) {
            return undefined;
        }

        const number = Number(value);

        return Number.isFinite(number)
            ? number
            : undefined;
    }

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        setError("");

        const normalizedSymbol =
            normalizeCurrencyPair(
                symbol(),
            );

        const normalizedSetup =
            setup().trim();

        const normalizedEntryReason =
            entryReason().trim();

        const normalizedTradingViewUrl =
            tradingViewUrl().trim();

        const normalizedMetaTraderUrl =
            metaTraderUrl().trim();

        if (!normalizedSymbol) {
            setError(
                "Currency pair is required.",
            );
            return;
        }

        if (!normalizedSetup) {
            setError(
                "Trading setup is required.",
            );
            return;
        }

        if (!normalizedEntryReason) {
            setError(
                "Entry reason is required.",
            );
            return;
        }

        const parsedEntry =
            parseRequiredNumber(
                entry(),
            );

        if (parsedEntry === undefined) {
            setError(
                "Enter a valid entry price.",
            );
            return;
        }

        const parsedStopLoss =
            parseRequiredNumber(
                stopLoss(),
            );

        if (parsedStopLoss === undefined) {
            setError(
                "Enter a valid stop loss.",
            );
            return;
        }

        const parsedTakeProfit =
            parseRequiredNumber(
                takeProfit(),
            );

        if (parsedTakeProfit === undefined) {
            setError(
                "Enter a valid take profit.",
            );
            return;
        }

        const parsedRiskPercent =
            parseRequiredNumber(
                riskPercent(),
            );

        if (parsedRiskPercent === undefined) {
            setError(
                "Enter a valid risk percentage.",
            );
            return;
        }

        const parsedExit =
            parseOptionalNumber(
                exit(),
            );

        if (
            exit().trim() &&
            parsedExit === undefined
        ) {
            setError(
                "Enter a valid exit price.",
            );
            return;
        }

        const parsedResultR =
            parseOptionalNumber(
                resultR(),
            );

        if (
            resultR().trim() &&
            parsedResultR === undefined
        ) {
            setError(
                "Enter a valid R result.",
            );
            return;
        }

        const parsedProfitLoss =
            parseOptionalNumber(
                profitLoss(),
            );

        if (
            profitLoss().trim() &&
            parsedProfitLoss === undefined
        ) {
            setError(
                "Enter a valid profit or loss amount.",
            );
            return;
        }

        if (
            !normalizedTradingViewUrl &&
            !normalizedMetaTraderUrl
        ) {
            setError(
                "At least one analysis chart is required. Provide a TradingView or MetaTrader chart.",
            );
            return;
        }

        const values: CreateJournalTradeInput = {
            symbol: normalizedSymbol,

            direction: direction(),
            status: status(),
            outcome: outcome(),
            timeframe: timeframe().trim(),
            session: session(),

            entry: parsedEntry,
            stopLoss: parsedStopLoss,
            takeProfit: parsedTakeProfit,

            exit: parsedExit,

            riskPercent:
                parsedRiskPercent,

            resultR: parsedResultR,

            profitLoss:
                parsedProfitLoss,

            setup: normalizedSetup,

            entryReason:
                normalizedEntryReason,

            exitReason:
                exitReason().trim() ||
                undefined,

            notes:
                notes().trim() ||
                undefined,

            tradingViewUrl:
                normalizedTradingViewUrl ||
                undefined,

            metaTraderUrl:
                normalizedMetaTraderUrl ||
                undefined,

            openedAt: openedAt(),

            closedAt:
                closedAt().trim() ||
                undefined,
        };

        try {
            props.onSubmit(values);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to save trade.",
            );
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            class="space-y-6"
        >
            {/* Header */}
            <div class="flex items-center gap-2">
                <Button
                    as={A}
                    href={
                        props.backHref ??
                        "/dashboard/journal"
                    }
                    variant="ghost"
                    size="sm"
                    type="button"
                    class="-ml-2"
                >
                    <ArrowLeft class="mr-2 size-4" />
                    {props.backLabel ??
                        "Journal"}
                </Button>
            </div>

            <div>
                <h1 class="text-2xl font-bold tracking-tight">
                    {props.title ??
                        "Record Trade"}
                </h1>

                <p class="mt-1 text-muted-foreground">
                    {props.descriptionText ??
                        "Record the trade, reasoning and chart analysis behind your decision."}
                </p>
            </div>

            {/* Trade Information */}
            <section class="max-w-4xl rounded-xl border border-border bg-card p-6">
                <div class="mb-6">
                    <h2 class="font-semibold">
                        Trade Information
                    </h2>

                    <p class="mt-1 text-sm text-muted-foreground">
                        Describe the market and setup.
                    </p>
                </div>

                <div class="grid gap-5 md:grid-cols-2">
                    <div class="space-y-2">
                        <label class="text-sm font-medium">
                            Currency Pair
                        </label>

                        <CurrencyPairCombobox
                            value={symbol()}
                            onChange={setSymbol}
                        />

                        <p class="text-xs text-muted-foreground">
                            Search a pair or enter a custom symbol.
                        </p>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-medium">
                            Direction
                        </label>

                        <div class="grid grid-cols-2 gap-2">
                            {(
                                [
                                    "Buy",
                                    "Sell",
                                ] as TradeDirection[]
                            ).map((value) => (
                                <label class="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50">
                                    <input
                                        type="radio"
                                        name="direction"
                                        value={value}
                                        checked={
                                            direction() ===
                                            value
                                        }
                                        onChange={() =>
                                            setDirection(
                                                value,
                                            )
                                        }
                                        class="accent-primary"
                                    />

                                    <span class="text-sm font-medium">
                                        {value}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-medium">
                            Timeframe
                        </label>

                        <TimeframeCombobox
                            value={timeframe()}
                            onChange={setTimeframe}
                        />

                        <p class="text-xs text-muted-foreground">
                            MT5 trading timeframe.
                        </p>
                    </div>

                    <Select<TradeSession>
                        value={session()}
                        onChange={(value) => {
                            if (value) {
                                setSession(value);
                            }
                        }}
                        options={[
                            "Asian",
                            "London",
                            "New York",
                            "Sydney",
                        ]}
                        itemComponent={(itemProps) => (
                            <SelectItem item={itemProps.item}>
                                {itemProps.item.rawValue}
                            </SelectItem>
                        )}
                    >
                        <SelectTrigger class="w-full">
                            <SelectValue<TradeSession>>
                                {(state) => state.selectedOption()}
                            </SelectValue>
                        </SelectTrigger>

                        <SelectContent />
                    </Select>

                    <TextField>
                        <TextFieldLabel>
                            Setup
                        </TextFieldLabel>

                        <TextFieldInput
                            value={setup()}
                            onInput={(event) =>
                                setSetup(
                                    event.currentTarget.value,
                                )
                            }
                            placeholder="e.g. Liquidity Sweep"
                        />
                    </TextField>

                    <div class="space-y-2">
                        <label class="text-sm font-medium">
                            Status
                        </label>

                        <div class="grid grid-cols-2 gap-2">
                            {(
                                [
                                    "Open",
                                    "Closed",
                                ] as TradeStatus[]
                            ).map((value) => (
                                <label class="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50">
                                    <input
                                        type="radio"
                                        name="status"
                                        value={value}
                                        checked={
                                            status() ===
                                            value
                                        }
                                        onChange={() =>
                                            setStatus(
                                                value,
                                            )
                                        }
                                        class="accent-primary"
                                    />

                                    <span class="text-sm font-medium">
                                        {value}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Execution & Risk */}
            <section class="max-w-4xl rounded-xl border border-border bg-card p-6">
                <div class="mb-6">
                    <h2 class="font-semibold">
                        Execution & Risk
                    </h2>

                    <p class="mt-1 text-sm text-muted-foreground">
                        Record your execution and risk parameters.
                    </p>
                </div>

                <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <TextField>
                        <TextFieldLabel>
                            Entry
                        </TextFieldLabel>

                        <TextFieldInput
                            type="text"
                            inputmode="decimal"
                            autocomplete="off"
                            value={entry()}
                            onInput={(event) =>
                                setEntry(
                                    event.currentTarget.value,
                                )
                            }
                            placeholder="0.00000"
                        />
                    </TextField>

                    <TextField>
                        <TextFieldLabel>
                            Stop Loss
                        </TextFieldLabel>

                        <TextFieldInput
                            type="text"
                            inputmode="decimal"
                            autocomplete="off"
                            value={stopLoss()}
                            onInput={(event) =>
                                setStopLoss(
                                    event.currentTarget.value,
                                )
                            }
                            placeholder="0.00000"
                        />
                    </TextField>

                    <TextField>
                        <TextFieldLabel>
                            Take Profit
                        </TextFieldLabel>

                        <TextFieldInput
                            type="text"
                            inputmode="decimal"
                            autocomplete="off"
                            value={takeProfit()}
                            onInput={(event) =>
                                setTakeProfit(
                                    event.currentTarget.value,
                                )
                            }
                            placeholder="0.00000"
                        />
                    </TextField>

                    <TextField>
                        <TextFieldLabel>
                            Exit
                        </TextFieldLabel>

                        <TextFieldInput
                            type="text"
                            inputmode="decimal"
                            autocomplete="off"
                            value={exit()}
                            onInput={(event) =>
                                setExit(
                                    event.currentTarget.value,
                                )
                            }
                            placeholder="Optional"
                        />
                    </TextField>

                    <TextField>
                        <TextFieldLabel>
                            Risk %
                        </TextFieldLabel>

                        <TextFieldInput
                            type="text"
                            inputmode="decimal"
                            autocomplete="off"
                            value={riskPercent()}
                            onInput={(event) =>
                                setRiskPercent(
                                    event.currentTarget.value,
                                )
                            }
                            placeholder="e.g. 2"
                        />
                    </TextField>

                    <TextField>
                        <TextFieldLabel>
                            Result (R)
                        </TextFieldLabel>

                        <TextFieldInput
                            type="text"
                            inputmode="decimal"
                            autocomplete="off"
                            value={resultR()}
                            onInput={(event) =>
                                setResultR(
                                    event.currentTarget.value,
                                )
                            }
                            placeholder="e.g. 2"
                        />
                    </TextField>

                    <TextField>
                        <TextFieldLabel>
                            Profit / Loss
                        </TextFieldLabel>

                        <TextFieldInput
                            type="text"
                            inputmode="decimal"
                            autocomplete="off"
                            value={profitLoss()}
                            onInput={(event) =>
                                setProfitLoss(
                                    event.currentTarget.value,
                                )
                            }
                            placeholder="e.g. 84.50"
                        />
                    </TextField>
                </div>

                <div class="mt-5">
                    <label class="text-sm font-medium">
                        Outcome
                    </label>

                    <div class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {(
                            [
                                "Win",
                                "Loss",
                                "Breakeven",
                                "Pending",
                            ] as TradeOutcome[]
                        ).map((value) => (
                            <label class="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50">
                                <input
                                    type="radio"
                                    name="outcome"
                                    value={value}
                                    checked={
                                        outcome() ===
                                        value
                                    }
                                    onChange={() =>
                                        setOutcome(
                                            value,
                                        )
                                    }
                                    class="accent-primary"
                                />

                                <span class="text-sm font-medium">
                                    {value}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trade Reasoning */}
            <section class="max-w-4xl rounded-xl border border-border bg-card p-6">
                <div class="mb-6">
                    <h2 class="font-semibold">
                        Trade Reasoning
                    </h2>

                    <p class="mt-1 text-sm text-muted-foreground">
                        Document why you entered and how the trade developed.
                    </p>
                </div>

                <div class="space-y-5">
                    <TextField>
                        <TextFieldLabel>
                            Entry Reason
                        </TextFieldLabel>

                        <TextFieldTextArea
                            value={entryReason()}
                            onInput={(event) =>
                                setEntryReason(
                                    event.currentTarget.value,
                                )
                            }
                            placeholder="Why did you enter this trade?"
                            rows={4}
                        />
                    </TextField>

                    <TextField>
                        <TextFieldLabel>
                            Exit Reason
                        </TextFieldLabel>

                        <TextFieldTextArea
                            value={exitReason()}
                            onInput={(event) =>
                                setExitReason(
                                    event.currentTarget.value,
                                )
                            }
                            placeholder="Why did you exit?"
                            rows={3}
                        />
                    </TextField>

                    <TextField>
                        <TextFieldLabel>
                            Notes
                        </TextFieldLabel>

                        <TextFieldTextArea
                            value={notes()}
                            onInput={(event) =>
                                setNotes(
                                    event.currentTarget.value,
                                )
                            }
                            placeholder="What did you learn from this trade?"
                            rows={4}
                        />
                    </TextField>
                </div>
            </section>

            {/* Chart Analysis */}
            <section class="max-w-4xl rounded-xl border border-border bg-card p-6">
                <div class="mb-6">
                    <h2 class="font-semibold">
                        Chart Analysis
                    </h2>

                    <p class="mt-1 text-sm text-muted-foreground">
                        Attach the chart analysis behind your trade.
                        At least one chart is required.
                    </p>
                </div>

                <div class="space-y-5">
                    <TextField>
                        <TextFieldLabel>
                            TradingView URL
                        </TextFieldLabel>

                        <TextFieldInput
                            type="url"
                            value={tradingViewUrl()}
                            onInput={(event) =>
                                setTradingViewUrl(
                                    event.currentTarget.value,
                                )
                            }
                            placeholder="https://www.tradingview.com/chart/..."
                        />

                        <Show
                            when={tradingViewUrl().trim()}
                        >
                            <a
                                href={tradingViewUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="mt-2 inline-flex items-center text-sm text-primary hover:underline"
                            >
                                Open TradingView chart
                                <ExternalLink class="ml-1 size-3" />
                            </a>
                        </Show>
                    </TextField>

                    <TextField>
                        <TextFieldLabel>
                            MetaTrader URL
                        </TextFieldLabel>

                        <TextFieldInput
                            type="url"
                            value={metaTraderUrl()}
                            onInput={(event) =>
                                setMetaTraderUrl(
                                    event.currentTarget.value,
                                )
                            }
                            placeholder="https://charts.mql5.com/..."
                        />

                        <Show
                            when={metaTraderUrl().trim()}
                        >
                            <a
                                href={metaTraderUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="mt-2 inline-flex items-center text-sm text-primary hover:underline"
                            >
                                Open MetaTrader chart
                                <ExternalLink class="ml-1 size-3" />
                            </a>
                        </Show>
                    </TextField>

                    <div class="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
                        Provide at least one TradingView
                        or MetaTrader chart so the trade
                        can be reviewed later.
                    </div>
                </div>
            </section>

            {/* Dates */}
            <section class="max-w-4xl rounded-xl border border-border bg-card p-6">
                <div class="mb-6">
                    <h2 class="font-semibold">
                        Trade Timing
                    </h2>
                </div>

                <div class="grid gap-5 md:grid-cols-2">
                    <TextField>
                        <TextFieldLabel>
                            Opened At
                        </TextFieldLabel>

                        <TextFieldInput
                            type="datetime-local"
                            value={openedAt()}
                            onInput={(event) =>
                                setOpenedAt(
                                    event.currentTarget.value,
                                )
                            }
                        />
                    </TextField>

                    <TextField>
                        <TextFieldLabel>
                            Closed At
                        </TextFieldLabel>

                        <TextFieldInput
                            type="datetime-local"
                            value={closedAt()}
                            onInput={(event) =>
                                setClosedAt(
                                    event.currentTarget.value,
                                )
                            }
                        />
                    </TextField>
                </div>
            </section>

            {/* Error */}
            <Show when={error()}>
                <div class="max-w-4xl rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error()}
                </div>
            </Show>

            {/* Actions */}
            <div class="flex max-w-4xl items-center justify-end gap-3 border-t border-border pt-6">
                <Button
                    as={A}
                    href={
                        props.backHref ??
                        "/dashboard/journal"
                    }
                    variant="outline"
                    type="button"
                >
                    Cancel
                </Button>

                <Button type="submit">
                    <Check class="mr-2 size-4" />
                    {props.submitLabel ??
                        "Save Trade"}
                </Button>
            </div>
        </form>
    );
}