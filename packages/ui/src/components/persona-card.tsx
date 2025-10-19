import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export type PersonaCardProps = {
  title: string;
  description: string;
  highlights: string[];
  icon?: ReactNode;
  active?: boolean;
  onSelect?: () => void;
};

export const PersonaCard = ({ title, description, highlights, icon, active = false, onSelect }: PersonaCardProps) => (
  <motion.button
    type="button"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onSelect}
    className={clsx(
      'flex h-full flex-col gap-6 rounded-3xl border p-6 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
      active
        ? 'border-accent/80 bg-accent/10 text-secondary'
        : 'border-secondary/10 bg-white/70 text-secondary hover:border-accent/60 hover:bg-accent/5'
    )}
  >
    <div className="flex items-center gap-4">
      {icon}
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-secondary/70">{description}</p>
      </div>
    </div>
    <ul className="space-y-2 text-sm text-secondary/80">
      {highlights.map((highlight) => (
        <li key={highlight} className="flex items-start gap-2">
          <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
          <span>{highlight}</span>
        </li>
      ))}
    </ul>
  </motion.button>
);
