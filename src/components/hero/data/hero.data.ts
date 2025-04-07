import { Location, PopularLocation, VehicleOption, TimeOption, HeroConfig, RideType } from '../types/hero.types';

// Default pickup location - O'Hare Airport Chicago
export const defaultPickupLocation: Location = {
  id: 'ohare-airport',
  name: 'O\'Hare International Airport',
  address: 'O\'Hare International Airport, Chicago, IL 60666',
  type: 'airport',
  coordinates: {
    lat: 41.9742,
    lng: -87.9073
  },
  icon: 'plane-landing'
};

// Popular locations in Chicago
export const popularLocations: PopularLocation[] = [
  {
    id: 'midway-airport',
    name: 'Midway International Airport',
    address: 'Midway International Airport, Chicago, IL 60638',
    type: 'airport',
    coordinates: {
      lat: 41.7868,
      lng: -87.7522
    },
    icon: 'plane-landing',
    popularity: 9,
    description: 'Chicago\'s second major international airport'
  },
  {
    id: 'downtown-chicago',
    name: 'Downtown Chicago',
    address: 'The Loop, Chicago, IL',
    type: 'business',
    coordinates: {
      lat: 41.8781,
      lng: -87.6298
    },
    icon: 'building-skyscraper',
    popularity: 10,
    description: 'The central business district of Chicago'
  },
  {
    id: 'magnificent-mile',
    name: 'Magnificent Mile',
    address: 'North Michigan Avenue, Chicago, IL',
    type: 'venue',
    coordinates: {
      lat: 41.8948,
      lng: -87.6242
    },
    icon: 'shopping-bag',
    popularity: 8,
    description: 'Upscale shopping district with luxury boutiques'
  },
  {
    id: 'navy-pier',
    name: 'Navy Pier',
    address: '600 E Grand Ave, Chicago, IL 60611',
    type: 'venue',
    coordinates: {
      lat: 41.8919,
      lng: -87.6051
    },
    icon: 'ferris-wheel',
    popularity: 7,
    description: 'Popular tourist destination on Lake Michigan'
  },
  {
    id: 'united-center',
    name: 'United Center',
    address: '1901 W Madison St, Chicago, IL 60612',
    type: 'venue',
    coordinates: {
      lat: 41.8806,
      lng: -87.6742
    },
    icon: 'basketball',
    popularity: 6,
    description: 'Home of the Chicago Bulls and Blackhawks'
  },
  {
    id: 'millennium-park',
    name: 'Millennium Park',
    address: '201 E Randolph St, Chicago, IL 60602',
    type: 'venue',
    coordinates: {
      lat: 41.8826,
      lng: -87.6233
    },
    icon: 'park',
    popularity: 9,
    description: 'Home to Cloud Gate (The Bean) sculpture'
  },
  {
    id: 'willis-tower',
    name: 'Willis Tower',
    address: '233 S Wacker Dr, Chicago, IL 60606',
    type: 'business',
    coordinates: {
      lat: 41.8789,
      lng: -87.6359
    },
    icon: 'building',
    popularity: 8,
    description: 'Iconic skyscraper with observation deck'
  },
  {
    id: 'art-institute',
    name: 'Art Institute of Chicago',
    address: '111 S Michigan Ave, Chicago, IL 60603',
    type: 'venue',
    coordinates: {
      lat: 41.8796,
      lng: -87.6237
    },
    icon: 'museum',
    popularity: 7,
    description: 'World-renowned art museum'
  },
  {
    id: 'wrigley-field',
    name: 'Wrigley Field',
    address: '1060 W Addison St, Chicago, IL 60613',
    type: 'venue',
    coordinates: {
      lat: 41.9484,
      lng: -87.6553
    },
    icon: 'baseball',
    popularity: 8,
    description: 'Historic home of the Chicago Cubs'
  },
  {
    id: 'shedd-aquarium',
    name: 'Shedd Aquarium',
    address: '1200 S DuSable Lake Shore Dr, Chicago, IL 60605',
    type: 'venue',
    coordinates: {
      lat: 41.8676,
      lng: -87.6140
    },
    icon: 'fish',
    popularity: 7,
    description: 'One of the largest indoor aquariums in the world'
  },
  {
    id: 'field-museum',
    name: 'Field Museum',
    address: '1400 S DuSable Lake Shore Dr, Chicago, IL 60605',
    type: 'venue',
    coordinates: {
      lat: 41.8663,
      lng: -87.6170
    },
    icon: 'museum',
    popularity: 7,
    description: 'Natural history museum with Sue the T-Rex'
  },
  {
    id: 'lincoln-park-zoo',
    name: 'Lincoln Park Zoo',
    address: '2001 N Clark St, Chicago, IL 60614',
    type: 'venue',
    coordinates: {
      lat: 41.9217,
      lng: -87.6336
    },
    icon: 'zoo',
    popularity: 6,
    description: 'Free admission zoo in Lincoln Park'
  }
];

// Vehicle options based on the fleet data
export const vehicleOptions: VehicleOption[] = [
  {
    id: 'luxury-sedan',
    type: 'sedan',
    name: 'Luxury Sedan',
    description: 'Perfect for individuals or couples seeking elegance and comfort',
    capacity: {
      passengers: 3,
      luggage: 3
    },
    pricePerMile: 3.5,
    basePrice: 85,
    image: 'https://images.unsplash.com/photo-1549399542-7e8f29e5c74a?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Premium leather seating',
      'Climate control',
      'Complimentary bottled water',
      'Charging ports'
    ],
    availability: 'high',
    luxuryLevel: 4
  },
  {
    id: 'executive-suv',
    type: 'suv',
    name: 'Executive SUV',
    description: 'Spacious luxury for small groups with additional luggage capacity',
    capacity: {
      passengers: 6,
      luggage: 6
    },
    pricePerMile: 4.5,
    basePrice: 120,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Spacious leather seating',
      'Tri-zone climate control',
      'Extra luggage capacity',
      'Privacy glass'
    ],
    availability: 'high',
    luxuryLevel: 4
  },
  {
    id: 'stretch-limousine',
    type: 'limousine',
    name: 'Stretch Limousine',
    description: 'The ultimate in luxury transportation for special occasions',
    capacity: {
      passengers: 10,
      luggage: 6
    },
    pricePerMile: 5.5,
    basePrice: 220,
    image: 'https://images.unsplash.com/photo-1585637071663-0656e789d882?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Extended passenger compartment',
      'Premium entertainment system',
      'Ambient lighting',
      'Privacy partition'
    ],
    availability: 'medium',
    luxuryLevel: 5
  },
  {
    id: 'executive-sprinter',
    type: 'van',
    name: 'Executive Sprinter',
    description: 'Premium group transportation with executive amenities',
    capacity: {
      passengers: 14,
      luggage: 14
    },
    pricePerMile: 6.0,
    basePrice: 180,
    image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Executive seating configuration',
      'High ceiling for easy movement',
      'Entertainment system',
      'Ample luggage space'
    ],
    availability: 'medium',
    luxuryLevel: 4
  }
];

// Time options for booking
export const timeOptions: TimeOption[] = [
  { id: 'now', label: 'As soon as possible', value: 'now', isPopular: true },
  { id: 'morning', label: 'Morning (8:00 AM - 12:00 PM)', value: 'morning' },
  { id: 'afternoon', label: 'Afternoon (12:00 PM - 5:00 PM)', value: 'afternoon' },
  { id: 'evening', label: 'Evening (5:00 PM - 9:00 PM)', value: 'evening', isPopular: true },
  { id: 'night', label: 'Night (9:00 PM - 8:00 AM)', value: 'night' }
];

// Ride types
export const rideTypes: RideType[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Our classic luxury service with all the essentials',
    icon: 'car',
    baseMultiplier: 1.0
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Enhanced service with priority dispatch and extra amenities',
    icon: 'star',
    baseMultiplier: 1.25
  },
  {
    id: 'vip',
    name: 'VIP',
    description: 'The ultimate luxury experience with personalized service',
    icon: 'crown',
    baseMultiplier: 1.5
  }
];

// Hero section configuration
export const heroConfig: HeroConfig = {
  title: 'All American Limousine',
  subtitle: 'Luxury Transportation in Chicago',
  backgroundImage: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=1800&auto=format&fit=crop',
  backgroundVideo: 'https://player.vimeo.com/external/308162286.hd.mp4?s=9f9723d91f96b9872965e4f573eb7c90c8e3b51e&profile_id=175&oauth2_token_id=57447761',
  defaultPickupLocation,
  popularLocations,
  vehicleOptions,
  timeOptions,
  rideTypes,
  showPriceEstimate: true,
  animationPreference: 'subtle'
};
