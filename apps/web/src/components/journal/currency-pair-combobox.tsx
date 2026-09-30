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
    currencyPairs,
    normalizeCurrencyPair,
} from "~/data/forex/currency-pairs";

interface CurrencyPairComboboxProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export default function CurrencyPairCombobox(
    props: CurrencyPairComboboxProps,
) {
    const [inputValue, setInputValue] =
        createSignal(props.value);

    const options = createMemo(() => {
        const query =
            normalizeCurrencyPair(
                inputValue(),
            );

        if (
            query &&
            !currencyPairs.includes(
                query as (typeof currencyPairs)[number],
            )
        ) {
            return [
                query,
                ...currencyPairs,
            ];
        }

        return [...currencyPairs];
    });

    function handleInputChange(
        value: string,
    ) {
        const normalized =
            normalizeCurrencyPair(value);

        setInputValue(normalized);

        props.onChange(normalized);
    }

    function handleChange(
        value: string | null,
    ) {
        const normalized =
            normalizeCurrencyPair(
                value ?? "",
            );

        setInputValue(normalized);

        props.onChange(normalized);
    }

    return (
        <Combobox<string>
            options={[...options()]}
            value={props.value || ""}
            onChange={handleChange}
            onInputChange={handleInputChange}
            defaultFilter="contains"
            allowsEmptyCollection
            placeholder="Search currency pair..."
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
                aria-label="Currency pair"
                class="w-full"
            >
                <ComboboxInput />

                <ComboboxTrigger />
            </ComboboxControl>

            <ComboboxContent />
        </Combobox>
    );
}