import type { Component, ComponentProps } from "solid-js"

import { Toaster as Sonner } from "solid-sonner"

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster: Component<ToasterProps> = (props) => {
  return (
    <Sonner
      class="toaster group"
      toastOptions={{
        classes: {
                    toast:
                        "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",

                    description:
                        "group-[.toast]:text-muted-foreground",

                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",

                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",

                    success:
                        "group-[.toaster]:border-green-500/30 group-[.toaster]:bg-green-500/10 group-[.toaster]:text-green-500",

                    error:
                        "group-[.toaster]:border-destructive/30 group-[.toaster]:bg-destructive/10 group-[.toaster]:text-destructive",
                },
      }}
      {...props}
    />
  )
}

export { Toaster }
