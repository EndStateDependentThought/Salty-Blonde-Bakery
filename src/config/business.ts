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
  directionsUrl: 'https://www.google.com/maps/dir//4215%2BAvenue%2BH%2C%2BAustin%2C%2BTX%2B78751/%4030.2907392%2C-97.7338368%2C14z/data%3D%214m8%214m7%211m0%211m5%211m1%211s0xa2a5bc384c58b187%3A0x3c9b53bcbcff7266%212m2%211d-97.726857%212d30.304786',
  preorders: {
    supported: true,
    minimumNotice: '48 hours',
    emailSubject: 'Salty Blonde Bakery pre-order request',
  },
} as const;
