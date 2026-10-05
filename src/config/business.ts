export const businessConfig = {
  name: 'Salty Blonde Bakery',
  shortName: 'Salty Blonde',
  siteUrl: 'https://saltyblondebakery.com',
  description: 'Small-batch bakery in Hyde Park, Austin known for handmade cinnamon rolls, brown butter cookies, and rotating weekly specials.',
  address: {
    street: '4215 Ave H',
    city: 'Austin',
    region: 'TX',
    postalCode: '78751',
    country: 'US',
    note: 'In the parking lot across from Fresh Plus.',
  },
  hours: [
    { label: 'Wednesday–Thursday', display: '8am–2pm', schemaDays: ['Wednesday', 'Thursday'], opens: '08:00', closes: '14:00' },
    { label: 'Friday–Sunday', display: '8am–6pm', schemaDays: ['Friday', 'Saturday', 'Sunday'], opens: '08:00', closes: '18:00' },
    { label: 'Monday–Tuesday', display: 'Closed', schemaDays: ['Monday', 'Tuesday'], opens: null, closes: null },
  ],
  email: 'saltyblondebakery@icloud.com',
  phoneDisplay: '(626) 641-6609',
  phoneHref: '+16266416609',
  instagramUrl: 'https://www.instagram.com/the.saltyblondebakery/',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=4215%20Avenue%20H%2C%20Austin%2C%20TX%2078751&travelmode=driving',
  preorders: {
    supported: true,
    minimumNotice: '48 hours',
    emailSubject: 'Salty Blonde Bakery pre-order request',
  },
} as const;
