
import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";

import JournalTradeForm from "~/components/journal/journal-trade-form";

import {
    createJournalTrade,
} from "~/data/journal/trades";

export default function NewTradePage() {
    const navigate = useNavigate();

    const [error, setError] =
        createSignal("");

    function handleCreateTrade(
        values: Parameters<
            typeof createJournalTrade
        >[0],
    ) {
        try {
            setError("");

            const trade =
                createJournalTrade(values);

            navigate(
                `/ dashboard / journal / ${ trade.id } `,
            );
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to save trade.",
            );
        }
    }

    return (
        <>
            <Title>
                Record Trade | Journal | ForexHighway
            </Title>

            <main class="p-6">
                <div class="mx-auto max-w-7xl">
                    {error() && (
                        <div class="mb-6 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                            {error()}
                        </div>
                    )}

                    <JournalTradeForm
                        title="Record Trade"
                        descriptionText="Document your trade, reasoning and chart analysis."
                        submitLabel="Save Trade"
                        onSubmit={handleCreateTrade}
                    />
                </div>
            </main>
        </>
    );
}

