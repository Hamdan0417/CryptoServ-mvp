import { ReactNode } from 'react';
import { clsx } from 'clsx';

export type ExperienceNode = {
  label: string;
  description?: string;
  children?: ExperienceNode[];
};

export type ExperienceArchitectureProps = {
  lanes: {
    title: string;
    icon?: ReactNode;
    steps: ExperienceNode[];
  }[];
};

const renderNode = (node: ExperienceNode, depth = 0) => (
  <div key={node.label} className={clsx('rounded-2xl border border-secondary/10 bg-white/80 p-5 shadow-sm backdrop-blur-sm')}>
    <div className="space-y-2">
      <h4 className="text-lg font-semibold text-secondary">{node.label}</h4>
      {node.description && <p className="text-sm text-secondary/70">{node.description}</p>}
      {node.children && node.children.length > 0 && (
        <div className={clsx('grid gap-3', depth === 0 ? 'md:grid-cols-2' : 'grid-cols-1')}>
          {node.children.map((child) => renderNode(child, depth + 1))}
        </div>
      )}
    </div>
  </div>
);

export const ExperienceArchitecture = ({ lanes }: ExperienceArchitectureProps) => (
  <div className="grid gap-6 md:grid-cols-3">
    {lanes.map((lane) => (
      <div key={lane.title} className="space-y-4">
        <div className="flex items-center gap-3">
          {lane.icon}
          <h3 className="text-xl font-semibold text-secondary">{lane.title}</h3>
        </div>
        <div className="space-y-4">
          {lane.steps.map((step) => (
            <div key={step.label}>{renderNode(step)}</div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
