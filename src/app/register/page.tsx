import { RegisterForm } from '@/components/auth/RegisterForm'; // Adjust path if needed
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register - Elysian Rides',
  description: 'Create your Elysian Rides account for luxury travel bookings.',
  // Add other relevant SEO meta tags here if needed
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      {/* You might want a background element or further layout adjustments here */}
      <RegisterForm />
    </main>
  );
}
