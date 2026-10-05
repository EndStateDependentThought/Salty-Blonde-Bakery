import type { MenuCategory, MenuItem } from '../types/content';

export const menuCategories: MenuCategory[] = [
  {
    id: 'rolls',
    name: 'Cinnamon rolls',
    intro: 'Soft layers, gooey centers, sweet icing — plus whatever seasonal roll made the week more interesting.',
  },
  {
    id: 'cookies',
    name: 'Brown butter cookies',
    intro: 'Crisp edges, chewy centers, deep brown-butter flavor, and enough texture to make the break-open shot mandatory.',
  },
  {
    id: 'rotating',
    name: 'Rotating specials',
    intro: 'The part of the menu that refuses to sit still. Some flavors stay awhile, some come back later, some disappear fast.',
  },
  {
    id: 'packs',
    name: 'Packs & bigger orders',
    intro: 'For sharing, gifting, office mornings, parties, or the completely valid decision to keep the whole box.',
  },
];

export const menuItems: MenuItem[] = [
  {
    id: 'classic-cinnamon-roll',
    slug: 'classic-cinnamon-roll',
    name: 'Classic Cinnamon Roll',
    categoryId: 'rolls',
    description: 'Our signature roll with soft layers, gooey cinnamon filling, and sweet simple icing. Fresh-baked, nostalgic, and worth the napkin.',
    allergens: 'Contains wheat, dairy, and eggs.',
    imageId: 'menuClassicCinnamonRoll',
  },
  {
    id: 'caramel-pecan-sticky-bun',
    slug: 'caramel-pecan-sticky-bun',
    name: 'Caramel Pecan Sticky Bun',
    categoryId: 'rolls',
    description: 'Soft cinnamon roll topped with homemade caramel and plenty of pecans. Sticky, buttery, nutty, and over-the-top in the best way.',
    allergens: 'Contains wheat, dairy, eggs, and pecans.',
    imageId: 'menuCaramelPecanStickyBun',
  },
  {
    id: 'brown-butter-chocolate-chip',
    slug: 'brown-butter-chocolate-chip',
    name: 'Salted Brown Butter Chocolate Chip',
    categoryId: 'cookies',
    description: 'Our signature brown-butter chocolate chip cookie with crisp edges, a chewy center, premium chocolate, and a kiss of sea salt.',
    allergens: 'Contains wheat, dairy, and eggs.',
    imageId: 'menuSaltedBrownButterChocolateChip',
  },
  {
    id: 'hyde-park-cookie',
    slug: 'hyde-park-cookie',
    name: 'The Hyde Park Cookie',
    categoryId: 'cookies',
    description: 'Brown-butter chocolate chip cookie loaded with homemade toffee and pretzels for sweet, salty, crunchy chaos.',
    allergens: 'Contains wheat, dairy, and eggs.',
    imageId: 'menuHydeParkCookie',
  },
  {
    id: 'cookie-sampler',
    slug: 'cookie-sampler',
    name: '6-Cookie Sampler',
    categoryId: 'packs',
    description: 'A half-dozen assorted cookies with signature favorites and rotating flavors. Best when choosing one cookie feels unfair.',
    allergens: 'Allergens vary by selection.',
    imageId: 'packaging',
  },
  {
    id: 'classic-roll-four-pack',
    slug: 'classic-roll-four-pack',
    name: 'Classic Cinnamon Roll 4-Pack',
    categoryId: 'packs',
    description: 'Four fresh-baked classic rolls packed up for sharing, gifting, office mornings, or absolutely not sharing.',
    allergens: 'Contains wheat, dairy, and eggs.',
    imageId: 'processRolls',
  },
];
