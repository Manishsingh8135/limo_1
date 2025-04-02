import { LoginForm } from '@/components/auth/LoginForm'; // Adjust path if needed
import { Metadata } from 'next';
import { Suspense } from 'react'; // Import Suspense

export const metadata: Metadata = {
  title: 'Sign In - Elysian Rides',
  description: 'Sign in to your Elysian Rides account to manage your luxury bookings.',
  // Add other relevant SEO meta tags here if needed
};

// Helper component to ensure searchParams are read within Suspense boundary
function LoginPageContent() {
  return <LoginForm />;
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      {/* Wrap LoginForm in Suspense because it uses useSearchParams */}
      <Suspense fallback={<div>Loading...</div>}> 
        <LoginPageContent />
      </Suspense>
    </main>
  );
}
