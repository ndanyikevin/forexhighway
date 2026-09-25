import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { cx } from '../../lib/cx'
import './textarea.scss'

export interface TextareaProps
    extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    description?: string
    error?: string
}

export function Textarea(props: TextareaProps) {
    const [local, textareaProps] = splitProps(props, [
        'label',
        'description',
        'error',
        'id',
        'class',
        'required',
    ])

    const textareaId = () => local.id

    const descriptionId = () =>
        textareaId() ? `${textareaId()}-description` : undefined

    const errorId = () =>
        textareaId() ? `${textareaId()}-error` : undefined

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
        <div class="fh-textarea">
            {local.label && (
                <label
                    class="fh-textarea__label"
                    for={textareaId()}
                >
                    {local.label}

                    {local.required && (
                        <span
                            class="fh-textarea__required"
                            aria-hidden="true"
                        >
                            *
                        </span>
                    )}
                </label>
            )}

            <textarea
                {...textareaProps}
                id={textareaId()}
                class={cx(
                    'fh-textarea__control',
                    local.error && 'fh-textarea__control--error',
                    local.class,
                )}
                required={local.required}
                aria-invalid={local.error ? 'true' : undefined}
                aria-describedby={describedBy()}
            />

            {local.description && !local.error && (
                <p
                    id={descriptionId()}
                    class="fh-textarea__description"
                >
                    {local.description}
                </p>
            )}

            {local.error && (
                <p
                    id={errorId()}
                    class="fh-textarea__error"
                    role="alert"
                >
                    {local.error}
                </p>
            )}
        </div>
    )
}