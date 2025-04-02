/**
 * Types for the hero section booking functionality
 */

// Location type for pickup and dropoff
export interface Location {
  id: string;
  name: string;
  address: string;
  type: 'airport' | 'hotel' | 'business' | 'residence' | 'venue' | 'custom';
  coordinates?: {
    lat: number;
    lng: number;
  };
  icon?: string;
}

// Popular locations type
export interface PopularLocation extends Location {
  popularity: number; // 1-10 scale
  description?: string;
}

// Vehicle selection type
export interface VehicleOption {
  id: string;
  type: string;
  name: string;
  description: string;
  capacity: {
    passengers: number;
    luggage: number;
  };
  pricePerMile: number;
  basePrice: number;
  image: string;
  features: string[];
  availability: 'high' | 'medium' | 'low';
  luxuryLevel: 1 | 2 | 3 | 4 | 5; // 5 being the most luxurious
}

// Booking time options
export interface TimeOption {
  id: string;
  label: string;
  value: string;
  isPopular?: boolean;
}

// Ride type options
export interface RideType {
  id: string;
  name: string;
  description: string;
  icon: string;
  baseMultiplier: number; // Price multiplier
}

// Booking form data
export interface BookingFormData {
  pickupLocation: Location | null;
  dropoffLocation: Location | null;
  date: Date | null;
  time: string | null;
  passengers: number;
  luggage: number;
  vehicleType: string | null;
  rideType: string | null;
  specialRequests?: string;
}

// Price estimate
export interface PriceEstimate {
  basePrice: number;
  distancePrice: number;
  rideTypeMultiplier: number;
  specialRequestsFee: number;
  taxesAndFees: number;
  gratuity: number;
  totalPrice: number;
  currency: string;
  breakdown: {
    [key: string]: number;
  };
}

// Hero section configuration
export interface HeroConfig {
  title: string;
  subtitle: string;
  backgroundImage: string;
  backgroundVideo?: string;
  defaultPickupLocation: Location;
  popularLocations: PopularLocation[];
  vehicleOptions: VehicleOption[];
  timeOptions: TimeOption[];
  rideTypes: RideType[];
  showPriceEstimate: boolean;
  animationPreference: 'subtle' | 'moderate' | 'elaborate';
}
