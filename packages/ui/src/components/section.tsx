import { ReactNode } from 'react';
import { clsx } from 'clsx';

export type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
  className?: string;
};

export const Section = ({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  children,
  className
}: SectionProps) => {
  return (
    <section
      id={id}
      className={clsx(
        'w-full py-16 sm:py-24',
        align === 'center' && 'text-center',
        className
      )}
    >
      <div className="container">
        <div className={clsx('mx-auto max-w-4xl space-y-4', align === 'left' ? 'text-left' : 'text-center')}>
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
          )}
          <h2 className="text-3xl font-semibold text-secondary md:text-4xl">{title}</h2>
          {description && <p className="text-base text-secondary/80 md:text-lg">{description}</p>}
        </div>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
};
