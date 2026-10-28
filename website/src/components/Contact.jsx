import { useRef, useState } from 'react';
import { COMPANY, PRODUCTS } from './products.js';

/* The carton leaves blank fields to be filled in by hand — Batch No., Mfg.
   Date, Exp. Date, MRP. This form is that panel: ruled lines on Archival
   Paper, mono labels in the same key, nothing rounded and nothing floating.
   "The open file" cuts both ways; this is the reader's side of it.

   Where it sends:

   - `VITE_CONTACT_ENDPOINT` set → POST the enquiry as JSON. Any endpoint that
     accepts a JSON body works (Formspree, Web3Forms, Basin, a Netlify or
     Vercel function). Nothing here is provider-specific.
   - not set → fall back to the visitor's own mail client with the enquiry
     pre-written. That is what the site did before this form existed, so the
     fallback is never worse than the old behaviour, and the form is honest
     about it rather than silently dropping the message.

   The honeypot is a real field, hidden from sight and from assistive
   technology, with autocomplete off. Bots fill it; people cannot see it. */

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? '';

const SUBJECTS = [
  ...PRODUCTS.map((product) => `${product.label} — product enquiry`),
  'Stockist or trade enquiry',
  'Ingredients, nutrition or allergens',
  'Something else',
];

function mailtoFor({ name, email, phone, subject, message }) {
  const body = [
    message,
    '',
    '—',
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
  ]
    .filter((line) => line !== null)
    .join('\n');

  return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  const [state, setState] = useState('idle'); // idle | sending | sent | handoff | error
  const formRef = useRef(null);

  async function onSubmit(event) {
    event.preventDefault();
    if (state === 'sending') return;

    const data = Object.fromEntries(new FormData(event.target).entries());
    if (data.company) return; // honeypot: a bot filled a field nobody can see

    const enquiry = {
      name: data.name?.trim(),
      email: data.email?.trim(),
      phone: data.phone?.trim(),
      subject: data.subject,
      message: data.message?.trim(),
    };

    if (!ENDPOINT) {
      window.location.href = mailtoFor(enquiry);
      setState('handoff');
      return;
    }

    setState('sending');
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(enquiry),
      });
      if (!response.ok) throw new Error(`Enquiry endpoint returned ${response.status}`);
      setState('sent');
      formRef.current?.reset();
    } catch {
      setState('error');
    }
  }

  return (
    <section className="band band-paper grain contact" id="contact">
      <div className="wrap">
        <div className="head">
          <span className="label label-ink">Write to us</span>
          <h2>Ask us anything about what is in it.</h2>
          <p className="lede">
            The whole formula is printed on this page and on every carton. If something is
            still unclear — an ingredient, a figure, where to buy it — ask, and a person
            answers.
          </p>
        </div>

        <div className="contact-grid">
          <form className="contact-form" ref={formRef} onSubmit={onSubmit} noValidate={false}>
            <div className="field">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" required autoComplete="name" />
            </div>

            <div className="field">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" required autoComplete="email" />
            </div>

            <div className="field">
              <label htmlFor="contact-phone">
                Phone <span className="field-opt">optional</span>
              </label>
              <input id="contact-phone" name="phone" type="tel" autoComplete="tel" />
            </div>

            <div className="field">
              <label htmlFor="contact-subject">Enquiry</label>
              <select id="contact-subject" name="subject" defaultValue={SUBJECTS[0]}>
                {SUBJECTS.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div className="field field-wide">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows={5} required />
            </div>

            {/* Honeypot. Not `display: none` — some bots skip those. */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="contact-company">Company</label>
              <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="contact-send">
              <button className="btn" type="submit" disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending…' : 'Send enquiry'}
              </button>
              <p className="status" role="status" aria-live="polite">
                {state === 'sent' && 'Sent. We answer within two working days.'}
                {state === 'handoff' && 'Opening your email app with the enquiry written out.'}
                {state === 'error' && (
                  <>
                    That did not send. Write to{' '}
                    <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> instead.
                  </>
                )}
              </p>
            </div>
          </form>

          <aside className="contact-aside">
            <div className="contact-block">
              <span className="label label-ink">Direct</span>
              <a href={`mailto:${COMPANY.email}`} className="contact-email">{COMPANY.email}</a>
            </div>
            <div className="contact-block">
              <span className="label label-ink">Marketed by</span>
              <p className="fine">{COMPANY.marketer}<br />{COMPANY.marketerAddress}</p>
            </div>
            <div className="contact-block">
              <span className="label label-ink">Licence</span>
              <p className="fine">FSSAI Lic. {COMPANY.fssaiMarketer}</p>
            </div>
            <p className="fine contact-advisory">{COMPANY.advisory}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
