'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useEffect, useState } from 'react';
import { Button, Section } from '@crypto-serv/ui';
import { PersonaGate } from '../../../../components/persona-gate';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

type TalentProfile = {
  displayName: string;
  headline?: string | null;
  bio?: string | null;
  skills: string[];
};

async function fetchProfile(): Promise<TalentProfile | null> {
  const response = await fetch(`${API_URL}/talent/profile`, {
    credentials: 'include'
  });
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error('Unable to load profile');
  }
  return response.json();
}

async function updateProfile(payload: TalentProfile) {
  const response = await fetch(`${API_URL}/talent/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error('Failed to save profile');
  }
  return response.json();
}

export default function TalentProfilePage() {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useQuery({ queryKey: ['talent-profile'], queryFn: fetchProfile });
  const [formState, setFormState] = useState<TalentProfile>({ displayName: '', headline: '', bio: '', skills: [] });
  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['talent-profile'] });
    }
  });

  useEffect(() => {
    if (profile) {
      setFormState({
        displayName: profile.displayName,
        headline: profile.headline ?? '',
        bio: profile.bio ?? '',
        skills: profile.skills ?? []
      });
    }
  }, [profile]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({
      ...formState,
      skills: formState.skills.filter(Boolean)
    });
  };

  return (
    <PersonaGate requiredPersona="TALENT">
      <main className="flex min-h-screen flex-col bg-white text-secondary">
        <Section
          title="Your professional story"
          description="Craft a trusted identity with verifiable skills and mission-aligned narrative."
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col text-sm">
                <span className="font-medium">Display name</span>
                <input
                  required
                  value={formState.displayName}
                  onChange={(event) => setFormState((prev) => ({ ...prev, displayName: event.target.value }))}
                  className="mt-2 rounded-xl border border-secondary/20 px-3 py-2"
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="font-medium">Headline</span>
                <input
                  value={formState.headline ?? ''}
                  onChange={(event) => setFormState((prev) => ({ ...prev, headline: event.target.value }))}
                  className="mt-2 rounded-xl border border-secondary/20 px-3 py-2"
                />
              </label>
            </div>
            <label className="flex flex-col text-sm">
              <span className="font-medium">Bio</span>
              <textarea
                rows={4}
                value={formState.bio ?? ''}
                onChange={(event) => setFormState((prev) => ({ ...prev, bio: event.target.value }))}
                className="mt-2 rounded-xl border border-secondary/20 px-3 py-2"
              />
            </label>
            <label className="flex flex-col text-sm">
              <span className="font-medium">Skills (comma separated)</span>
              <input
                value={formState.skills.join(', ')}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    skills: event.target.value.split(',').map((skill) => skill.trim()).filter(Boolean)
                  }))
                }
                className="mt-2 rounded-xl border border-secondary/20 px-3 py-2"
              />
            </label>
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={mutation.isPending}>
                Save profile
              </Button>
              {mutation.isError && <span className="text-sm text-red-600">Unable to save profile.</span>}
              {mutation.isSuccess && <span className="text-sm text-accent">Profile updated.</span>}
            </div>
          </form>
          {isLoading && <p className="mt-6 text-sm text-secondary/70">Loading profile...</p>}
        </Section>
      </main>
    </PersonaGate>
  );
}
