import type { Meta, StoryObj } from '@storybook/react';
import { Users } from 'lucide-react';
import { PersonaCard } from './persona-card';

const meta: Meta<typeof PersonaCard> = {
  title: 'Experience/PersonaCard',
  component: PersonaCard,
  args: {
    title: 'Talent',
    description: 'Launch your Web3 career with verified credentials and escrow-backed engagements.',
    highlights: ['Guided onboarding', 'Job recommendations', 'SERV incentives'],
    icon: <Users className="h-8 w-8 text-accent" />
  }
};

export default meta;

type Story = StoryObj<typeof PersonaCard>;

export const Default: Story = {};
