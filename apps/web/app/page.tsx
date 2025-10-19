import Link from 'next/link';
import {
  Button,
  ExperienceArchitecture,
  Hero,
  NavigationBar,
  PersonaCard,
  Section
} from '@crypto-serv/ui';
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Coins,
  Handshake,
  LineChart,
  Users,
  Wallet
} from 'lucide-react';

const personas = [
  {
    title: 'Talent',
    description: 'Verified profiles, job matching, escrow-backed engagements, and SERV incentives.',
    highlights: ['Progressive identity & compliance', 'AI-powered role discovery', 'One-click applications'],
    icon: <Users className="h-10 w-10 text-accent" />
  },
  {
    title: 'Employers & Service Buyers',
    description: 'Post roles, orchestrate milestone-based services, and manage approvals in one console.',
    highlights: ['Job & service publishing', 'Escrow contract automation', 'Performance analytics'],
    icon: <BriefcaseBusiness className="h-10 w-10 text-accent" />
  },
  {
    title: 'Investors',
    description: 'Stake SERV for deal room access, performance dashboards, and governance participation.',
    highlights: ['Tiered staking gates', 'Deal room diligence packs', 'Governance voting stream'],
    icon: <LineChart className="h-10 w-10 text-accent" />
  }
];

const architectureLanes = [
  {
    title: 'Onboarding Funnel',
    icon: <Wallet className="h-8 w-8 text-accent" />,
    steps: [
      {
        label: 'Landing Page',
        description: 'Narratives, case studies, and live ecosystem metrics build trust before connection.'
      },
      {
        label: 'Wallet Connect',
        description: 'SIWE handshake + compliance pre-checks create an auditable identity signature.'
      }
    ]
  },
  {
    title: 'Personalized Journeys',
    icon: <Handshake className="h-8 w-8 text-accent" />,
    steps: [
      {
        label: 'Persona Selection',
        description: 'Talent, employer, and investor tracks tailor navigation, RBAC, and data needs.'
      },
      {
        label: 'Adaptive Dashboards',
        description: 'Module entry points for job discovery, marketplace bookings, and deal rooms.'
      }
    ]
  },
  {
    title: 'Value Delivery Loop',
    icon: <Coins className="h-8 w-8 text-accent" />,
    steps: [
      {
        label: 'SERV Rewards Layer',
        description: 'Staking, escrow releases, and governance signals feed analytics + incentives.'
      },
      {
        label: 'Feedback & Growth',
        description: 'Outcomes sync into SIEM hooks, anomaly alerts, and go-to-market campaigns.'
      }
    ]
  }
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-secondary">
      <NavigationBar
        logo={<Building2 className="h-8 w-8 text-primary" />}
        links={[
          { href: '#architecture', label: 'Experience Architecture' },
          { href: '#personas', label: 'Personas' },
          { href: '#modules', label: 'Modules' }
        ]}
        launchHref="/connect"
        LinkComponent={({ href, children, className }) => (
          <Link href={href} className={className}>
            {children}
          </Link>
        )}
      />
      <Hero
        title={
          <span>
            The trust fabric for
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              talent, operators, and capital
            </span>
          </span>
        }
        description="Crypto Serv unifies onboarding, compliance, talent workflows, services marketplace, and investor intelligence in one SERV token-powered platform."
        primaryCta={{ label: 'Launch App', href: '/connect' }}
        secondaryCta={{ label: 'View Experience Map', href: '#architecture' }}
        media={
          <dl className="grid gap-6 text-sm text-secondary-foreground">
            <div className="rounded-2xl border border-secondary/20 bg-white/10 p-4">
              <dt className="text-xs uppercase tracking-[0.4em] text-accent/80">Escrow Settlements</dt>
              <dd className="text-2xl font-semibold"><span className="text-accent">42%</span> faster onboarding</dd>
            </div>
            <div className="rounded-2xl border border-secondary/20 bg-white/10 p-4">
              <dt className="text-xs uppercase tracking-[0.4em] text-accent/80">SERV Loyalty</dt>
              <dd className="text-2xl font-semibold">Stake tiers unlock <span className="text-accent">+60%</span> retention</dd>
            </div>
          </dl>
        }
      />

      <Section
        id="architecture"
        eyebrow="Experience Architecture"
        title="A guided journey from discovery to governance"
        description="Each touchpoint is orchestrated to reduce friction, maintain compliance, and keep stakeholders engaged within the SERV ecosystem."
      >
        <ExperienceArchitecture lanes={architectureLanes} />
      </Section>

      <Section
        id="personas"
        eyebrow="Personas"
        title="Right-time value for every stakeholder"
        description="Tailored workflows unlock growth loops across talent, employers, and investors with shared SERV incentives."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {personas.map((persona) => (
            <PersonaCard key={persona.title} {...persona} />
          ))}
        </div>
      </Section>

      <Section
        id="modules"
        eyebrow="Platform Modules"
        title="SERV pillars ship with modular building blocks"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Talent Hub',
              description: 'Profiles, job intelligence, referrals, and skill attestations connected to escrow outcomes.'
            },
            {
              title: 'Marketplace & Escrow',
              description: 'Service catalogs with milestone automation and dispute workflows secured by smart contracts.'
            },
            {
              title: 'Investor Network',
              description: 'Stake-gated deal rooms, diligence data, and governance participation insights.'
            }
          ].map((module) => (
            <div
              key={module.title}
              className="flex h-full flex-col justify-between rounded-3xl border border-secondary/10 bg-secondary/5 p-6"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">{module.title}</h3>
                <p className="text-sm text-secondary/70">{module.description}</p>
              </div>
              <Button
                variant="outline"
                className="mt-8 w-full justify-between text-sm"
                asChild
              >
                <Link href="/connect" className="flex w-full items-center justify-between">
                  Explore <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <footer className="border-t border-secondary/10 bg-secondary text-secondary-foreground">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6" />
            <span className="font-semibold">Crypto Serv</span>
          </div>
          <div className="text-sm text-secondary-foreground/80">
            SERV token utility • Staking tiers • Governance-ready infrastructure
          </div>
        </div>
      </footer>
    </main>
  );
}
