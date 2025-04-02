export interface NavLink {
  href: string;
  label: string;
  ariaLabel: string; // For improved accessibility
}

export interface NavLinkWithChildren extends NavLink {
  children: NavLink[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}
