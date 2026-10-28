import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App.jsx';
import { PRODUCTS } from '../components/products.js';

/* These are the brand rules the README calls regressions if broken. They are
   structural, so a test can hold them where a code review cannot. */

/* The two pairings the guidelines forbid (p36). Order-independent. */
const FORBIDDEN = [
  ['red', 'blue'],
  ['red', 'ink'],
];

/* Every full-width section's ground, derived from the class the component
   sets. An unrecognised section fails the test rather than being skipped —
   a new band has to be classified before it can sit next to anything. */
function groundOf(element) {
  if (element.classList.contains('hero')) return 'photo';
  if (element.classList.contains('ticker')) return 'paper';

  for (const name of element.classList) {
    if (name.startsWith('band-')) return name.slice('band-'.length);
  }

  throw new Error(
    `Unclassified section <${element.tagName.toLowerCase()} class="${element.className}">. ` +
      'Give it a band-* class, or teach groundOf about it.',
  );
}

describe('band order', () => {
  it('never puts Verification Stamp against Blueprint Ink or Zero Black', () => {
    const { container } = render(<App />);
    const grounds = [...container.querySelector('main').children].map(groundOf);

    for (let i = 1; i < grounds.length; i += 1) {
      const pair = [grounds[i - 1], grounds[i]];
      const clash = FORBIDDEN.some(
        ([a, b]) => (pair[0] === a && pair[1] === b) || (pair[0] === b && pair[1] === a),
      );
      expect(clash, `${pair[0]} band touches ${pair[1]} band (guidelines p36)`).toBe(false);
    }
  });
});

describe('document structure', () => {
  it('has exactly one h1, and it carries the hero headline', () => {
    const { container } = render(<App />);
    const h1s = container.querySelectorAll('h1');

    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent.trim().length).toBeGreaterThan(0);
  });

  it('opens with a skip link to the main landmark', () => {
    const { container } = render(<App />);
    const skip = container.querySelector('a.skip');

    expect(skip).not.toBeNull();
    expect(skip.getAttribute('href')).toBe('#main');
    expect(container.querySelector('#main')).not.toBeNull();
  });

  it('gives every image an alt attribute', () => {
    const { container } = render(<App />);

    for (const img of container.querySelectorAll('img')) {
      expect(img.getAttribute('alt'), `${img.getAttribute('src')} has no alt`).not.toBeNull();
    }
  });

  it('resolves every in-page anchor to a real target', () => {
    const { container } = render(<App />);
    const anchors = [...container.querySelectorAll('a[href^="#"]')];

    expect(anchors.length).toBeGreaterThan(0);

    for (const anchor of anchors) {
      const id = anchor.getAttribute('href').slice(1);
      expect(container.querySelector(`[id="${id}"]`), `nothing on the page has id="${id}"`)
        .not.toBeNull();
    }
  });

  it('renders revealed content even with no IntersectionObserver', () => {
    // jsdom has none, which is the same position as an old browser or a
    // prerender: the content must be there anyway.
    expect(globalThis.IntersectionObserver).toBeUndefined();

    const { container } = render(<App />);
    const reveals = container.querySelectorAll('.reveal');

    expect(reveals.length).toBeGreaterThan(0);
    for (const reveal of reveals) {
      expect(reveal.classList.contains('is-in')).toBe(true);
    }
  });
});

describe('label data', () => {
  it('flags what the pack does not print rather than inventing it', () => {
    // The blue SKU's name is not on the carton. If someone fills it in, the
    // flag has to go with it — this test exists so that is a decision.
    const blue = PRODUCTS.find((product) => product.id === 'blood-sugar');
    expect(blue.nameNote).toMatch(/confirm/i);
  });
});
