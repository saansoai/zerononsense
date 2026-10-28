import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/* Contact.jsx reads VITE_CONTACT_ENDPOINT at module load, so each test stubs
   the env and then imports a fresh copy of the module. */
async function mount(endpoint) {
  vi.stubEnv('VITE_CONTACT_ENDPOINT', endpoint);
  vi.resetModules();
  const { default: Contact } = await import('../components/Contact.jsx');
  return render(<Contact />);
}

async function fillIn(user) {
  await user.type(screen.getByLabelText(/^name$/i), 'Asha Rao');
  await user.type(screen.getByLabelText(/^email$/i), 'asha@example.com');
  await user.type(screen.getByLabelText(/^message$/i), 'Is the tamarind sourced in India?');
}

describe('contact form', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('labels every field a visitor has to fill in', async () => {
    await mount('');

    expect(screen.getByLabelText(/^name$/i)).toBeDefined();
    expect(screen.getByLabelText(/^email$/i)).toBeDefined();
    expect(screen.getByLabelText(/phone/i)).toBeDefined();
    expect(screen.getByLabelText(/enquiry/i)).toBeDefined();
    expect(screen.getByLabelText(/^message$/i)).toBeDefined();
  });

  it('POSTs the enquiry when an endpoint is configured', async () => {
    const user = userEvent.setup();
    globalThis.fetch.mockResolvedValue({ ok: true });

    await mount('https://example.test/enquiries');
    await fillIn(user);
    await user.click(screen.getByRole('button', { name: /send enquiry/i }));

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));

    const [url, init] = globalThis.fetch.mock.calls[0];
    expect(url).toBe('https://example.test/enquiries');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toMatchObject({
      name: 'Asha Rao',
      email: 'asha@example.com',
      message: 'Is the tamarind sourced in India?',
    });

    await screen.findByText(/sent\./i);
  });

  it('offers the email address when the endpoint fails', async () => {
    const user = userEvent.setup();
    globalThis.fetch.mockResolvedValue({ ok: false, status: 500 });

    await mount('https://example.test/enquiries');
    await fillIn(user);
    await user.click(screen.getByRole('button', { name: /send enquiry/i }));

    const status = await screen.findByText(/did not send/i);
    expect(status.querySelector('a[href^="mailto:"]')).not.toBeNull();
  });

  it('hands off to the mail client when no endpoint is configured', async () => {
    const user = userEvent.setup();
    // jsdom refuses to navigate; the setter is what the component uses.
    const href = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { set href(value) { href(value); } },
    });

    await mount('');
    await fillIn(user);
    await user.click(screen.getByRole('button', { name: /send enquiry/i }));

    await waitFor(() => expect(href).toHaveBeenCalledTimes(1));
    expect(href.mock.calls[0][0]).toMatch(/^mailto:info@saansonutri\.com\?subject=/);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('drops a submission that fills the honeypot', async () => {
    const user = userEvent.setup();
    globalThis.fetch.mockResolvedValue({ ok: true });

    await mount('https://example.test/enquiries');
    await fillIn(user);
    await user.type(document.getElementById('contact-company'), 'Acme Bots');
    await user.click(screen.getByRole('button', { name: /send enquiry/i }));

    expect(globalThis.fetch).not.toHaveBeenCalled();
  });
});
