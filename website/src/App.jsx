import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Ticker from './components/Ticker.jsx';
import ProductIndex from './components/ProductIndex.jsx';
import ProductBand from './components/Products.jsx';
import LabelSheet from './components/LabelSheet.jsx';
import Ritual from './components/Ritual.jsx';
import BrandPromise from './components/Promise.jsx';
import Footer from './components/Footer.jsx';
import { PRODUCTS } from './components/products.js';

const [BLOOD_SUGAR, OBEAT, ZERO30] = PRODUCTS;

/* Band order matters. The guidelines rule out Verification Stamp against
   Blueprint Ink and Verification Stamp against Zero Black (p36), so no red band
   may touch a blue or an ink one. An earlier version used the airmail stripe as
   a buffer; with that gone, the order itself does the work — every red band is
   flanked by Archival Paper:

     red · paper · mango · blue · paper · red · paper · ink · paper

   Zero30's mango ground is neither of the forbidden pair, so it may sit against
   Blueprint Ink; it leads the product run because it is the SKU the range is
   growing into. Running OBEAT straight into Blood Sugar would put Blueprint Ink
   against Verification Stamp, so the claim strip sits between those two bands
   as the Archival Paper separator. The Label section closes the page: it is the
   proof, so it reads best after everything it is proving. */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <ProductIndex />
        <ProductBand product={ZERO30} artSide="left" id={ZERO30.id} />
        <ProductBand product={OBEAT} artSide="right" id={OBEAT.id} />
        <Ticker />
        <ProductBand product={BLOOD_SUGAR} artSide="left" id={BLOOD_SUGAR.id} />
        <Ritual />
        <BrandPromise />
        <LabelSheet />
      </main>
      <Footer />
    </MotionConfig>
  );
}
