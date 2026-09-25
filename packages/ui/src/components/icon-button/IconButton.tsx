import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { cx } from '../../lib/cx'
import './icon-button.scss'

export type IconButtonVariant =
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'ghost'
    | 'outline'

export type IconButtonSize =
    | 'sm'
    | 'md'
    | 'lg'

export interface IconButtonProps
    extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: IconButtonVariant
    size?: IconButtonSize
    loading?: boolean
}

export function IconButton(props: IconButtonProps) {
    const [local, buttonProps] = splitProps(props, [
        'variant',
        'size',
        'loading',
        'children',
        'disabled',
        'class',
    ])

    const variant = () => local.variant ?? 'ghost'
    const size = () => local.size ?? 'md'
    const disabled = () => local.disabled || local.loading

    return (
        <button
            {...buttonProps}
            class={cx(
                'fh-icon-button',
                `fh-icon-button--${variant()}`,
                `fh-icon-button--${size()}`,
                local.class,
            )}
            disabled={disabled()}
            aria-busy={local.loading || undefined}
        >
            {local.loading ? (
                <span
                    class="fh-icon-button__spinner"
                    aria-hidden="true"
                />
            ) : (
                local.children
            )}
        </button>
    )
}