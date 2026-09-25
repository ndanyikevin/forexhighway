import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { cx } from '../../lib/cx'
import './checkbox.scss'

export interface CheckboxProps
    extends JSX.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    description?: string
    error?: string
}

export function Checkbox(props: CheckboxProps) {
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
        <div class="fh-checkbox">
            <label class="fh-checkbox__label" for={inputId()}>
                <input
                    {...inputProps}
                    type="checkbox"
                    id={inputId()}
                    class={cx(
                        'fh-checkbox__control',
                        local.error && 'fh-checkbox__control--error',
                        local.class,
                    )}
                    required={local.required}
                    aria-invalid={local.error ? 'true' : undefined}
                    aria-describedby={describedBy()}
                />

                <span>
                    {local.label}

                    {local.required && (
                        <span
                            class="fh-checkbox__required"
                            aria-hidden="true"
                        >
                            {' '}
                            *
                        </span>
                    )}
                </span>
            </label>

            {local.description && !local.error && (
                <p
                    id={descriptionId()}
                    class="fh-checkbox__description"
                >
                    {local.description}
                </p>
            )}

            {local.error && (
                <p
                    id={errorId()}
                    class="fh-checkbox__error"
                    role="alert"
                >
                    {local.error}
                </p>
            )}
        </div>
    )
}