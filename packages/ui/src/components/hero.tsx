import { ReactNode } from 'react';
import { Button } from './button';

export type HeroProps = {
  title: ReactNode;
  description: string;
  primaryCta?: { label: string; onClick?: () => void; href?: string };
  secondaryCta?: { label: string; onClick?: () => void; href?: string };
  media?: ReactNode;
};

export const Hero = ({ title, description, primaryCta, secondaryCta, media }: HeroProps) => {
  const PrimaryComponent = primaryCta?.href ? 'a' : 'button';
  const SecondaryComponent = secondaryCta?.href ? 'a' : 'button';
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 py-24 text-secondary-foreground">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.6em] text-accent">SERV ECOSYSTEM</p>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">{title}</h1>
              <p className="max-w-xl text-lg text-secondary-foreground/80">{description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {primaryCta && (
                <Button
                  asChild={Boolean(primaryCta.href)}
                  className="px-6 py-3 text-base"
                >
                  <PrimaryComponent onClick={primaryCta.onClick} href={primaryCta.href}>
                    {primaryCta.label}
                  </PrimaryComponent>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  asChild={Boolean(secondaryCta.href)}
                  variant="ghost"
                  className="border border-secondary-foreground/20 px-6 py-3 text-base"
                >
                  <SecondaryComponent onClick={secondaryCta.onClick} href={secondaryCta.href}>
                    {secondaryCta.label}
                  </SecondaryComponent>
                </Button>
              )}
            </div>
          </div>
          {media && (
            <div className="relative isolate">
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative rounded-3xl border border-secondary-foreground/10 bg-secondary/40 p-8 shadow-xl backdrop-blur-lg">
                {media}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
