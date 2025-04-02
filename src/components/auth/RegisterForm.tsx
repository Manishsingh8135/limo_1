'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Step 1: Define the Zod schema for client-side validation
const registerFormSchema = z.object({
  name: z.string().optional(), // Optional name
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Set the error path to confirmPassword field
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // State to track client-side mount
  const router = useRouter(); // For potential redirect on success

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, control } = form;

  useEffect(() => {
    setIsClient(true); // Set to true once component mounts on client
  }, []);

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setServerError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Exclude confirmPassword before sending to API
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle errors (validation, conflict, server)
        const message = result.message || "An error occurred during registration.";
        // Specific handling for validation errors if needed
        if (response.status === 400 && result.errors) {
           // Potentially map specific Zod errors from API back to form fields if desired
           // For now, just show the general message
           setServerError(message + " Please check your input.");
        } else {
             setServerError(message);
        }
      } else {
        // Handle success
        setSuccessMessage("Registration successful! Redirecting...");
        // Optionally reset form
        form.reset();
        // Redirect to login or dashboard after a short delay
        setTimeout(() => {
           router.push('/login'); // Redirect to login page
        }, 2000);
      }
    } catch (error) {
      console.error("Registration fetch error:", error);
      setServerError("Could not connect to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isClient && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md mx-auto" // Center the form
    >
      <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg rounded-2xl">
        <CardHeader className="p-6 md:p-8 text-center">
          <CardTitle className="text-3xl font-serif tracking-tight">Create Account</CardTitle>
          <CardDescription className="text-muted-foreground pt-1">
            Join Elysian Rides for seamless luxury travel.
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Name (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 rounded-lg px-4 border-input/50 focus:border-primary"
                        placeholder="e.g., Jane Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 rounded-lg px-4 border-input/50 focus:border-primary"
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button
                 type="submit"
                 disabled={isLoading || !!successMessage} // Disable if loading or success
                 className="w-full h-12 rounded-lg text-base font-medium transition-all duration-300 ease-out hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                 size="lg"
               >
                 {isLoading ? (
                    // Simple loading indicator
                   <span className="flex items-center justify-center">
                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Registering...
                   </span>
                 ) : (
                   'Create Account'
                 )}
               </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="p-6 md:p-8 pt-0 flex justify-center">
           <p className="text-sm text-muted-foreground">
             Already have an account?{' '}
             <Link href="/login" className="font-medium text-primary hover:underline underline-offset-4">
               Sign In
             </Link>
           </p>
        </CardFooter>
      </Card>
    </motion.div>
    )
  );
}
