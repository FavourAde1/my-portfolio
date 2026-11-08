import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

function SheetOverlay({ className, ...props }) {
  return (<DialogPrimitive.Overlay
      className={cn("fixed inset-0 z-50 bg-bg/80 data-[state=open]:animate-in data-[state=closed]:animate-out", className, )}
      {...props}
    />
  );
}

const SheetContent = React.forwardRef(({ className, children, ...props }, ref) => (<SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn("fixed inset-y-0 right-0 z-50 flex h-full w-[min(100%,20rem)] flex-col bg-surface p-6 shadow-[var(--shadow-border)]", "data-[state=open]:animate-in data-[state=closed]:animate-out", className, )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-elevated hover:text-fg">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

function SheetTitle({ className, ...props }) {
  return <DialogPrimitive.Title className={cn("text-base font-medium", className)} {...props} />;
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle };
