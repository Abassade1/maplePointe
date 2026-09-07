const COMPANIES = [
  "Nordvik Foods",
  "Aterra Systems",
  "Kanto Devices",
  "Solmara Group",
  "Verdant Labs",
  "Brightpath Textiles",
];

const QUOTES = [
  {
    quote:
      "We had three law firms giving us three different answers about Quebec labelling. Northgate gave us one sequence, with costs attached, in an afternoon.",
    name: "Elena Vargas",
    role: "COO",
    company: "Nordvik Foods",
    country: "Spain",
  },
  {
    quote:
      "The province comparison changed our plan. We had assumed Ontario by default and landed in British Columbia instead — six days shorter on every container.",
    name: "Kenji Watanabe",
    role: "Head of International",
    company: "Kanto Devices",
    country: "Japan",
  },
  {
    quote:
      "The checklist was the thing. Our board wanted a defensible timeline, and for the first time we could actually show them one.",
    name: "Adaeze Nwosu",
    role: "Managing Director",
    company: "Verdant Labs",
    country: "Nigeria",
  },
];

export function SocialProof() {
  return (
    <section id="customers" className="border-b border-slate-200 bg-slate-50 py-20 lg:py-24">
      <div className="container">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-slate-500">
          Working with design partners across six countries
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {COMPANIES.map((name) => (
            <li key={name} className="text-lg font-semibold tracking-tight text-slate-400">
              {name}
            </li>
          ))}
        </ul>

        <ul className="mt-16 grid gap-6 lg:grid-cols-3">
          {QUOTES.map((item) => (
            <li key={item.company} className="flex flex-col rounded-lg border border-slate-200 bg-white p-6">
              <blockquote className="flex-1">
                <p className="leading-relaxed text-slate-700">&ldquo;{item.quote}&rdquo;</p>
              </blockquote>
              <footer className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-sm font-semibold text-navy-800">{item.name}</p>
                <p className="mt-0.5 text-sm text-slate-500">
                  {item.role}, {item.company} · {item.country}
                </p>
              </footer>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-xs text-slate-400">
          Company names and quotations shown above are fictional, for demonstration purposes only.
        </p>
      </div>
    </section>
  );
}
