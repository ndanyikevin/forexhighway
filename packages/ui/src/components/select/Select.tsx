import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { cx } from '../../lib/cx'
import './select.scss'

export interface SelectProps
    extends JSX.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    description?: string
    error?: string
}

export function Select(props: SelectProps) {
    const [local, selectProps] = splitProps(props, [
        'label',
        'description',
        'error',
        'id',
        'class',
        'required',
    ])

    const selectId = () => local.id

    const descriptionId = () =>
        selectId() ? `${selectId()}-description` : undefined

    const errorId = () =>
        selectId() ? `${selectId()}-error` : undefined

    const describedBy = () => {
        const ids: string[] = []

        if (local.description) {
            ids.push(descriptionId()!)
        }

        if (local.error) {
            ids.push(errorId()!)
        }

        return ids.length > 0 ? ids.join(' ') : undefined
    }

    return (
        <div class="fh-select">
            {local.label && (
                <label
                    class="fh-select__label"
                    for={selectId()}
                >
                    {local.label}

                    {local.required && (
                        <span
                            class="fh-select__required"
                            aria-hidden="true"
                        >
                            *
                        </span>
                    )}
                </label>
            )}

            <select
                {...selectProps}
                id={selectId()}
                class={cx(
                    'fh-select__control',
                    local.error && 'fh-select__control--error',
                    local.class,
                )}
                required={local.required}
                aria-invalid={local.error ? 'true' : undefined}
                aria-describedby={describedBy()}
            />

            {local.description && !local.error && (
                <p
                    id={descriptionId()}
                    class="fh-select__description"
                >
                    {local.description}
                </p>
            )}

            {local.error && (
                <p
                    id={errorId()}
                    class="fh-select__error"
                    role="alert"
                >
                    {local.error}
                </p>
            )}
        </div>
    )
}