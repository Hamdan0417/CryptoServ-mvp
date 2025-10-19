import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './hero';

const meta: Meta<typeof Hero> = {
  title: 'Experience/Hero',
  component: Hero,
  args: {
    title: 'Unify Talent, Services & Capital',
    description:
      'Crypto Serv orchestrates the full lifecycle from wallet onboarding to governance with a seamless multi-persona experience.',
    primaryCta: { label: 'Launch App' },
    secondaryCta: { label: 'View Docs' }
  }
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {};
