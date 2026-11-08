import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { About } from "@/components/site/about";
import { Architecture } from "@/components/site/architecture";
import { CommandPalette } from "@/components/site/command-palette";
import { Contact } from "@/components/site/contact";
import { Credentials } from "@/components/site/credentials";
import { Experience } from "@/components/site/experience";
import { SiteFooter } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { SiteNav } from "@/components/site/nav";
import { Stack } from "@/components/site/stack";
import { Systems } from "@/components/site/systems";

export function SiteShell() {
  const [active, setActive] = useState("work");
  const [cmd, setCmd] = useState(false);

  useEffect(() => {
    const ids = nav.map((n) => n.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(el => Boolean(el));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.15, 0.4, 0.7] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative z-10 min-h-dvh">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground"
      >
        Skip to work
      </a>
      <SiteNav active={active} onCommand={() => setCmd(true)} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Systems />
        <Architecture />
        <Stack />
        <Credentials />
        <Contact />
      </main>
      <SiteFooter />
      <CommandPalette open={cmd} onOpenChange={setCmd} />
    </div>
  );
}
