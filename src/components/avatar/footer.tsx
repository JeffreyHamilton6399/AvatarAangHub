export function Footer() {
  return (
    <footer className="py-8 text-center">
      <p className="font-body-aa px-4 text-[0.6rem] leading-relaxed text-muted-foreground/60">
        © {new Date().getFullYear()} AvatarArchive · Fan project · Not affiliated
        with Nickelodeon, Viacom, Paramount, or Netflix.
      </p>
    </footer>
  );
}
