import { test, expect } from '@playwright/test';

test('talent can complete job application journey', async ({ page }) => {
  const apiBaseUrl = 'http://localhost:3333';
  const corsHeaders = {
    'access-control-allow-origin': 'http://localhost:3000',
    'access-control-allow-credentials': 'true',
    'access-control-allow-headers': 'content-type',
    'access-control-allow-methods': 'GET,POST,OPTIONS'
  };

  let isAuthenticated = false;
  let persona: 'TALENT' | 'EMPLOYER' | 'INVESTOR' | null = null;
  const sessionPayload = {
    id: 'session-playwright',
    walletAddress: '0xMockTalent',
    roles: ['TALENT']
  };

  const jobs = [
    {
      id: 'job-1',
      title: 'Protocol Strategist',
      description: 'Design staking mechanics and growth loops for SERV-aligned marketplaces.',
      compensation: '6,000 SERV / month',
      location: 'Remote',
      tags: ['Tokenomics', 'Go-To-Market', 'DeFi']
    }
  ];

  const applications: Array<{ id: string; jobTitle: string; status: string; submittedAt: string }> = [];

  await page.route(`${apiBaseUrl}/**`, async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const method = request.method();

    if (method === 'OPTIONS') {
      await route.fulfill({ status: 204, headers: corsHeaders });
      return;
    }

    if (url.pathname === '/auth/session' && method === 'GET') {
      if (!isAuthenticated) {
        await route.fulfill({ status: 401, headers: corsHeaders });
        return;
      }

      await route.fulfill({
        status: 200,
        headers: {
          ...corsHeaders,
          'content-type': 'application/json'
        },
        body: JSON.stringify({ ...sessionPayload, persona })
      });
      return;
    }

    if (url.pathname === '/auth/mock' && method === 'POST') {
      isAuthenticated = true;
      persona = null;
      await route.fulfill({
        status: 200,
        headers: {
          ...corsHeaders,
          'content-type': 'application/json'
        },
        body: JSON.stringify({ success: true })
      });
      return;
    }

    if (url.pathname === '/auth/persona' && method === 'POST') {
      const body = await request.postDataJSON();
      persona = body.persona ?? null;
      await route.fulfill({
        status: 200,
        headers: {
          ...corsHeaders,
          'content-type': 'application/json'
        },
        body: JSON.stringify({ ...sessionPayload, persona })
      });
      return;
    }

    if (url.pathname === '/talent/jobs' && method === 'GET') {
      await route.fulfill({
        status: 200,
        headers: {
          ...corsHeaders,
          'content-type': 'application/json'
        },
        body: JSON.stringify(jobs)
      });
      return;
    }

    if (url.pathname === '/talent/applications' && method === 'GET') {
      await route.fulfill({
        status: 200,
        headers: {
          ...corsHeaders,
          'content-type': 'application/json'
        },
        body: JSON.stringify(applications)
      });
      return;
    }

    if (url.pathname === '/talent/applications' && method === 'POST') {
      const body = await request.postDataJSON();
      const application = {
        id: `app-${applications.length + 1}`,
        jobTitle: jobs.find((job) => job.id === body.jobId)?.title ?? 'Unknown role',
        status: 'SUBMITTED',
        submittedAt: new Date().toISOString()
      };
      applications.push(application);
      await route.fulfill({
        status: 201,
        headers: {
          ...corsHeaders,
          'content-type': 'application/json'
        },
        body: JSON.stringify(application)
      });
      return;
    }

    await route.fulfill({ status: 404, headers: corsHeaders });
  });

  await page.goto('/connect?mock=1');

  await page.waitForURL('**/onboarding/persona');
  await page.getByText('Talent', { exact: true }).click();

  await page.waitForURL('**/talent/dashboard');
  await page.getByRole('link', { name: 'Browse jobs' }).click();

  await page.waitForURL('**/talent/jobs');
  await page.getByRole('button', { name: 'Apply' }).first().click();

  await page.getByPlaceholder('Share context, availability, and SERV-aligned wins.').fill(
    'Excited to contribute to the SERV ecosystem with protocol design expertise.'
  );
  await page.getByRole('button', { name: 'Submit application' }).click();

  await page.goto('/talent/applications');
  await expect(page.getByText('Status')).toBeVisible();
});
