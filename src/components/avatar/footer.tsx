import { Github, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2.5">
            <img
              src="/images/air.png"
              alt=""
              className="h-7 w-7 object-contain opacity-85"
              style={{ filter: "drop-shadow(0 0 5px rgba(245,197,24,0.4))" }}
            />
            <div>
              <p className="font-display text-sm tracking-wide text-foreground">
                AvatarArchive
              </p>
              <p className="font-body-aa text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                A fan-made tribute to the Four Nations
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-body-aa text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            <a
              href="https://github.com/JeffreyHamilton6399/AvatarArchive"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Github className="h-3 w-3" /> GitHub
            </a>
            <a
              href="https://www.youtube.com/@Jeffrey_Creates"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Youtube className="h-3 w-3" /> Jeffrey Creates
            </a>
          </div>

          <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)" }} />

          <p className="font-body-aa max-w-2xl text-[0.6rem] leading-relaxed text-muted-foreground">
            © {new Date().getFullYear()} AvatarArchive · Fan project · Not affiliated with
            Nickelodeon, Viacom, Paramount, or Netflix. No copyright infringement intended.
          </p>
        </div>
      </div>
    </footer>
  );
}
