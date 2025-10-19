import { Slot } from '@radix-ui/react-slot';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  ghost: 'bg-transparent text-secondary-foreground hover:bg-secondary/10'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, variant = 'primary', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            variantStyles[variant],
            className
          )
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
