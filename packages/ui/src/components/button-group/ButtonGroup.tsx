import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { cx } from '../../lib/cx'
import './button-group.scss'

export type ButtonGroupOrientation =
    | 'horizontal'
    | 'vertical'

export interface ButtonGroupProps
    extends JSX.HTMLAttributes<HTMLDivElement> {
    orientation?: ButtonGroupOrientation
}

export function ButtonGroup(props: ButtonGroupProps) {
    const [local, groupProps] = splitProps(props, [
        'orientation',
        'children',
        'class',
    ])

    const orientation = () => local.orientation ?? 'horizontal'

    return (
        <div
            {...groupProps}
            class={cx(
                'fh-button-group',
                `fh-button-group--${orientation()}`,
                local.class,
            )}
            role="group"
        >
            {local.children}
        </div>
    )
}