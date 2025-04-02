'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Use useSearchParams to get potential error callbacks
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { signIn } from "next-auth/react"; // Import signIn from next-auth/react for client-side

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define the Zod schema for login validation
const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }), // Basic check, NextAuth handles complexity
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/'; // Default redirect after login
  // Get error from URL params (NextAuth might redirect with an error query)
  const initialError = searchParams.get('error') ? "Invalid credentials. Please try again." : null;

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(initialError);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Add success state

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setServerError(null); // Clear previous errors
    setSuccessMessage(null); // Clear previous success message

    try {
      // Use NextAuth's signIn function for credentials provider
      const result = await signIn("credentials", {
        redirect: false, // Handle redirect manually or based on callbackUrl
        email: data.email,
        password: data.password,
        // callbackUrl: callbackUrl // Specify where to redirect on success - handled automatically if not redirect: false
      });

      if (result?.error) {
        // Handle sign-in errors (e.g., invalid credentials)
        console.error("Sign-in error:", result.error);
        // Set a user-friendly error message based on result.error if needed
        setServerError("Invalid email or password. Please try again.");
        setIsLoading(false);
      } else if (result?.ok && !result?.error) {
        // Sign-in was successful
        setSuccessMessage("Login successful! Redirecting..."); // Set success message
        console.log("Sign-in successful, redirecting...");
        // Redirect to the intended page or dashboard
        // Optional: add a small delay if you want the message to be visible briefly
        // setTimeout(() => router.push(callbackUrl), 1000);
        router.push(callbackUrl); // Use the callbackUrl from searchParams or default '/'
        // No need to setIsLoading(false) here as the page will navigate away
      } else {
        // Handle unexpected states
         setServerError("An unexpected error occurred during login.");
         setIsLoading(false);
      }

    } catch (error) {
      // Catch network errors or other issues during the signIn call
      console.error("Login submission error:", error);
      setServerError("Could not connect to the authentication service. Please try again later.");
      setIsLoading(false);
    }
    // Note: setIsLoading(false) is called within error/unexpected handlers
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg rounded-2xl">
        <CardHeader className="p-6 md:p-8 text-center">
          <CardTitle className="text-3xl font-serif tracking-tight">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground pt-1">
            Sign in to access your Elysian Rides profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 pt-0">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Server Error Display */}
              {serverError && (
                 <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-center text-sm text-destructive"
                 >
                   {serverError}
                 </motion.div>
              )}
              {/* Success Message Display */}
              {successMessage && (
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center text-sm text-green-600"
                 >
                   {successMessage}
                 </motion.div>
              )}

              {/* Form Fields */}
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 rounded-lg px-4 border-input/50 focus:border-primary"
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Password</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 rounded-lg px-4 border-input/50 focus:border-primary"
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    {/* Optional: Add a "Forgot Password?" link here */}
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button
                 type="submit"
                 disabled={isLoading}
                 className="w-full h-12 rounded-lg text-base font-medium transition-all duration-300 ease-out hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                 size="lg"
               >
                 {isLoading ? (
                   <span className="flex items-center justify-center">
                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Signing In...
                   </span>
                 ) : (
                   'Sign In'
                 )}
               </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="p-6 md:p-8 pt-0 flex justify-center">
           <p className="text-sm text-muted-foreground">
             Don&apos;t have an account?{' '}
             <Link href="/register" className="font-medium text-primary hover:underline underline-offset-4">
               Create one
             </Link>
           </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
