import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { cx } from '../../lib/cx'
import './field.scss'

export interface FieldProps extends JSX.HTMLAttributes<HTMLDivElement> {
    label?: string
    description?: string
    error?: string
    required?: boolean
}

export function Field(props: FieldProps) {
    const [local, fieldProps] = splitProps(props, [
        'label',
        'description',
        'error',
        'required',
        'children',
        'class',
    ])

    return (
        <div {...fieldProps} class={cx('fh-field', local.class)}>
            {local.label && (
                <div class="fh-field__label">
                    {local.label}

                    {local.required && (
                        <span
                            class="fh-field__required"
                            aria-hidden="true"
                        >
                            {' '}
                            *
                        </span>
                    )}
                </div>
            )}

            <div class="fh-field__control">
                {local.children}
            </div>

            {local.description && !local.error && (
                <p class="fh-field__description">
                    {local.description}
                </p>
            )}

            {local.error && (
                <p class="fh-field__error" role="alert">
                    {local.error}
                </p>
            )}
        </div>
    )
}