export const seasonalFeature = {
  active: true,
  eyebrow: 'Fall + Thanksgiving specials',
  title: 'Fall favorites are baking.',
  description: 'Apple pie crumble, apple cider, pumpkin spice, and cozy bakery boxes built for fall cravings and Thanksgiving dessert runs. These specials rotate in small batches, so check today’s live menu before making a favorite your entire plan.',
  note: 'Seasonal items rotate and can sell through quickly—especially on holiday weeks. The live ordering menus are the current source for availability.',
  items: [
    { name: 'Apple Pie Crumble Roll', kind: 'Seasonal roll', imageId: 'applePieCrumbleRoll' },
    { name: 'Apple Cider Cookie', kind: 'Seasonal cookie', imageId: 'appleCiderCookie' },
    { name: 'Pumpkin Spice Cinnamon Roll', kind: 'Seasonal roll', imageId: 'pumpkinSpiceCinnamonRoll' },
    { name: 'Punk’n Pie Cookie', kind: 'Seasonal cookie', imageId: 'punkNPieCookie' },
  ],
} as const;
