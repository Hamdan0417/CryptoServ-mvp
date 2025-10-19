'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, Section } from '@crypto-serv/ui';
import { PersonaGate } from '../../../../components/persona-gate';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

type Job = {
  id: string;
  title: string;
  description: string;
  compensation?: string;
  location?: string;
  tags: string[];
};

type ApplicationPayload = {
  jobId: string;
  coverLetter?: string;
};

async function fetchJobs(): Promise<Job[]> {
  const response = await fetch(`${API_URL}/talent/jobs`, { credentials: 'include' });
  if (!response.ok) {
    throw new Error('Unable to load jobs');
  }
  return response.json();
}

async function applyToJob(payload: ApplicationPayload) {
  const response = await fetch(`${API_URL}/talent/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error('Failed to submit application');
  }
  return response.json();
}

export default function TalentJobsPage() {
  const queryClient = useQueryClient();
  const { data: jobs } = useQuery({ queryKey: ['talent-jobs'], queryFn: fetchJobs });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const applyMutation = useMutation({
    mutationFn: applyToJob,
    onSuccess: () => {
      setStatus('Application submitted successfully.');
      setCoverLetter('');
      setSelectedJob(null);
      queryClient.invalidateQueries({ queryKey: ['talent-applications'] });
    },
    onError: (error: Error) => {
      setStatus(error.message);
    }
  });

  return (
    <PersonaGate requiredPersona="TALENT">
      <main className="flex min-h-screen flex-col bg-white text-secondary">
        <Section
          title="Opportunities aligned with SERV"
          description="Each listing routes through compliance-ready workflows with escrow and milestone visibility."
        >
          <div className="space-y-6">
            {jobs?.map((job) => (
              <div key={job.id} className="rounded-3xl border border-secondary/10 bg-secondary/5 p-6">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-sm text-secondary/70">{job.location ?? 'Remote'}</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setStatus(null);
                        setCoverLetter('');
                        setSelectedJob(job);
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-sm text-secondary/80">{job.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wider text-secondary/60">
                    {job.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-secondary/10 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {job.compensation && (
                    <p className="text-sm font-medium text-secondary/70">Compensation: {job.compensation}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {selectedJob && (
            <div className="mt-10 space-y-4 rounded-3xl border border-primary/20 bg-primary/5 p-6">
              <h4 className="text-lg font-semibold">Submit application for {selectedJob.title}</h4>
              <textarea
                rows={5}
                value={coverLetter}
                onChange={(event) => setCoverLetter(event.target.value)}
                placeholder="Share context, availability, and SERV-aligned wins."
                className="w-full rounded-xl border border-secondary/20 px-3 py-2"
              />
              <div className="flex items-center gap-3">
                <Button onClick={() => applyMutation.mutate({ jobId: selectedJob.id, coverLetter })} disabled={applyMutation.isPending}>
                  Submit application
                </Button>
                <Button variant="ghost" onClick={() => setSelectedJob(null)}>
                  Cancel
                </Button>
                {status && <span className="text-sm text-secondary/70">{status}</span>}
              </div>
            </div>
          )}
        </Section>
      </main>
    </PersonaGate>
  );
}
