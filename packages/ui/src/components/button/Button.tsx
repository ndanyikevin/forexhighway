import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import './button.scss'
import { cx } from '../../lib/cx'

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'ghost'
    | 'outline'

export type ButtonSize =
    | 'sm'
    | 'md'
    | 'lg'

export interface ButtonProps
    extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    loading?: boolean
    fullWidth?: boolean
}

export function Button(props: ButtonProps) {
    const [local, buttonProps] = splitProps(props, [
        'variant',
        'size',
        'loading',
        'fullWidth',
        'children',
        'disabled',
        'class',
    ])

    const variant = () => local.variant ?? 'primary'
    const size = () => local.size ?? 'md'
    const disabled = () => local.disabled || local.loading

    return (
        <button
            {...buttonProps}
            class={cx(
                'fh-button',
                `fh-button--${variant()}`,
                `fh-button--${size()}`,
                local.fullWidth && 'fh-button--full-width',
                local.class 
            )}
            disabled={disabled()}
            aria-busy={local.loading || undefined}
        >
            {local.loading && (
                <span
                    class="fh-button__spinner"
                    aria-hidden="true"
                />
            )}

            <span class="fh-button__content">
                {local.loading ? 'Loading…' : local.children}
            </span>
        </button>
    )
}