import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium font-mono tracking-wide", {
    variants: {
      variant: {
        default: "bg-elevated text-muted hairline", accent: "bg-accent/15 text-accent", ok: "bg-ok/15 text-ok", }, }, defaultVariants: {
      variant: "default", }, }, );

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
