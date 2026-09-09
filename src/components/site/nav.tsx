import { useEffect, useState } from "react";
import { Menu, Command as CommandIcon } from "lucide-react";
import { nav, profile } from "@/lib/content";
import { cn, scrollToId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";

function LagosClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: profile.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="mono hidden text-xs text-muted tabular-nums lg:inline" suppressHydrationWarning>
      {time ? `${time} WAT` : "— WAT"}
    </span>
  );
}

export function SiteNav({
  active,
  onCommand,
}: {
  active: string;
  onCommand: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="wrap section-pad flex h-16 items-center justify-between gap-3">
        <a
          href="#top"
          className="flex items-center gap-2.5"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="inline-flex size-8 items-center justify-center rounded-sm bg-accent font-mono text-xs font-semibold text-accent-foreground">
            {profile.monogram}
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:block">{profile.displayName}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToId(item.id)}
              className={cn(
                "h-11 rounded-md px-3 text-sm transition-[color,background-color] duration-150",
                active === item.id ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LagosClock />
          <Button variant="ghost" size="icon" onClick={onCommand} aria-label="Open command palette" className="hidden sm:inline-flex">
            <CommandIcon />
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#contact">Start a conversation</a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-8 flex flex-col gap-1">
                {nav.map((item) => (
                  <SheetClose asChild key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollToId(item.id)}
                      className="flex h-12 items-center rounded-md px-3 text-left text-base text-fg hover:bg-elevated"
                    >
                      {item.label}
                    </button>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button className="mt-4 w-full" onClick={() => scrollToId("contact")}>
                    Start a conversation
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
