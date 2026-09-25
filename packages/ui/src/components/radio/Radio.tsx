import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { cx } from '../../lib/cx'
import './radio.scss'

export interface RadioProps
    extends JSX.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    description?: string
    error?: string
}

export function Radio(props: RadioProps) {
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
        <div class="fh-radio">
            <label class="fh-radio__label" for={inputId()}>
                <input
                    {...inputProps}
                    type="radio"
                    id={inputId()}
                    class={cx(
                        'fh-radio__control',
                        local.error && 'fh-radio__control--error',
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
                            class="fh-radio__required"
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
                    class="fh-radio__description"
                >
                    {local.description}
                </p>
            )}

            {local.error && (
                <p
                    id={errorId()}
                    class="fh-radio__error"
                    role="alert"
                >
                    {local.error}
                </p>
            )}
        </div>
    )
}