import ScrollReveal from "@/components/ui/ScrollReveal";

type Props = React.PropsWithChildren<{
  id?: string;
  title: string;
  subtitle?: string;
}>;

export default function Section({ id, title, subtitle, children }: Props) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-4 py-20 md:py-28 scroll-mt-28">
      <ScrollReveal as="header" className="mb-10 text-center" y={18}>
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          <span className="bg-gradient-to-r from-[color:var(--neon-ice)] to-[color:var(--tropical-teal)] bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        {subtitle ? (
          <p className="mx-auto mt-2 max-w-2xl text-slate-300">{subtitle}</p>
        ) : null}
      </ScrollReveal>
      <ScrollReveal y={24}>{children}</ScrollReveal>
    </section>
  );
}
