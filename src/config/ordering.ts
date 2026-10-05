export const orderingConfig = {
  orderRoute: '/order/',
  primaryDestinationId: 'uber-eats',
  destinations: [
    {
      id: 'uber-eats',
      name: 'Uber Eats',
      url: 'https://www.ubereats.com/store/salty-blonde-bakery/9lhtal8OXqyJXJq_yZrChw',
      note: 'Live menu · delivery + current availability',
    },
    {
      id: 'doordash',
      name: 'DoorDash',
      url: 'https://www.doordash.com/store/salty-blonde-bakery---4215-avenue-h-austin-35503369/',
      note: 'Live menu · delivery + current availability',
    },
  ],
} as const;
