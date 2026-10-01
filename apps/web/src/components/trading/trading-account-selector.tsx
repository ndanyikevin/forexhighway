
import type { TradingAccount } from "~/data/trading/trading";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

interface TradingAccountSelectorProps {
    accounts: TradingAccount[];
    value: number;
    onChange: (accountId: number) => void;
}

export default function TradingAccountSelector(
    props: TradingAccountSelectorProps,
) {
    return (
        <Select<string>
            value={props.value.toString()}
            onChange={(value) => {
                if (value) {
                    props.onChange(Number(value));
                }
            }}
            options={props.accounts.map(
                (account) =>
                    account.id.toString(),
            )}
            itemComponent={(itemProps) => {
                const account =
                    props.accounts.find(
                        (item) =>
                            item.id ===
                            Number(
                                itemProps.item.rawValue,
                            ),
                    );

                return (
                    <SelectItem
                        item={itemProps.item}
                    >
                        {account
                            ? `${ account.broker } — ${ account.accountNumber } `
                            : itemProps.item.rawValue}
                    </SelectItem>
                );
            }}
        >
            <SelectTrigger class="w-full sm:w-[280px]">
                <SelectValue<string>>
                    {(state) => {
                        const account =
                            props.accounts.find(
                                (item) =>
                                    item.id ===
                                    props.value,
                            );

                        return account
                            ? (
                                <div class="flex min-w-0 items-center gap-2">
                                    <span class="truncate font-medium">
                                        {account.broker}
                                    </span>

                                    <span class="text-muted-foreground">
                                        ·
                                    </span>

                                    <span class="truncate text-muted-foreground">
                                        {
                                            account.accountNumber
                                        }
                                    </span>
                                </div>
                            )
                            : (
                                "Select account"
                            );
                    }}
                </SelectValue>
            </SelectTrigger>

            <SelectContent />
        </Select>
    );
}

