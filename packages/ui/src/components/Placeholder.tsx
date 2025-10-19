import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils/cn';
import type { ComponentProps } from 'react';

type PlaceholderProps = ComponentProps<'div'> & {
  asChild?: boolean;
};

export function Placeholder({ className, asChild = false, ...props }: PlaceholderProps) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      className={cn(
        'flex items-center justify-center rounded-lg border border-dashed border-brand/50 bg-brand/5 p-4 text-sm font-medium text-brand-dark',
        className
      )}
      {...props}
    />
  );
}
