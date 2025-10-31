import { PropsWithChildren } from "react"
import clsx from "clsx"

import { cn } from "@/lib/utils"

type NoteProps = PropsWithChildren & {
  title?: string
  type?: "note" | "success" | "warning" | "danger"
}

export default function Note({
  children,
  title = "Note",
  type = "note",
}: NoteProps) {
  const noteClassNames = clsx({
    "bg-muted/50 border-border ring-border": type == "note",
    "bg-emerald-500/10 border-emerald-400/30 ring-emerald-400/20":
      type === "success",
    "bg-amber-500/10 border-amber-400/30 ring-amber-400/20":
      type === "warning",
    "bg-rose-500/10 border-rose-400/30 ring-rose-400/20":
      type === "danger",
  })

  const titleClassNames = clsx({
    "text-foreground": type == "note",
    "text-emerald-700 dark:text-emerald-200": type === "success",
    "text-amber-700 dark:text-amber-200": type === "warning",
    "text-rose-700 dark:text-rose-200": type === "danger",
  })

  return (
    <div
      className={cn(
        "rounded-2xl border-none px-10 py-4 text-sm ",
        noteClassNames
      )}
    >
      <h2 className={cn("mb-3 text-base font-semibold", titleClassNames)}>{title}</h2>
      <div className="space-y-3 text-foreground [&>p]:text-muted-foreground [&>ul]:text-muted-foreground [&>ul]:space-y-1.5 [&>blockquote]:text-muted-foreground [&>blockquote]:border-l-2 [&>blockquote]:pl-4 [&>blockquote]:italic">
        {children}
      </div>
    </div>
  )
}
