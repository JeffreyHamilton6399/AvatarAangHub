import { Github, Heart, Youtube } from "lucide-react";
import { ElementSymbol } from "./element-symbol";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-card text-primary">
              <span className="h-5 w-5">
                <ElementSymbol element="air" strokeWidth={2.2} />
              </span>
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                AvatarArchive
              </p>
              <p className="text-xs text-muted-foreground">
                A fan-made tribute to the Four Nations.
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <a
              href="https://github.com/JeffreyHamilton6399/AvatarArchive"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
            <a
              href="https://www.youtube.com/@Jeffrey_Creates"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Youtube className="h-3.5 w-3.5" /> Jeffrey Creates
            </a>
            <span className="inline-flex items-center gap-1.5">
              Built with <Heart className="h-3.5 w-3.5 text-primary" /> on Next.js
            </span>
          </nav>
        </div>

        <div className="mt-8 border-t border-border/40 pt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
          <p>
            Avatar: The Last Airbender and The Legend of Korra © Nickelodeon /
            Viacom / Paramount. AvatarArchive is an unofficial fan project and is
            not endorsed by or affiliated with the rights holders. All content is
            fan-created reference material.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} AvatarArchive · Fan project · No
            copyright infringement intended.
          </p>
        </div>
      </div>
    </footer>
  );
}
