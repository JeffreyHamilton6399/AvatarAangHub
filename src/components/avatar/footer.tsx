import { Github, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-10">
        <div className="flex items-center gap-2">
          <img
            src="/images/air.png"
            alt=""
            className="h-6 w-6 object-contain opacity-70"
          />
          <p className="font-display text-sm tracking-wide text-foreground">
            AvatarArchive
          </p>
        </div>

        <div className="flex items-center gap-5 font-body-aa text-[0.65rem] uppercase tracking-wider text-muted-foreground">
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

        <p className="font-body-aa max-w-xl text-[0.6rem] leading-relaxed text-muted-foreground">
          © {new Date().getFullYear()} AvatarArchive · Fan project · Not affiliated
          with Nickelodeon, Viacom, Paramount, or Netflix. No copyright infringement intended.
        </p>
      </div>
    </footer>
  );
}
