
import { createMemo, createSignal } from "solid-js";

import {
    Combobox,
    ComboboxContent,
    ComboboxControl,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxItemLabel,
    ComboboxTrigger,
} from "~/components/ui/combobox";

import {
    mt5Timeframes,
    normalizeTimeframe,
} from "~/data/forex/timeframes";

interface TimeframeComboboxProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export default function TimeframeCombobox(
    props: TimeframeComboboxProps,
) {
    const [inputValue, setInputValue] =
        createSignal(props.value);

    const options = createMemo(() => {
        const query =
            normalizeTimeframe(inputValue());

        if (
            query &&
            !mt5Timeframes.includes(
                query as (typeof mt5Timeframes)[number],
            )
        ) {
            return [
                query,
                ...mt5Timeframes,
            ];
        }

        return [...mt5Timeframes];
    });

    function handleInputChange(
        value: string,
    ) {
        const normalized =
            normalizeTimeframe(value);

        setInputValue(normalized);
        props.onChange(normalized);
    }

    function handleChange(
        value: string | null,
    ) {
        const normalized =
            normalizeTimeframe(
                value ?? "",
            );

        setInputValue(normalized);
        props.onChange(normalized);
    }

    return (
        <Combobox<string>
            options={options()}
            value={props.value || ""}
            onChange={handleChange}
            onInputChange={handleInputChange}
            defaultFilter="contains"
            allowsEmptyCollection
            placeholder="Search timeframe..."
            disabled={props.disabled}
            itemComponent={(itemProps) => (
                <ComboboxItem
                    item={itemProps.item}
                >
                    <ComboboxItemLabel>
                        {itemProps.item.rawValue}
                    </ComboboxItemLabel>

                    <ComboboxItemIndicator />
                </ComboboxItem>
            )}
        >
            <ComboboxControl
                aria-label="Timeframe"
                class="w-full"
            >
                <ComboboxInput />
                <ComboboxTrigger />
            </ComboboxControl>

            <ComboboxContent />
        </Combobox>
    );
}
