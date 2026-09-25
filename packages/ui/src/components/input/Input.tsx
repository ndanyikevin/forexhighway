import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { cx } from '../../lib/cx'
import './input.scss'

export interface InputProps
    extends JSX.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    description?: string
    error?: string
}

export function Input(props: InputProps) {
    const [local, inputProps] = splitProps(props, [
        'label',
        'description',
        'error',
        'id',
        'class',
        'required',
    ])

    const inputId = () => local.id
    const descriptionId = () =>
        inputId() ? `${inputId()}-description` : undefined
    const errorId = () =>
        inputId() ? `${inputId()}-error` : undefined

    const describedBy = () => {
        const ids = []

        if (local.description) {
            ids.push(descriptionId())
        }

        if (local.error) {
            ids.push(errorId())
        }

        return ids.length > 0 ? ids.join(' ') : undefined
    }

    return (
        <div class="fh-input">
            {local.label && (
                <label
                    class="fh-input__label"
                    for={inputId()}
                >
                    {local.label}

                    {local.required && (
                        <span
                            class="fh-input__required"
                            aria-hidden="true"
                        >
                            *
                        </span>
                    )}
                </label>
            )}

            <input
                {...inputProps}
                id={inputId()}
                class={cx(
                    'fh-input__control',
                    local.error && 'fh-input__control--error',
                    local.class,
                )}
                required={local.required}
                aria-invalid={local.error ? 'true' : undefined}
                aria-describedby={describedBy()}
            />

            {local.description && !local.error && (
                <p
                    id={descriptionId()}
                    class="fh-input__description"
                >
                    {local.description}
                </p>
            )}

            {local.error && (
                <p
                    id={errorId()}
                    class="fh-input__error"
                    role="alert"
                >
                    {local.error}
                </p>
            )}
        </div>
    )
}