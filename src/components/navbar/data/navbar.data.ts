import type { NavLink, NavLinkWithChildren, ContactInfo } from '../types/navbar.types';

// Main navigation links
export const navLinks: (NavLink | NavLinkWithChildren)[] = [
  { 
    href: '/services', 
    label: 'Services', 
    ariaLabel: 'View our limousine services',
    children: [
      { href: '/services/airport-transportation', label: 'Airport Transportation', ariaLabel: 'Learn about our airport transportation services' },
      { href: '/services/corporate-travel', label: 'Corporate Travel', ariaLabel: 'Learn about our corporate travel services' },
      { href: '/services/weddings', label: 'Weddings', ariaLabel: 'Learn about our wedding transportation services' },
      { href: '/services/special-occasions', label: 'Special Occasions', ariaLabel: 'Learn about our special occasion services' },
      { href: '/services/hourly-charter', label: 'Hourly Charter', ariaLabel: 'Learn about our hourly charter services' },
    ]
  },
  { 
    href: '/fleet', 
    label: 'Fleet', 
    ariaLabel: 'Explore our luxury vehicle fleet',
    children: [
      { href: '/fleet/sedans', label: 'Luxury Sedans', ariaLabel: 'View our luxury sedan options' },
      { href: '/fleet/suvs', label: 'Luxury SUVs', ariaLabel: 'View our luxury SUV options' },
      { href: '/fleet/stretch-limos', label: 'Stretch Limousines', ariaLabel: 'View our stretch limousine options' },
      { href: '/fleet/vans', label: 'Executive Vans', ariaLabel: 'View our executive van options' },
      { href: '/fleet/buses', label: 'Mini Buses & Coaches', ariaLabel: 'View our mini bus and coach options' },
    ]
  },
  { href: '/about', label: 'About', ariaLabel: 'Learn about All American Limousine' },
  { href: '/contact', label: 'Contact', ariaLabel: 'Contact All American Limousine' },
];

// Call to action button
export const ctaLink: NavLink = {
  href: '/book',
  label: 'Book Now',
  ariaLabel: 'Book your luxury transportation now',
};

// Contact information for the header
export const contactInfo: ContactInfo = {
  phone: '(773) 992-0902',
  email: 'info@allamericanlimo.com',
  address: '70 W Madison St, Ste 1400, Chicago, IL 60602',
};

// Social media links
export const socialLinks: NavLink[] = [
  { href: 'https://facebook.com', label: 'Facebook', ariaLabel: 'Visit our Facebook page' },
  { href: 'https://twitter.com', label: 'Twitter', ariaLabel: 'Visit our Twitter profile' },
  { href: 'https://instagram.com', label: 'Instagram', ariaLabel: 'Visit our Instagram profile' },
  { href: 'https://linkedin.com', label: 'LinkedIn', ariaLabel: 'Visit our LinkedIn page' },
];
