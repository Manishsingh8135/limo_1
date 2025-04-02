import { BusinessData } from './types';

/**
 * Primary business data source for Elysian Rides
 * This file serves as the central repository for all business information
 * Edit this file to update content throughout the application
 */
export const businessData: BusinessData = {
  company: {
    name: "Elysian Rides",
    tagline: "Luxury Transportation for Discerning Clients",
    description: "With over 25 years of experience, Elysian Rides has established itself as the premier luxury ground transportation service in Chicago and surrounding areas. We pride ourselves on our commitment to professionalism, reliability, safety, and exceptional customer service.",
    yearEstablished: 1998,
    operatingHours: "24 hours a day, 7 days a week",
    keySellingPoints: [
      "Professional, trained, and background-checked chauffeurs",
      "Large, diverse, and meticulously maintained fleet",
      "24/7 operations and dedicated customer support",
      "Unwavering commitment to punctuality and safety",
      "Advanced technology for reservations and flight tracking",
      "Competitive pricing without compromising on luxury"
    ],
    brandValues: [
      "Elegance",
      "Reliability",
      "Discretion",
      "Professionalism",
      "Safety",
      "Attention to detail"
    ]
  },
  
  contact: {
    phone: {
      main: "(773) 992-0902",
      tollFree: "1-888-707-4401"
    },
    email: {
      reservations: "reservations@elysianrides.com",
      info: "info@elysianrides.com",
      support: "support@elysianrides.com"
    },
    address: {
      street: "70 W Madison St",
      suite: "Suite 1400",
      city: "Chicago",
      state: "IL",
      zip: "60602",
      country: "USA"
    },
    social: {
      facebook: "https://facebook.com/elysianrides",
      instagram: "https://instagram.com/elysianrides",
      twitter: "https://twitter.com/elysianrides",
      linkedin: "https://linkedin.com/company/elysianrides"
    }
  },
  
  serviceArea: {
    primary: "Chicago, Illinois",
    airports: [
      {
        name: "Chicago O'Hare International Airport",
        code: "ORD",
        description: "Full service including arrivals, departures, and meet & greet"
      },
      {
        name: "Chicago Midway International Airport",
        code: "MDW",
        description: "Full service including arrivals, departures, and meet & greet"
      },
      {
        name: "Private Aviation / FBOs",
        code: "PRIVATE",
        description: "Service to all private aviation facilities and FBOs in the region"
      }
    ],
    regions: [
      "Downtown Chicago",
      "North Shore",
      "Western Suburbs",
      "Northern Suburbs",
      "Southern Suburbs",
      "Northwest Indiana",
      "Milwaukee Area"
    ]
  },
  
  services: [
    {
      id: "airport",
      name: "Airport Transportation",
      shortDescription: "Reliable and luxurious airport transfers with flight tracking",
      longDescription: "Our airport transportation service ensures you arrive at your destination on time and in style. We monitor flight status in real-time to adjust for any delays or early arrivals. Our chauffeurs will meet you at baggage claim with a personalized sign, assist with luggage, and ensure a smooth transition to your vehicle.",
      features: [
        "Real-time flight tracking",
        "Meet & greet service available",
        "Assistance with luggage",
        "Complimentary waiting time",
        "Curbside pickup option",
        "Service to all regional airports"
      ],
      vehicleTypes: ["sedan", "suv", "van"],
      image: "/images/services/airport.jpg",
      callToAction: "Book Airport Transfer"
    },
    {
      id: "corporate",
      name: "Corporate Transportation",
      shortDescription: "Executive travel solutions for business professionals",
      longDescription: "Our corporate transportation services cater to the unique needs of business professionals. We understand the importance of reliability, discretion, and professionalism in corporate settings. Whether you're attending meetings, conferences, or corporate events, our chauffeurs ensure you arrive refreshed and ready to conduct business.",
      features: [
        "Executive travel",
        "Corporate meetings and events",
        "Roadshows",
        "Airport transfers for clients/employees",
        "Corporate account management",
        "Billing options for businesses"
      ],
      vehicleTypes: ["sedan", "suv", "van", "sprinter"],
      image: "/images/services/corporate.jpg",
      callToAction: "Schedule Corporate Service"
    },
    {
      id: "wedding",
      name: "Wedding Transportation",
      shortDescription: "Elegant transportation for your special day",
      longDescription: "Your wedding day deserves nothing but the best. Our wedding transportation services ensure you and your guests arrive in style and on time. From the bridal party to family members and guests, we coordinate all transportation needs to make your special day stress-free and memorable.",
      features: [
        "Transportation for bridal party",
        "Guest shuttle services",
        "Red carpet service",
        "Decorated vehicles available",
        "Champagne service available",
        "Coordination with wedding planners"
      ],
      vehicleTypes: ["sedan", "suv", "stretch", "sprinter", "minibus"],
      image: "/images/services/wedding.jpg",
      callToAction: "Plan Wedding Transportation"
    },
    {
      id: "hourly",
      name: "Hourly Charters",
      shortDescription: "Flexible transportation for your schedule",
      longDescription: "Our hourly charter service provides the ultimate flexibility for your transportation needs. With a dedicated chauffeur and vehicle at your disposal for a block of time, you can make multiple stops, change plans on the fly, and enjoy the convenience of having transportation ready when you need it.",
      features: [
        "Flexible scheduling",
        "Multiple stops",
        "Dedicated chauffeur",
        "Customizable itinerary",
        "No hidden fees",
        "Minimum 3-hour booking"
      ],
      vehicleTypes: ["sedan", "suv", "stretch", "sprinter", "minibus", "coach"],
      image: "/images/services/hourly.jpg",
      callToAction: "Book Hourly Service"
    },
    {
      id: "point-to-point",
      name: "Point-to-Point Transfers",
      shortDescription: "Direct transportation between locations",
      longDescription: "Our point-to-point transfer service provides direct transportation between two specified locations. Perfect for business meetings, dinner reservations, or any occasion where you need reliable transportation without the commitment of an hourly service.",
      features: [
        "Direct transportation",
        "Fixed pricing",
        "No hidden fees",
        "Professional chauffeurs",
        "On-time guarantee",
        "Door-to-door service"
      ],
      vehicleTypes: ["sedan", "suv", "van"],
      image: "/images/services/point-to-point.jpg",
      callToAction: "Book Transfer"
    },
    {
      id: "group",
      name: "Group Transportation",
      shortDescription: "Coordinated transportation for groups of all sizes",
      longDescription: "Our group transportation services provide coordinated movement for groups of all sizes. Whether you're planning a corporate event, wedding, tour, or any gathering requiring multiple people to arrive together, our fleet of larger vehicles ensures everyone travels comfortably and arrives on time.",
      features: [
        "Vehicles for groups of all sizes",
        "Coordinated arrivals and departures",
        "Professional group management",
        "Custom itineraries",
        "Event coordination",
        "Multiple pickup locations available"
      ],
      vehicleTypes: ["van", "sprinter", "minibus", "coach"],
      image: "/images/services/group.jpg",
      callToAction: "Plan Group Transportation"
    }
  ],
  
  specialOccasions: [
    {
      id: "prom",
      name: "Proms & Homecomings",
      description: "Safe and stylish transportation for students celebrating their special school events. Our chauffeurs ensure a memorable experience while parents enjoy peace of mind.",
      recommendedVehicles: ["stretch", "suv", "minibus"],
      image: "/images/occasions/prom.jpg"
    },
    {
      id: "anniversary",
      name: "Anniversaries",
      description: "Celebrate your special milestone with elegant transportation. Whether it's a romantic dinner or a weekend getaway, arrive in style and make the occasion even more memorable.",
      recommendedVehicles: ["sedan", "suv", "stretch"],
      image: "/images/occasions/anniversary.jpg"
    },
    {
      id: "birthday",
      name: "Birthdays",
      description: "Make your birthday celebration extraordinary with luxury transportation. From intimate gatherings to large parties, we'll ensure you arrive feeling special.",
      recommendedVehicles: ["sedan", "suv", "stretch", "minibus"],
      image: "/images/occasions/birthday.jpg"
    },
    {
      id: "bachelor",
      name: "Bachelor/Bachelorette Parties",
      description: "Celebrate your last nights of freedom in style and safety. Our chauffeurs ensure your group enjoys the festivities while providing reliable transportation throughout the event.",
      recommendedVehicles: ["stretch", "suv", "minibus"],
      image: "/images/occasions/bachelor.jpg"
    },
    {
      id: "night-out",
      name: "Night Out on the Town",
      description: "Enjoy Chicago's vibrant nightlife without worrying about transportation. Our chauffeurs will be your designated driver, ensuring a safe and luxurious experience.",
      recommendedVehicles: ["sedan", "suv", "stretch"],
      image: "/images/occasions/night-out.jpg"
    },
    {
      id: "concert",
      name: "Concerts & Shows",
      description: "Arrive at concerts and shows in comfort and style. Avoid parking hassles and enjoy door-to-door service for a stress-free entertainment experience.",
      recommendedVehicles: ["sedan", "suv", "van"],
      image: "/images/occasions/concert.jpg"
    },
    {
      id: "sporting",
      name: "Sporting Events",
      description: "Don't miss a minute of the action. Our transportation services to sporting events eliminate parking concerns and allow you to enjoy the game from start to finish.",
      recommendedVehicles: ["sedan", "suv", "van", "minibus"],
      image: "/images/occasions/sporting.jpg"
    },
    {
      id: "dinner",
      name: "Dinner Transfers",
      description: "Make your dining experience even more special with luxury transportation to and from your favorite restaurants. Perfect for special occasions or simply enjoying a night out.",
      recommendedVehicles: ["sedan", "suv"],
      image: "/images/occasions/dinner.jpg"
    }
  ],
  
  fleet: [
    {
      type: "sedan",
      name: "Luxury Sedan",
      capacity: {
        passengers: 3,
        luggage: 3
      },
      description: "Our luxury sedans offer the perfect blend of comfort and sophistication for individual travelers or small groups. Featuring premium leather seating, climate control, and a smooth ride, these vehicles are ideal for business travel, airport transfers, or special occasions.",
      features: [
        "Premium leather seating",
        "Climate control",
        "Complimentary bottled water",
        "Charging ports",
        "Professional chauffeur",
        "Tinted windows for privacy"
      ],
      images: ["/images/fleet/sedan-1.jpg", "/images/fleet/sedan-2.jpg"],
      useCase: ["Airport transfers", "Corporate travel", "Date nights", "Point-to-point transfers"]
    },
    {
      type: "suv",
      name: "Luxury SUV",
      capacity: {
        passengers: 6,
        luggage: 6
      },
      description: "Our luxury SUVs provide ample space for passengers and luggage without compromising on style and comfort. Perfect for small groups, families, or travelers with extra luggage, these vehicles offer a commanding presence on the road and a luxurious interior experience.",
      features: [
        "Spacious leather seating",
        "Tri-zone climate control",
        "Complimentary bottled water",
        "Charging ports",
        "Professional chauffeur",
        "Extra luggage capacity"
      ],
      images: ["/images/fleet/suv-1.jpg", "/images/fleet/suv-2.jpg"],
      useCase: ["Airport transfers", "Family travel", "Small groups", "Corporate teams", "Extra luggage needs"]
    },
    {
      type: "stretch",
      name: "Stretch Limousine",
      capacity: {
        passengers: 10,
        luggage: 4
      },
      description: "Our classic stretch limousines epitomize luxury transportation. With plush seating, ambient lighting, and entertainment systems, these vehicles create a memorable experience for special occasions. Perfect for weddings, proms, or nights out on the town.",
      features: [
        "Extended passenger compartment",
        "Premium leather seating",
        "Ambient lighting",
        "Entertainment system",
        "Privacy partition",
        "Complimentary bottled water and ice"
      ],
      images: ["/images/fleet/stretch-1.jpg", "/images/fleet/stretch-2.jpg"],
      useCase: ["Weddings", "Proms", "Bachelor/Bachelorette parties", "Special celebrations", "Nights out"]
    },
    {
      type: "sprinter",
      name: "Executive Sprinter",
      capacity: {
        passengers: 14,
        luggage: 14
      },
      description: "Our executive sprinter vans combine capacity with luxury. Featuring high ceilings, comfortable seating, and ample luggage space, these vehicles are perfect for group airport transfers, corporate teams, or wine tours. The versatile interior can be configured for various needs.",
      features: [
        "High ceiling for easy movement",
        "Executive seating configuration",
        "Climate control",
        "Entertainment system",
        "Charging ports",
        "Ample luggage space"
      ],
      images: ["/images/fleet/sprinter-1.jpg", "/images/fleet/sprinter-2.jpg"],
      useCase: ["Corporate groups", "Airport transfers", "Wine tours", "Small to medium groups", "Wedding parties"]
    },
    {
      type: "minibus",
      name: "Luxury Minibus",
      capacity: {
        passengers: 24,
        luggage: 20
      },
      description: "Our luxury minibuses provide comfortable transportation for medium-sized groups. With professional-grade seating, climate control, and entertainment options, these vehicles ensure everyone travels together in comfort. Ideal for corporate events, wedding shuttles, or group outings.",
      features: [
        "Professional-grade seating",
        "Climate control",
        "Entertainment system",
        "Onboard restroom (select models)",
        "Luggage storage",
        "Professional chauffeur"
      ],
      images: ["/images/fleet/minibus-1.jpg", "/images/fleet/minibus-2.jpg"],
      useCase: ["Corporate events", "Wedding shuttles", "Group outings", "Airport transfers", "Sightseeing tours"]
    },
    {
      type: "coach",
      name: "Motor Coach",
      capacity: {
        passengers: 56,
        luggage: 56
      },
      description: "Our motor coaches provide the ultimate in group transportation. With spacious seating, onboard restrooms, and entertainment systems, these vehicles are perfect for large groups traveling together. Ideal for corporate events, long-distance charters, or large wedding parties.",
      features: [
        "Reclining seats with footrests",
        "Onboard restroom",
        "Entertainment system",
        "Climate control",
        "Ample luggage storage",
        "Professional chauffeur"
      ],
      images: ["/images/fleet/coach-1.jpg", "/images/fleet/coach-2.jpg"],
      useCase: ["Corporate events", "Long-distance charters", "Large wedding parties", "Group tours", "Sports teams"]
    }
  ],
  
  booking: {
    methods: [
      "Online reservation system",
      "Phone booking",
      "Email booking",
      "Corporate account booking"
    ],
    requiredInformation: [
      "Passenger name and contact information",
      "Date and time of service",
      "Pickup and dropoff addresses",
      "Number of passengers",
      "Amount of luggage",
      "Flight details (if applicable)",
      "Vehicle preference",
      "Special requests"
    ],
    policies: {
      cancellation: "Cancellations made more than 24 hours in advance receive a full refund. Cancellations within 24 hours are subject to a 50% fee. No-shows are charged in full.",
      waitingTime: "We provide 15 minutes of complimentary waiting time for sedan and SUV services, 30 minutes for airport pickups after flight arrival. Additional waiting time is billed at the hourly rate in 15-minute increments.",
      gratuity: "A 20% gratuity is automatically added to all reservations. Additional gratuity is at the client's discretion.",
      cleaning: "A cleaning fee of $250 will be assessed for excessive messes requiring professional cleaning.",
      damage: "Clients are responsible for any damage to the vehicle caused by them or their guests. Repair costs will be billed accordingly.",
      childSeat: "Child seats are available upon request for an additional fee of $25 per seat. Please request at the time of booking."
    },
    paymentMethods: [
      "Credit Card (Visa, MasterCard, American Express, Discover)",
      "Corporate Account",
      "Wire Transfer (for large bookings)",
      "Digital Wallet (Apple Pay, Google Pay)"
    ]
  },
  
  siteStructure: {
    mainNavigation: [
      {
        name: "Home",
        path: "/",
        description: "Welcome to Elysian Rides"
      },
      {
        name: "Services",
        path: "/services",
        description: "Explore our luxury transportation services"
      },
      {
        name: "Fleet",
        path: "/fleet",
        description: "View our diverse fleet of luxury vehicles"
      },
      {
        name: "Special Occasions",
        path: "/occasions",
        description: "Transportation for life's special moments"
      },
      {
        name: "About",
        path: "/about",
        description: "Learn about our company and values"
      },
      {
        name: "Contact",
        path: "/contact",
        description: "Get in touch with our team"
      },
      {
        name: "Book Now",
        path: "/book",
        description: "Make a reservation"
      }
    ]
  }
};

/**
 * Helper functions to access specific data
 */

// Get company information
export const getCompanyInfo = () => businessData.company;

// Get contact information
export const getContactInfo = () => businessData.contact;

// Get service area information
export const getServiceArea = () => businessData.serviceArea;

// Get all services
export const getAllServices = () => businessData.services;

// Get service by ID
export const getServiceById = (id: string) => 
  businessData.services.find(service => service.id === id);

// Get all special occasions
export const getAllSpecialOccasions = () => businessData.specialOccasions;

// Get special occasion by ID
export const getSpecialOccasionById = (id: string) =>
  businessData.specialOccasions.find(occasion => occasion.id === id);

// Get all fleet vehicles
export const getAllVehicles = () => businessData.fleet;

// Get vehicle by type
export const getVehicleByType = (type: string) =>
  businessData.fleet.find(vehicle => vehicle.type === type);

// Get booking information
export const getBookingInfo = () => businessData.booking;

// Get site navigation
export const getSiteNavigation = () => businessData.siteStructure.mainNavigation;

// Default export
export default businessData;
