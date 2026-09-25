import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { cx } from '../../lib/cx'
import './card.scss'

export interface CardProps
    extends JSX.HTMLAttributes<HTMLDivElement> { }

export interface CardHeaderProps
    extends JSX.HTMLAttributes<HTMLDivElement> { }

export interface CardTitleProps
    extends JSX.HTMLAttributes<HTMLHeadingElement> { }

export interface CardDescriptionProps
    extends JSX.HTMLAttributes<HTMLParagraphElement> { }

export interface CardContentProps
    extends JSX.HTMLAttributes<HTMLDivElement> { }

export interface CardFooterProps
    extends JSX.HTMLAttributes<HTMLDivElement> { }

function Card(props: CardProps) {
    const [local, cardProps] = splitProps(props, [
        'children',
        'class',
    ])

    return (
        <div
            {...cardProps}
            class={cx('fh-card', local.class)}
        >
            {local.children}
        </div>
    )
}

function CardHeader(props: CardHeaderProps) {
    const [local, headerProps] = splitProps(props, [
        'children',
        'class',
    ])

    return (
        <div
            {...headerProps}
            class={cx('fh-card__header', local.class)}
        >
            {local.children}
        </div>
    )
}

function CardTitle(props: CardTitleProps) {
    const [local, titleProps] = splitProps(props, [
        'children',
        'class',
    ])

    return (
        <h3
            {...titleProps}
            class={cx('fh-card__title', local.class)}
        >
            {local.children}
        </h3>
    )
}

function CardDescription(props: CardDescriptionProps) {
    const [local, descriptionProps] = splitProps(props, [
        'children',
        'class',
    ])

    return (
        <p
            {...descriptionProps}
            class={cx('fh-card__description', local.class)}
        >
            {local.children}
        </p>
    )
}

function CardContent(props: CardContentProps) {
    const [local, contentProps] = splitProps(props, [
        'children',
        'class',
    ])

    return (
        <div
            {...contentProps}
            class={cx('fh-card__content', local.class)}
        >
            {local.children}
        </div>
    )
}

function CardFooter(props: CardFooterProps) {
    const [local, footerProps] = splitProps(props, [
        'children',
        'class',
    ])

    return (
        <div
            {...footerProps}
            class={cx('fh-card__footer', local.class)}
        >
            {local.children}
        </div>
    )
}

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter

export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
}