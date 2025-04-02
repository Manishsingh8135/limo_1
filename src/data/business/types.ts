/**
 * Types for business data
 * These types define the structure of the business information data
 */

// Contact information
export interface ContactInfo {
  phone: {
    main: string;
    tollFree?: string;
  };
  email: {
    reservations: string;
    info?: string;
    support?: string;
  };
  address: {
    street: string;
    suite?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
}

// Service area
export interface ServiceArea {
  primary: string;
  airports: Array<{
    name: string;
    code: string;
    description?: string;
  }>;
  regions: string[];
}

// Vehicle type
export interface Vehicle {
  type: string;
  name: string;
  capacity: {
    passengers: number;
    luggage?: number;
  };
  description: string;
  features: string[];
  images: string[];
  useCase: string[];
}

// Service type
export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  features: string[];
  vehicleTypes: string[];
  image?: string;
  callToAction?: string;
}

// Special occasion
export interface SpecialOccasion {
  id: string;
  name: string;
  description: string;
  recommendedVehicles: string[];
  image?: string;
}

// Company information
export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  yearEstablished: number;
  operatingHours: string;
  keySellingPoints: string[];
  brandValues: string[];
}

// Booking information
export interface BookingInfo {
  methods: string[];
  requiredInformation: string[];
  policies: {
    cancellation: string;
    waitingTime: string;
    gratuity: string;
    cleaning: string;
    damage: string;
    childSeat: string;
  };
  paymentMethods: string[];
}

// Complete business data structure
export interface BusinessData {
  company: CompanyInfo;
  contact: ContactInfo;
  serviceArea: ServiceArea;
  services: Service[];
  specialOccasions: SpecialOccasion[];
  fleet: Vehicle[];
  booking: BookingInfo;
  siteStructure: {
    mainNavigation: Array<{
      name: string;
      path: string;
      description?: string;
    }>;
  };
}
