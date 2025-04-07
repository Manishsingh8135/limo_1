import { Location, VehicleOption } from '../types/hero.types';

export type BookingStep = 
  | 'initial'         // Starting state
  | 'selectPickup'    // User selecting pickup location
  | 'selectDropoff'   // User selecting dropoff location
  | 'selectVehicle'   // User choosing vehicle 
  | 'selectDateTime'  // User picking date/time
  | 'quickBook'       // Final booking confirmation
  | 'success';        // Booking completed

export interface BookingState {
  step: BookingStep;
  pickupLocation: Location | null;
  dropoffLocation: Location | null;
  vehicle: VehicleOption;
  date: Date;
  time: string;
  passengers: number;
  luggage: number;
  specialRequests: string;
}

export type JourneyVisualizerProps = {
  bookingState: BookingState;
  goToStep: (step: BookingStep, data?: Partial<BookingState>) => void;
  showHint: boolean;
}

export type VehicleShowcaseProps = {
  bookingState: BookingState;
  goToStep: (step: BookingStep, data?: Partial<BookingState>) => void;
  vehicles: VehicleOption[];
}

export type QuickBookPanelProps = {
  bookingState: BookingState;
  goToStep: (step: BookingStep, data?: Partial<BookingState>) => void;
}

export type LocationSearchProps = {
  type: 'pickup' | 'dropoff';
  currentLocation: Location | null;
  onSelect: (location: Location) => void;
  popularLocations: Location[];
}

export type PulsatingDotProps = {
  delay?: number;
  size?: 'sm' | 'default' | 'lg';
}

export type JourneyMapProps = {
  pickupLocation: Location | null;
  dropoffLocation: Location | null;
  isInteractive?: boolean;
  onPickupClick?: () => void;
  onDropoffClick?: () => void;
}
