import { Show } from "solid-js";
import { Title } from "@solidjs/meta";
import {
    A,
    useNavigate,
    useParams,
} from "@solidjs/router";

import {
    ArrowLeft,
    BookOpen,
} from "lucide-solid";

import { Button } from "~/components/ui/button";

import JournalTradeForm from "~/components/journal/journal-trade-form";

import {
    getJournalTrade,
    updateJournalTrade,
} from "~/data/journal/trades";

export default function EditJournalTradePage() {
    const params = useParams();
    const navigate = useNavigate();

    const tradeId = Number(
        params.tradeId,
    );

    const trade =
        Number.isInteger(tradeId)
            ? getJournalTrade(tradeId)
            : undefined;

    function handleUpdateTrade(
        values: Parameters<
            typeof updateJournalTrade
        >[1],
    ) {
        const updatedTrade =
            updateJournalTrade(
                tradeId,
                values,
            );

        if (!updatedTrade) {
            return;
        }

        navigate(
            `/dashboard/journal/${ tradeId }`,
        );
    }

    return (
        <>
            <Title>
                {trade
                    ? `Edit ${ trade.symbol } Trade`
                    : "Edit Trade"}{" "}
                | Journal | ForexHighway
            </Title>

            <Show
                when={trade}
                fallback={
                    <main class="p-6">
                        <div class="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
                            <div class="rounded-full border border-border bg-muted p-4">
                                <BookOpen class="size-6 text-muted-foreground" />
                            </div>

                            <h1 class="mt-4 text-2xl font-bold">
                                Trade not found
                            </h1>

                            <p class="mt-2 text-muted-foreground">
                                The trade with ID "
                                {params.tradeId}"
                                could not be found.
                            </p>

                            <Button
                                as={A}
                                href="/dashboard/journal/trades"
                                variant="outline"
                                class="mt-6"
                            >
                                <ArrowLeft class="mr-2 size-4" />
                                Back to Trades
                            </Button>
                        </div>
                    </main>
                }
            >
                {(currentTrade) => (
                    <main class="p-6">
                        <div class="mx-auto max-w-7xl">
                            <JournalTradeForm
                                initialValues={{
                                    symbol:
                                        currentTrade()
                                            .symbol,

                                    direction:
                                        currentTrade()
                                            .direction,

                                    status:
                                        currentTrade()
                                            .status,

                                    outcome:
                                        currentTrade()
                                            .outcome,

                                    timeframe:
                                        currentTrade()
                                            .timeframe,

                                    session:
                                        currentTrade()
                                            .session,

                                    entry:
                                        currentTrade()
                                            .entry,

                                    stopLoss:
                                        currentTrade()
                                            .stopLoss,

                                    takeProfit:
                                        currentTrade()
                                            .takeProfit,

                                    exit:
                                        currentTrade()
                                            .exit,

                                    riskPercent:
                                        currentTrade()
                                            .riskPercent,

                                    resultR:
                                        currentTrade()
                                            .resultR,

                                    profitLoss:
                                        currentTrade()
                                            .profitLoss,

                                    setup:
                                        currentTrade()
                                            .setup,

                                    entryReason:
                                        currentTrade()
                                            .entryReason,

                                    exitReason:
                                        currentTrade()
                                            .exitReason,

                                    notes:
                                        currentTrade()
                                            .notes,

                                    tradingViewUrl:
                                        currentTrade()
                                            .tradingViewUrl,

                                    metaTraderUrl:
                                        currentTrade()
                                            .metaTraderUrl,

                                    openedAt:
                                        currentTrade()
                                            .openedAt,

                                    closedAt:
                                        currentTrade()
                                            .closedAt,
                                }}
                                title="Edit Trade"
                                descriptionText="Update the details, execution and analysis of this trade."
                                submitLabel="Save Changes"
                                backHref={`/ dashboard / journal / ${ currentTrade().id } `}
                                backLabel="Trade"
                                onSubmit={
                                    handleUpdateTrade
                                }
                            />
                        </div>
                    </main>
                )}
            </Show>
        </>
    );
}

