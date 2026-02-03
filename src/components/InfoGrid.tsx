type InfoCardProps = {
  title: string;
  text: string;
};

function InfoCard(props: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="text-base font-bold tracking-tight text-slate-900">
        {props.title}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">
        {props.text}
      </p>
    </div>
  );
}

function InfoGrid() {
  return (
    <section
      id="highlights"
      className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <InfoCard
        title="Frontend Engineering"
        text="React, TypeScript, routing, forms, tables, and UI architecture. I like codebases that stay clean as they grow."
      />
      <InfoCard
        title="Design + Motion"
        text="Tasteful gradients, micro-interactions, and motion that supports the experience (not distracts from it)."
      />
      <InfoCard
        title="Data-minded"
        text="I like using data and feedback to improve UX, reduce friction, and guide product decisions."
      />
    </section>
  );
}

export default InfoGrid;
