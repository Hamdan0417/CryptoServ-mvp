import { Persona, UserRole } from '@prisma/client';

export interface AuthenticatedUser {
  id: string;
  walletAddress: string;
  roles: UserRole[];
  persona: Persona | null;
}
