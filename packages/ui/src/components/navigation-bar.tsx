import { ComponentType } from 'react';
import { Button } from './button';

export type NavigationLink = {
  href: string;
  label: string;
};

export type NavigationBarProps = {
  logo: JSX.Element;
  links: NavigationLink[];
  onLaunchApp?: () => void;
  launchHref?: string;
  LinkComponent?: ComponentType<{ href: string; children: React.ReactNode; className?: string }>;
};

export const NavigationBar = ({ logo, links, onLaunchApp, launchHref = '/connect', LinkComponent }: NavigationBarProps) => {
  const Comp = LinkComponent ?? (({ href, children, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ));

  return (
    <header className="sticky top-0 z-50 border-b border-secondary/10 bg-white/80 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3 text-secondary">
          {logo}
          <span className="text-xl font-semibold">Crypto Serv</span>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-secondary/70 md:flex">
          {links.map((link) => (
            <Comp key={link.href} href={link.href} className="transition hover:text-secondary">
              {link.label}
            </Comp>
          ))}
        </nav>
        <Button className="hidden md:inline-flex" asChild={Boolean(launchHref)} onClick={onLaunchApp}>
          {launchHref ? (
            <Comp href={launchHref} className="inline-flex items-center">
              Launch App
            </Comp>
          ) : (
            'Launch App'
          )}
        </Button>
      </div>
    </header>
  );
};
