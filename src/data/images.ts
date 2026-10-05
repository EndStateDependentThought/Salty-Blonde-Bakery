import heroRoll from '../assets/images/hero-roll.jpg';
import rollTear from '../assets/images/roll-tear.jpg';
import cookieCrossSection from '../assets/images/cookie-cross-section.jpg';
import rollDetail from '../assets/images/roll-detail.jpg';
import processRolls from '../assets/images/process-rolls.jpg';
import processCookies from '../assets/images/process-cookies.jpg';
import menuClassicCinnamonRoll from '../assets/images/menu-verified/classic-cinnamon-roll.jpg';
import menuSaltedBrownButterChocolateChip from '../assets/images/menu-verified/salted-brown-butter-chocolate-chip.jpg';
import menuHydeParkCookie from '../assets/images/menu-verified/hyde-park-cookie.jpg';
import menuCaramelPecanStickyBun from '../assets/images/menu-verified/caramel-pecan-sticky-bun.jpg';

import sprinklePair from '../assets/images/gallery/sprinkle-pair.jpg';
import sprinkleDepth from '../assets/images/gallery/sprinkle-depth.jpg';
import stickyPecan from '../assets/images/gallery/sticky-pecan.jpg';
import glazedRollHand from '../assets/images/gallery/glazed-roll-hand.jpg';
import fruitGlazeRoll from '../assets/images/gallery/fruit-glaze-roll.jpg';
import redCookie from '../assets/images/gallery/red-cookie.jpg';
import crumbCookie from '../assets/images/gallery/crumb-cookie.jpg';
import cookiesCreamCookie from '../assets/images/gallery/cookies-cream-cookie.jpg';
import darkCookieTear from '../assets/images/gallery/dark-cookie-tear.jpg';
import icedCookie from '../assets/images/gallery/iced-cookie.jpg';
import packaging from '../assets/images/gallery/packaging.jpg';
import customers from '../assets/images/gallery/customers.jpg';
import trailer from '../assets/images/gallery/trailer.jpg';

import sprinkleRoll from '../assets/images/expanded/sprinkle-roll.jpg';
import stickySlab from '../assets/images/expanded/sticky-slab.jpg';
import cookieTray from '../assets/images/expanded/cookie-tray.jpg';
import amberRoll from '../assets/images/expanded/amber-roll.jpg';
import crumbCookiePair from '../assets/images/expanded/crumb-cookie-pair.jpg';
import crumbCookieTear from '../assets/images/expanded/crumb-cookie-tear.jpg';
import pecanSlab from '../assets/images/expanded/pecan-slab.jpg';
import customersOutside from '../assets/images/expanded/customers-outside.jpg';
import type { BakeryImage } from '../types/content';

export const images = {
  menuClassicCinnamonRoll: {
    id: 'menu-classic-cinnamon-roll', sourceFilename: 'Bake(2)/IMG_0934', src: menuClassicCinnamonRoll,
    alt: 'Classic Salty Blonde cinnamon roll with simple icing in a bakery box.', focalPoint: '50% 52%', role: 'product',
  },
  menuSaltedBrownButterChocolateChip: {
    id: 'menu-salted-brown-butter-chocolate-chip', sourceFilename: 'Bake(2)/IMG_0937', src: menuSaltedBrownButterChocolateChip,
    alt: 'Salted brown butter chocolate chip cookies with chocolate pieces and flaky sea salt in a bakery box.', focalPoint: '50% 48%', role: 'product',
  },
  menuHydeParkCookie: {
    id: 'menu-hyde-park-cookie', sourceFilename: 'Bake(7)/IMG_0611', src: menuHydeParkCookie,
    alt: 'Hyde Park cookie with visible chocolate, homemade toffee, pretzel pieces, and flaky salt.', focalPoint: '50% 50%', role: 'product',
  },
  menuCaramelPecanStickyBun: {
    id: 'menu-caramel-pecan-sticky-bun', sourceFilename: 'Bake(2)/IMG_1814', src: menuCaramelPecanStickyBun,
    alt: 'Caramel pecan sticky buns covered with glossy homemade caramel and pecans.', focalPoint: '50% 46%', role: 'product',
  },
  heroRoll: {
    id: 'hero-roll', sourceFilename: 'Bake/IMG_1905', src: heroRoll,
    alt: 'Large glazed bakery roll in a lavender Salty Blonde Bakery box on a dark outdoor table.', focalPoint: '50% 68%', role: 'hero',
  },
  rollTear: {
    id: 'roll-tear', sourceFilename: 'Bake(2)/IMG_2906', src: rollTear,
    alt: 'Gloved hand holding a torn bakery roll to show its soft interior and filling.', focalPoint: '52% 48%', role: 'product',
  },
  cookieCrossSection: {
    id: 'cookie-cross-section', sourceFilename: 'Bake(7)/IMG_0631', src: cookieCrossSection,
    alt: 'Gloved hand holding a thick cookie cross-section with visible chocolate filling.', focalPoint: '50% 45%', role: 'product',
  },
  rollDetail: {
    id: 'roll-detail', sourceFilename: 'Bake(8)/IMG_0911', src: rollDetail,
    alt: 'Close view of a torn bakery roll showing a gooey spiced filling and crumb topping.', focalPoint: '50% 50%', role: 'detail',
  },
  processRolls: {
    id: 'process-rolls', sourceFilename: 'Bake(5)/IMG_0549', src: processRolls,
    alt: 'Baker working beside trays filled with rolls and other baked goods.', focalPoint: '45% 50%', role: 'process',
  },
  processCookies: {
    id: 'process-cookies', sourceFilename: 'Bake(4)/IMG_1263', src: processCookies,
    alt: 'Baker shaping rows of cookie dough on parchment at a stainless worktable.', focalPoint: '50% 48%', role: 'process',
  },
  sprinklePair: {
    id: 'sprinkle-pair', sourceFilename: 'Bake(3)/IMG_2037', src: sprinklePair,
    alt: 'Two colorful frosted bakery specials in lavender boxes on an outdoor wooden table.', focalPoint: '50% 50%', role: 'product',
  },
  sprinkleDepth: {
    id: 'sprinkle-depth', sourceFilename: 'Bake(3)/IMG_2040', src: sprinkleDepth,
    alt: 'Colorful frosted bakery specials with rainbow sprinkles arranged in lavender boxes outdoors.', focalPoint: '52% 55%', role: 'product',
  },
  stickyPecan: {
    id: 'sticky-pecan', sourceFilename: 'Bake(2)/IMG_1813', src: stickyPecan,
    alt: 'Glossy pecan-topped sticky bake shown close enough to see the caramelized surface.', focalPoint: '50% 48%', role: 'detail',
  },
  glazedRollHand: {
    id: 'glazed-roll-hand', sourceFilename: 'Bake(8)/IMG_1216', src: glazedRollHand,
    alt: 'Gloved hand holding a glazed cinnamon roll in a small bakery box.', focalPoint: '50% 42%', role: 'product',
  },
  fruitGlazeRoll: {
    id: 'fruit-glaze-roll', sourceFilename: 'Bake(5)/IMG_3154', src: fruitGlazeRoll,
    alt: 'Glossy fruit-topped specialty roll in a lavender bakery box.', focalPoint: '50% 52%', role: 'product',
  },
  redCookie: {
    id: 'red-cookie', sourceFilename: 'Bake(6)/IMG_2805', src: redCookie,
    alt: 'A red-toned cookie broken open to show its soft filled center.', focalPoint: '50% 45%', role: 'product',
  },
  crumbCookie: {
    id: 'crumb-cookie', sourceFilename: 'Bake(5)/IMG_3077', src: crumbCookie,
    alt: 'Gloved hand holding a thick crumb-topped cookie above a lavender bakery box.', focalPoint: '50% 43%', role: 'product',
  },
  cookiesCreamCookie: {
    id: 'cookies-cream-cookie', sourceFilename: 'Bake(8)/IMG_1709', src: cookiesCreamCookie,
    alt: 'Dark cookies-and-cream style cookie resting in a lavender bakery box.', focalPoint: '50% 50%', role: 'product',
  },
  darkCookieTear: {
    id: 'dark-cookie-tear', sourceFilename: 'Bake(8)/IMG_1734', src: darkCookieTear,
    alt: 'Dark cookie torn open by a gloved hand to show the textured interior.', focalPoint: '50% 48%', role: 'detail',
  },
  icedCookie: {
    id: 'iced-cookie', sourceFilename: 'Bake(7)/IMG_3073', src: icedCookie,
    alt: 'Thick cookie topped with icing and crumb pieces held close to the camera.', focalPoint: '50% 47%', role: 'product',
  },
  packaging: {
    id: 'packaging', sourceFilename: 'Bake(5)/IMG_6317', src: packaging,
    alt: 'Individually packaged baked goods with lavender Salty Blonde labels.', focalPoint: '50% 44%', role: 'packaging',
  },
  customers: {
    id: 'customers', sourceFilename: 'Bake(8)/IMG_0864', src: customers,
    alt: 'Two bakery customers smiling outdoors while holding Salty Blonde treats.', focalPoint: '50% 34%', role: 'people',
  },
  trailer: {
    id: 'trailer', sourceFilename: 'Bake/IMG_1998', src: trailer,
    alt: 'Salty Blonde Bakery trailer and outdoor service area in Austin.', focalPoint: '50% 48%', role: 'location',
  },
  sprinkleRoll: {
    id: 'sprinkle-roll', sourceFilename: 'Bake/IMG_2007', src: sprinkleRoll,
    alt: 'Large frosted sprinkle roll in a lavender bakery box on a wooden picnic table.', focalPoint: '50% 48%', role: 'product',
  },
  stickySlab: {
    id: 'sticky-slab', sourceFilename: 'Bake(2)/IMG_1816', src: stickySlab,
    alt: 'Large caramelized pecan sticky bake with a glossy, nutty surface.', focalPoint: '50% 48%', role: 'detail',
  },
  cookieTray: {
    id: 'cookie-tray', sourceFilename: 'Bake(4)/IMG_1271', src: cookieTray,
    alt: 'Sheet tray lined with neat rows of chocolate chip cookie dough in the bakery kitchen.', focalPoint: '50% 50%', role: 'process',
  },
  amberRoll: {
    id: 'amber-roll', sourceFilename: 'Bake(5)/IMG_3136', src: amberRoll,
    alt: 'Glossy amber-colored specialty roll in a lavender Salty Blonde box outdoors.', focalPoint: '50% 48%', role: 'product',
  },
  crumbCookiePair: {
    id: 'crumb-cookie-pair', sourceFilename: 'Bake(6)/IMG_2844', src: crumbCookiePair,
    alt: 'Two thick iced crumb cookies in lavender bakery boxes.', focalPoint: '50% 48%', role: 'product',
  },
  crumbCookieTear: {
    id: 'crumb-cookie-tear', sourceFilename: 'Bake(6)/IMG_2857', src: crumbCookieTear,
    alt: 'Crumb-topped cookie broken open to show a soft layered center.', focalPoint: '50% 45%', role: 'detail',
  },
  pecanSlab: {
    id: 'pecan-slab', sourceFilename: 'Bake(7)/IMG_3061', src: pecanSlab,
    alt: 'Close overhead view of a glossy pecan-topped bake fresh from the pan.', focalPoint: '50% 48%', role: 'detail',
  },
  customersOutside: {
    id: 'customers-outside', sourceFilename: 'Bake(8)/IMG_0868', src: customersOutside,
    alt: 'Two Salty Blonde Bakery customers smiling outside near the trailer.', focalPoint: '50% 38%', role: 'people',
  },
} satisfies Record<string, BakeryImage>;
