import { orderingConfig } from '../config/ordering';

const uberEatsUrl = orderingConfig.destinations.find((destination) => destination.id === 'uber-eats')?.url ?? orderingConfig.orderRoute;
const doorDashUrl = orderingConfig.destinations.find((destination) => destination.id === 'doordash')?.url ?? orderingConfig.orderRoute;

/**
 * Review ratings are intentionally a lightweight marketing snapshot rather than
 * a live API integration. Update these occasionally when the public ratings move.
 * Snapshot checked October 2026.
 */
export const reviewPlatforms = [
  {
    name: 'Google',
    rating: '5.0',
    href: 'https://www.google.com/maps/search/?api=1&query=Salty%20Blonde%20Bakery%2C%204215%20Avenue%20H%2C%20Austin%2C%20TX%2078751',
  },
  {
    name: 'Yelp',
    rating: '4.9',
    href: 'https://www.yelp.com/search?find_desc=Salty%20Blonde%20Bakery&find_loc=Austin%2C%20TX',
  },
  {
    name: 'Uber Eats',
    rating: '4.9',
    href: uberEatsUrl,
  },
  {
    name: 'DoorDash',
    rating: '4.8',
    href: doorDashUrl,
  },
] as const;
