import { PRODUCTS, COMPANY } from './products.js';

const YEAR = new Date().getFullYear();

/* The wordmark is set oversized across the full width with a hard Zero Black
   offset behind it — the same letterpress idea as the header plate, at the
   other end of the page. It is drawn as two stacked masks because the source
   art is a single-colour PNG: one filled ink and shifted, one filled Blueprint
   Ink on top. Replace both with the SVG when the brand supplies it. */
export default function Footer() {
  return (
    <footer id="colophon">
      <div className="band band-paper grain footer-top">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-col">
              <span className="label">Products</span>
              {PRODUCTS.map((product) => (
                <a key={product.id} href={`#${product.id}`}>{product.label}</a>
              ))}
              <a href="#label">The full label</a>
            </div>

            <div className="footer-col">
              <span className="label">Brand</span>
              <a href="#ritual">How to eat it</a>
              <a href="#promise">The promise</a>
              <a href="#products">The range</a>
            </div>

            <div className="footer-col">
              <span className="label">Contact</span>
              <a href="#contact">Write to us</a>
              <a href={`mailto:${COMPANY.email}`} className="footer-email">{COMPANY.email}</a>
              <p className="fine">Hyderabad, Telangana</p>
            </div>

            <div className="footer-col">
              <span className="label">Licences</span>
              <p className="fine">
                FSSAI Lic. {COMPANY.fssaiMarketer}
                <br />
                {COMPANY.category}
                <br />
                Lic. {COMPANY.fssaiCategory}
              </p>
            </div>
          </div>

          <div className="footer-legal">
            <div>
              <span className="label label-ink">Marketed by</span>
              <p className="fine">{COMPANY.marketer}<br />{COMPANY.marketerAddress}</p>
            </div>
            <div>
              <span className="label label-ink">Manufactured by</span>
              <p className="fine">{COMPANY.manufacturer}<br />{COMPANY.manufacturerAddress}</p>
            </div>
          </div>

          <div className="footer-giant" role="img" aria-label="Zero Nonsense">
            <span className="fg-shadow" />
            <span className="fg-fill" />
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <div className="wrap footer-bar-in">
          <span>© {YEAR} {COMPANY.marketer}</span>
          <span>Zero secrets · Zero shortcuts · Zero n*nsense</span>
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </div>
      </div>
    </footer>
  );
}
