import {
  ClipboardList,
  FileStack,
  HardHat,
  Calculator,
  Ruler,
} from "lucide-react";
import VideoReveal from "@/components/VideoReveal";
import { ShaderBackground } from "@/components/ui/shader-background";

const CONTACT_EMAIL = "oevangelista2021@gmail.com";
const CONSULT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Initial Consultation Request`;
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

const agents = [
  {
    name: "Assistant Project Manager Assistant AI",
    role: "Tracks RFIs, submittals, and schedule slippage before they become change orders.",
    icon: ClipboardList,
  },
  {
    name: "Admin AI (back office manager)",
    role: "Runs the paperwork: permits, subcontractor onboarding, and day-to-day correspondence.",
    icon: FileStack,
  },
  {
    name: "Superintendent AI",
    role: "Watches daily field logs and crew progress against the master schedule.",
    icon: HardHat,
  },
  {
    name: "Project Accounting AI",
    role: "Reconciles draws, invoices, and job-cost reports against the budget in real time.",
    icon: Calculator,
  },
  {
    name: "Estimating AI",
    role: "Turns drawings and takeoffs into bid-ready estimates in a fraction of the time.",
    icon: Ruler,
  },
];

export default function Home() {
  return (
    <main className="text-concrete">
      <ShaderBackground />

      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-concrete/10 bg-ink/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-xl tracking-tight text-concrete">
            Buildology
          </span>
          <span className="hidden font-mono text-xs uppercase text-concrete/50 sm:block">
            General Contracting / AI Back Office
          </span>
        </div>
      </header>

      {/* Section A: Hero */}
      <section className="relative border-b border-concrete/10">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
          <div>
            <h1 className="font-display text-4xl leading-[1.05] text-concrete sm:text-5xl md:text-6xl">
              Construction crews. AI agents. One jobsite.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-concrete/75">
              Buildology pairs licensed general contracting with a five-agent
              AI back office, so every vertical and horizontal project runs
              on schedule, on budget, and on record.
            </p>
            <a
              href={CONSULT_MAILTO}
              className="mt-9 inline-block bg-signal px-7 py-3.5 font-display text-base tracking-wide text-ink transition-colors hover:bg-signal/90"
            >
              Book an initial consultation
            </a>
          </div>

          <div className="crosshair border border-concrete/25 p-2">
            <img
              src="/Oscar_Director.png"
              alt="Oscar Evangelista, Director at Buildology"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="border-t border-concrete/10 bg-ink/50 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-x-10 gap-y-3 px-6 py-5 font-mono text-xs uppercase tracking-wide text-concrete/50">
            <span>General Contracting</span>
            <span className="border-l border-concrete/20 pl-10">
              Vertical + Horizontal
            </span>
            <span className="border-l border-concrete/20 pl-10">
              AI-Staffed Back Office
            </span>
          </div>
        </div>
      </section>

      {/* Section B: Core Services */}
      <section className="border-b border-concrete/10 bg-ink/85 text-concrete">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="crosshair order-2 border border-concrete/25 p-2 md:order-1">
            <img
              src="/Oscar_1.jpg"
              alt="Oscar Evangelista on a Buildology jobsite"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="font-display text-3xl text-concrete sm:text-4xl">
              Construction Excellence
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-concrete/75">
              We specialize in <strong>Vertical and horizontal projects</strong>
              &nbsp;— ground-up buildings, tenant improvements, site work,
              utilities, and roadway infrastructure. Every job runs on
              licensed crews, transparent budgets, and a schedule you can
              actually read.
            </p>
            <ul className="mt-8 space-y-3 font-mono text-sm text-concrete/70">
              <li className="border-t border-concrete/15 pt-3">
                Ground-up & tenant improvement construction
              </li>
              <li className="border-t border-concrete/15 pt-3">
                Site work, grading, and utility infrastructure
              </li>
              <li className="border-t border-concrete/15 pt-3">
                Roadway and horizontal civil projects
              </li>
              <li className="border-t border-concrete/15 pt-3 border-b pb-3">
                Preconstruction planning and budget control
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section C: The 5-Agent System */}
      <section className="border-b border-concrete/10 bg-steel/90 text-concrete">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div className="crosshair order-2 border border-concrete/25 p-2 md:order-1">
              <img
                src="/oe photo.png"
                alt="Oscar Evangelista with the Buildology digital workforce"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="order-1 md:order-2">
              <h2 className="font-display text-3xl text-concrete sm:text-4xl">
                Our Digital Workforce
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-concrete/70">
                Five AI agents sit alongside our field teams as full members
                of the roster, handling the paperwork so our people can
                handle the build.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-concrete/15 bg-concrete/15 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent, index) => {
              const Icon = agent.icon;
              return (
                <div key={agent.name} className="bg-steel p-7">
                  <div className="flex items-center justify-between">
                    <Icon
                      className="h-6 w-6 text-circuit"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-xs text-concrete/40">
                      AGENT-0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg leading-snug text-concrete">
                    {agent.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-concrete/65">
                    {agent.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section D: Video Showcase */}
      <section className="bg-ink/85 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-xl">
            <h2 className="font-display text-3xl text-concrete sm:text-4xl">
              Watch it come together
            </h2>
            <p className="mt-4 text-base leading-relaxed text-concrete/70">
              A time-lapse from a recent Buildology build, ground-breaking to
              close-out.
            </p>
          </div>
          <VideoReveal />
        </div>
      </section>

      {/* Section E: Footer / Contact */}
      <footer className="border-t border-concrete/10 bg-ink/85">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center md:py-24">
          <h2 className="font-display text-3xl text-concrete sm:text-4xl">
            Hire us or see our AI agents in action.
          </h2>
          <a
            href={CONTACT_MAILTO}
            className="mt-8 inline-block bg-signal px-7 py-3.5 font-display text-base tracking-wide text-ink transition-colors hover:bg-signal/90"
          >
            Get in touch
          </a>
        </div>
        <div className="border-t border-concrete/10 px-6 py-6 text-center font-mono text-xs text-concrete/40">
          © {new Date().getFullYear()} Buildology. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
