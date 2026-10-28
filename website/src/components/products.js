/* Every value below is transcribed from the artwork in
   `Packaging - Zero Nonsense.pdf` — the cartons and sachets as they are printed.
   Nothing here is invented. Where the pack does not state something (the blue
   SKU's product name), it is flagged rather than filled in.

   The third SKU, Zero30 Daily, is transcribed from the front of its Mango
   Badaam pouch — the only artwork supplied for it. It carries no nutrition
   panel here because no back panel has been supplied; what the front states is
   all it states.

   `nutrition` rows are [label, per 100 g, per 36 g serving].
   `dv` rows are [label, % of daily value per 36 g serving, 2000 kcal diet].

   NAME DISCREPANCY — the red SKU is spelled OBEAT here, per the brand owner.
   The supplied artwork spells it OBEIT: on the dieline side panel ("OBEIT is
   more than just a partial meal replacement") and on every carton mockup. The
   print files need correcting before they go to press. The pack images this
   site ships still show the old spelling at small size. */

export const COMPANY = {
  marketer: 'Saanso Nutri Sciences Pvt. Ltd.',
  marketerAddress: '1st Floor, Quadrant 2, A1, Cyber Towers, Hitech City, Madhapur, Hyderabad, Telangana – 500081',
  manufacturer: 'Med C Pharma Pvt. Ltd.',
  manufacturerAddress: 'Plot No. 95 & 96, Aleap Industrial Estate, Gajularamaram, Medchal Malkajgiri Dist – 500072, Telangana, India',
  fssaiMarketer: '13624013002212',
  fssaiCategory: '13625999000044',
  category: 'Proprietary Food-Processed Cereal and Legume Products (6.7)',
  email: 'info@saansonutri.com',
  advisory: 'Patients consuming diabetic or other medicines shall consider a physician’s advice before using this product.',
};

export const RITUAL = [
  ['Open', 'Cut open the sachet.'],
  ['Mix', 'Slowly add contents to 200 ml boiling water while stirring.'],
  ['Cook', 'Simmer for 5–10 minutes.'],
  ['Enjoy', 'Serve warm.'],
];

export const RITUAL_NOTE = 'Create a more nourishing bowl by adding vegetables of your choice.';

export const PRODUCTS = [
  {
    id: 'blood-sugar',
    tone: 'blue',
    label: 'Blood Sugar',
    /* The carton carries no product name beyond the Zero Nonsense wordmark. */
    name: 'Daily Support for Blood Sugar & Metabolic Wellness',
    nameNote: 'Product name not printed on pack — to confirm',
    claim: 'Helps Manage HbA1c Levels',
    blurb:
      'Zero Nonsense Nutrition is your daily partner in supporting healthy blood sugar balance, helping promote steady energy and sustained well-being throughout the day.',
    /* Band colour is taken from the ground of this SKU's mockup in the deck,
       so the pack shot bleeds into the section background. */
    band: 'red',
    /* Cut out onto transparency so the pack sits directly on the band colour:
       no second rectangle of almost-matching red, and never cropped. */
    art: '/packs/pack-bloodsugar.webp',
    artSize: [1100, 535],
    card: '/packs/range-bloodsugar.webp',
    cardSize: [486, 342],
    artAlt: 'Two Blood Sugar cartons, front and back panels showing.',
    back: '/packs/back-bloodsugar.jpg',
    backSize: [1100, 1217],
    backAlt:
      'The back panel of the Blood Sugar carton: ingredient list with percentages, the full nutritional table, % daily values, FSSAI licence and manufacturer details.',
    net: '504 g',
    count: '14 sachets of 36 g each',
    specs: ['504 g', '14 sachets', 'Millet based'],
    stamps: ['Clinically Proven For Health Support', '100% Ingredient Transparency'],
    love: [
      '100% Natural Ingredients',
      'Nutrient-Dense Formula',
      'Rich in Omega-3 Fatty Acids',
      'No Artificial Sweeteners',
      'No Added Colours',
      'No Preservatives',
    ],
    ingredients: [
      ['Millets and Cereals', '45%', 'Pearl Barley, Pearl Millet, Ragi, Jowar'],
      ['Pulses', '15%', 'Bengal Gram, Black Gram, Green Gram'],
      [
        'Nuts and Seeds',
        '10%',
        'Almonds, Cashew, Peanuts, Raisins, Chia Seeds, Flax Seeds, Watermelon Seeds, Sunflower Seeds, Pumpkin Seeds',
      ],
      ['Dehydrated Vegetables', '2%', 'Carrot, Peas & Tomato'],
    ],
    remainder: 'Jaggery, Rock Salt, Tamarind, Gingelly Oil, Groundnut Oil, Ginger, Garlic, Chillies.',
    flavour: 'Contains Added Natural Flavour (Mixed Masala)',
    allergen: 'Contains Barley and Nuts',
    storage: 'Store in cool, dry place away from sun light, in air tight condition.',
    nutrition: [
      ['Total Energy', '391.5 Kcal', '140.94 Kcal'],
      ['Carbohydrates', '69 g', '24.84 g'],
      ['Total Sugars', '4.8 g', '1.72 g'],
      ['Added Sugars', '1 g', '0.36 g'],
      ['Total Dietary Fiber', '14 g', '5.04 g'],
      ['Protein', '12 g', '4.32 g'],
      ['Total Fat', '7.5 g', '2.70 g'],
      ['Saturated Fats', '0.5 g', '0.18 g'],
      ['Omega Fatty Acids', '7 g', '2.52 g'],
      ['Omega – 3', '1.4 g', '0.50 g'],
      ['Omega – 6', '2.7 g', '0.97 g'],
      ['Omega – 9', '2.9 g', '1.04 g'],
      ['Trans Fat', '<0.01 g', '<0.01 g'],
      ['Sodium', '786 mg', '282.96 mg'],
    ],
    dv: [
      ['Total Energy', '7.11%'],
      ['Added Sugars', '2.16%'],
      ['Total Fat', '4.38%'],
      ['Saturated Fat', '0.77%'],
      ['Trans Fat', '0.00%'],
      ['Sodium', '14.33%'],
    ],
  },
  {
    id: 'obeat',
    tone: 'red',
    label: 'OBEAT',
    name: 'Daily Nutrition Support for Calorie Conscious Living',
    claim: 'Helps Manage Hunger And supports metabolic wellness',
    blurb:
      'OBEAT is more than just a partial meal replacement — it is your daily partner in supporting calorie-conscious living, helping manage hunger pangs and balanced nutrition throughout the day.',
    band: 'blue',
    art: '/packs/pack-obeat.webp',
    artSize: [1100, 1167],
    card: '/packs/range-obeat.webp',
    cardSize: [498, 342],
    artAlt: 'Two OBEAT cartons stacked.',
    back: '/packs/back-obeit.jpg',
    backSize: [1100, 1204],
    backAlt:
      'The back panel of the OBEAT carton: ingredient list with percentages, the full nutritional table, % daily values, FSSAI licence and manufacturer details.',
    net: '504 g',
    count: '14 sachets of 36 g each',
    specs: ['504 g', '14 sachets', 'Millet based'],
    stamps: ['Nutrient Rich · Gut Friendly Formula', '100% Ingredient Transparency'],
    love: [
      '100% Natural Ingredients',
      'Controls hunger pangs',
      'Detoxifies body',
      'Benefits fitness',
      'No Artificial Sweeteners',
      'No Added Colours',
      'No Preservatives',
    ],
    ingredients: [
      ['Millets and Cereals', '41%', 'Pearl Barley, Ragi, Jowar'],
      ['Pulses', '11%', 'Bengal Gram, Black Gram, Green Gram'],
      [
        'Dry Fruits, Nuts & Seeds',
        '21%',
        'Almonds, Cashew, Raisins Dates, Chia Seeds, Flax Seeds, Watermelon Seeds, Pumpkin Seeds, Sunflower Seeds',
      ],
      ['Dehydrated Vegetables', '6%', 'Carrot, Peas & Tomato'],
    ],
    remainder: 'Jaggery, Rock Salt, Tamarind, Gingelly Oil, Groundnut Oil, Ginger, Garlic, Chillies.',
    flavour: 'Contains Added Natural Flavour (Mixed Masala)',
    allergen: 'Contains Barley and Nuts',
    storage: 'Store in cool, dry place away from sun light, in air tight condition.',
    nutrition: [
      ['Total Energy', '394 Kcal', '141.84 Kcal'],
      ['Carbohydrates', '68 g', '24.48 g'],
      ['Total Sugars', '5.5 g', '1.98 g'],
      ['Added Sugars', '2 g', '0.72 g'],
      ['Total Dietary Fiber', '14.5 g', '5.22 g'],
      ['Protein', '12.5 g', '4.50 g'],
      ['Total Fat', '8 g', '2.88 g'],
      ['Saturated Fats', '0.5 g', '0.18 g'],
      ['Omega Fatty Acids', '7 g', '2.52 g'],
      ['Omega – 3', '1.2 g', '0.43 g'],
      ['Omega – 6', '2.4 g', '0.86 g'],
      ['Omega – 9', '3.4 g', '1.22 g'],
      ['Trans Fat', '<0.01 g', '<0.01 g'],
      ['Sodium', '786 mg', '282.96 mg'],
    ],
    dv: [
      ['Total Energy', '7.09%'],
      ['Added Sugars', '4.32%'],
      ['Total Fat', '4.67%'],
      ['Saturated Fat', '0.77%'],
      ['Trans Fat', '0.00%'],
      ['Sodium', '14.33%'],
    ],
  },
  {
    id: 'zero30',
    tone: 'mango',
    label: 'Zero30 Daily',
    name: 'Complete Nourishment Powder',
    claim: 'No quick fixes. Only clean nutrition.',
    blurb:
      'Zero30 Daily is the range’s nourishment powder — mixed, not simmered. One flavour is in production: Mango Badaam.',
    /* Band colour sampled from the pouch mock-up's own ground, the same way the
       two cartons' bands are sampled, so the pack shot bleeds into the section. */
    band: 'mango',
    /* The pack, plinth and props lifted out of the supplied band design — see
       the README. Its pack face reads NET WT. 500GM, which is what the real
       pouch prints. */
    art: '/packs/pack-zero30-plinth.webp',
    artSize: [818, 698],
    /* The band is set from the supplied design rather than the generic
       product-band copy: its own eyebrow, a two-line headline, no free-from
       list, and the pack's headline promoted to a closing strip. */
    bandEyebrow: 'Zero30 / Daily nourishment',
    bandLines: ['Complete nourishment.', 'Zero nonsense.'],
    bandNote: 'As printed on the front of the pack.',
    bandStrip: 'No quick fixes. Only clean nutrition.',
    showFreeFrom: false,
    /* The range card uses the pack shot from the supplied lineup reference —
       see the README: it is a regenerated render, approved for the cards, and
       its pack face reads "NET WT. 360GMS" where the real pouch prints 500GMS.
       The spec line below it stays at 500 g, which is what the pack says. The
       lifestyle render (card-zero30.jpg) is kept for the structured data. */
    card: '/packs/range-zero30.webp',
    cardSize: [571, 396],
    artAlt: 'The Zero30 Daily Mango Badaam pouch, front panel.',
    net: '500 g',
    count: 'One pouch',
    specs: ['500 g', 'Mango Badaam', '22 g protein', '7 g fibre'],
    /* On the card the pack's headline is the section's own sign-off line, so
       the card says what the product is instead of repeating it. */
    cardClaim: 'A daily nourishment powder made with plant ingredients.',
    flavourName: 'Mango Badaam',
    flavourNote: 'One flavour in production. The rest of the range follows.',
    usage: 'Mixes with Water or Milk',
    /* Printed on the front in place of a nutrition panel. The pack does not say
       what the 22 g and 7 g are measured against, so the site does not either. */
    frontFacts: [
      ['Protein', '22 g'],
      ['Fibre', '7 g'],
    ],
    factsNote: 'As printed on the front · 500 g pouch · Nutraceuticals for adults',
    frontClaims: ['No added sugar', 'Low sugar spike', 'Made with plant ingredients'],
    fineprint:
      '✱ What are you looking for? There’s nothing hiding here either. No added preservatives. No ingredient hide-and-seek. Turn it around only if you’re curious.',
    /* No back panel has been supplied for this SKU, so it is kept out of the
       label sheet rather than filled with a guess. */
    labelPending:
      'Front-of-pack data only. The back panel has not been supplied — it prints here the day it lands.',
  },
];


/* The two hero frames supplied as finished artwork.

   The words below are transcribed from those frames. The photographs in
   `/public/hero` are the same frames with the painted nav plate and the painted
   copy lifted out, so the site can set its own type live — the headline
   reflows, the button is a real link, and a screen reader gets the words
   instead of a picture of them. The plate is filled rather than cropped away:
   cropping it took the headroom the design leaves above the annotations with
   it, and the site's own nav then landed straight on top of them.

   `ground` is sampled from the part of each frame the copy sits on. It is the
   flat colour the hero falls back to on a phone, where the photograph moves
   below the copy rather than behind it, and it is what the frame letterboxes
   into on very wide screens.

   Blue leads, then red. */
export const HERO_SLIDES = [
  {
    id: 'blood-sugar',
    eyebrow: 'Blood sugar support',
    lines: ['Same Goals.', 'Fewer Shortcuts.'],
    blurb: 'Purposeful nutrition to help manage blood sugar and support metabolic health.',
    image: '/hero/hero-bloodsugar.webp',
    size: [1536, 1024],
    ground: '#B7CFE8',
    alt:
      'Two Blood Sugar cartons on a concrete plinth against a bright sky, one turned to show the full ingredient panel.',
  },
  {
    id: 'obeat',
    eyebrow: 'Calorie control support',
    lines: ['Nutrition', 'that fits', 'real life.'],
    /* The supplied frame rules the last line in Verification Stamp. */
    markLast: true,
    blurb: 'Helps manage hunger and supports metabolic wellness.',
    image: '/hero/hero-obeat.webp',
    size: [1717, 916],
    ground: '#EAD5C1',
    alt:
      'An OBEAT carton standing on travertine steps against a plaster wall, its side panel facing the camera.',
  },
];

/* Both frames point at the same place, so the call to action is written once. */
export const HERO_CTA = ['Explore the label', '#label'];
