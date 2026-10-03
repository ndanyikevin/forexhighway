import type { JSX, ValidComponent } from "solid-js";
import { Match, splitProps, Switch } from "solid-js";
import { Portal } from "solid-js/web";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as ToastPrimitive from "@kobalte/core/toast";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "~/lib/utils";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-start justify-between space-x-3 overflow-hidden rounded-lg border p-4 shadow-xl transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--kb-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--kb-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[opened]:animate-in data-[closed]:animate-out data-[swipe=end]:animate-out data-[closed]:fade-out-80 data-[closed]:slide-out-to-right-full data-[opened]:slide-in-from-top-full data-[opened]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default:
          "border-border bg-card text-card-foreground shadow-black/20",
        destructive:
          "border-destructive/40 border-l-4 border-l-destructive bg-destructive/10 text-destructive-foreground dark:bg-destructive/20",
        success:
          "border-emerald-500/40 border-l-4 border-l-emerald-500 bg-emerald-500/10 text-emerald-200 dark:bg-emerald-950/40",
        warning:
          "border-amber-500/40 border-l-4 border-l-amber-500 bg-amber-500/10 text-amber-200 dark:bg-amber-950/40",
        error:
          "border-rose-500/40 border-l-4 border-l-rose-500 bg-rose-500/10 text-rose-200 dark:bg-rose-950/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type ToastVariant = NonNullable<VariantProps<typeof toastVariants>["variant"]>;

type ToastListProps<T extends ValidComponent = "ol"> =
  ToastPrimitive.ToastListProps<T> & {
    class?: string | undefined;
  };

const Toaster = <T extends ValidComponent = "ol">(
  props: PolymorphicProps<T, ToastListProps<T>>
) => {
  const [local, others] = splitProps(props as ToastListProps, ["class"]);
  return (
    <Portal>
      <ToastPrimitive.Region>
        <ToastPrimitive.List
          class={cn(
            "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[400px]",
            local.class
          )}
          {...others}
        />
      </ToastPrimitive.Region>
    </Portal>
  );
};

type ToastRootProps<T extends ValidComponent = "li"> =
  ToastPrimitive.ToastRootProps<T> &
  VariantProps<typeof toastVariants> & { class?: string | undefined };

const Toast = <T extends ValidComponent = "li">(
  props: PolymorphicProps<T, ToastRootProps<T>>
) => {
  const [local, others] = splitProps(props as ToastRootProps, [
    "class",
    "variant",
  ]);
  return (
    <ToastPrimitive.Root
      class={cn(toastVariants({ variant: local.variant }), local.class)}
      {...others}
    />
  );
};

type ToastCloseButtonProps<T extends ValidComponent = "button"> =
  ToastPrimitive.ToastCloseButtonProps<T> & { class?: string | undefined };

const ToastClose = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, ToastCloseButtonProps<T>>
) => {
  const [local, others] = splitProps(props as ToastCloseButtonProps, [
    "class",
  ]);
  return (
    <ToastPrimitive.CloseButton
      class={cn(
        "shrink-0 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 hover:text-foreground",
        local.class
      )}
      {...others}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-4"
      >
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </ToastPrimitive.CloseButton>
  );
};

type ToastTitleProps<T extends ValidComponent = "div"> =
  ToastPrimitive.ToastTitleProps<T> & {
    class?: string | undefined;
  };

const ToastTitle = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ToastTitleProps<T>>
) => {
  const [local, others] = splitProps(props as ToastTitleProps, ["class"]);
  return (
    <ToastPrimitive.Title
      class={cn("text-sm font-semibold tracking-tight", local.class)}
      {...others}
    />
  );
};

type ToastDescriptionProps<T extends ValidComponent = "div"> =
  ToastPrimitive.ToastDescriptionProps<T> & { class?: string | undefined };

const ToastDescription = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ToastDescriptionProps<T>>
) => {
  const [local, others] = splitProps(props as ToastDescriptionProps, [
    "class",
  ]);
  return (
    <ToastPrimitive.Description
      class={cn("text-xs leading-relaxed opacity-90", local.class)}
      {...others}
    />
  );
};

function ToastIcon(props: { variant?: ToastVariant }) {
  return (
    <div class="mt-0.5 shrink-0">
      <Switch>
        <Match when={props.variant === "success"}>
          <svg
            class="size-5 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Match>
        <Match when={props.variant === "error" || props.variant === "destructive"}>
          <svg
            class="size-5 text-rose-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Match>
        <Match when={props.variant === "warning"}>
          <svg
            class="size-5 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </Match>
      </Switch>
    </div>
  );
}

function showToast(props: {
  title?: JSX.Element;
  description?: JSX.Element;
  variant?: ToastVariant;
  duration?: number;
}) {
  ToastPrimitive.toaster.show((data) => (
    <Toast
      toastId={data.toastId}
      variant={props.variant}
      duration={props.duration}
    >
      <div class="flex items-start gap-3 w-full">
        <ToastIcon variant={props.variant} />
        <div class="grid gap-1 flex-1">
          {props.title && <ToastTitle>{props.title}</ToastTitle>}
          {props.description && (
            <ToastDescription>{props.description}</ToastDescription>
          )}
        </div>
        <ToastClose />
      </div>
    </Toast>
  ));
}

function showToastPromise<T, U>(
  promise: Promise<T> | (() => Promise<T>),
  options: {
    loading?: JSX.Element;
    success?: (data: T) => JSX.Element;
    error?: (error: U) => JSX.Element;
    duration?: number;
  }
) {
  const variant: { [key in ToastPrimitive.ToastPromiseState]: ToastVariant } = {
    pending: "default",
    fulfilled: "success",
    rejected: "error",
  };
  return ToastPrimitive.toaster.promise<T, U>(promise, (props) => (
    <Toast
      toastId={props.toastId}
      variant={variant[props.state]}
      duration={options.duration}
    >
      <div class="flex items-start gap-3 w-full">
        <ToastIcon variant={variant[props.state]} />
        <div class="grid gap-1 flex-1">
          <Switch>
            <Match when={props.state === "pending"}>
              <ToastTitle>{options.loading}</ToastTitle>
            </Match>
            <Match when={props.state === "fulfilled"}>
              <ToastTitle>{options.success?.(props.data!)}</ToastTitle>
            </Match>
            <Match when={props.state === "rejected"}>
              <ToastTitle>{options.error?.(props.error!)}</ToastTitle>
            </Match>
          </Switch>
        </div>
        <ToastClose />
      </div>
    </Toast>
  ));
}

export {
  Toaster,
  Toast,
  ToastClose,
  ToastTitle,
  ToastDescription,
  showToast,
  showToastPromise,
};