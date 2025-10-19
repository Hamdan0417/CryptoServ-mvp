import type { Meta, StoryObj } from '@storybook/react';
import { ExperienceArchitecture } from './experience-architecture';

const meta: Meta<typeof ExperienceArchitecture> = {
  title: 'Experience/ExperienceArchitecture',
  component: ExperienceArchitecture,
  args: {
    lanes: [
      {
        title: 'Onboarding',
        steps: [
          {
            label: 'Landing Page',
            description: 'Educates prospects with live metrics and case studies.'
          },
          {
            label: 'Wallet Connect',
            description: 'SIWE compliant wallet handshake and session establishment.'
          }
        ]
      },
      {
        title: 'Personalization',
        steps: [
          {
            label: 'Persona Selection',
            description: 'Tailor dashboards across talent, employer, and investor roles.'
          }
        ]
      },
      {
        title: 'Value Loops',
        steps: [
          {
            label: 'SERV Rewards Layer',
            description: 'Stake-driven access, referral loops, and analytics feedback.'
          }
        ]
      }
    ]
  }
};

export default meta;

type Story = StoryObj<typeof ExperienceArchitecture>;

export const Default: Story = {};
