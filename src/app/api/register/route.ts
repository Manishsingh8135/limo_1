import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { prisma } from '@/lib/prisma'; // Adjust path if needed

// Define the expected shape of the request body using Zod
const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).optional(), // Optional name
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body against the schema
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
      console.error("Registration validation failed:", validation.error.errors);
      // Return a 400 Bad Request response with validation errors
      return NextResponse.json(
        { 
          message: "Invalid input", 
          errors: validation.error.flatten().fieldErrors 
        }, 
        { status: 400 }
      );
    }

    const { email, password, name } = validation.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      console.warn(`Registration attempt for existing email: ${email}`);
      return NextResponse.json(
        { message: "User with this email already exists" }, 
        { status: 409 } // 409 Conflict
      );
    }

    // Hash the password
    const saltRounds = 10; // Or use a value from env variables
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name, // Include name if provided
        // Role defaults to USER as per schema
      },
    });

    console.log(`User registered successfully: ${email}`);

    // Return a success response (don't send back the password hash)
    // Optionally return basic user info (like id, email, name, role)
    return NextResponse.json(
      { 
        message: "User registered successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        }
      }, 
      { status: 201 } // 201 Created
    );

  } catch (error) {
    console.error("Registration Error:", error);
    // Handle potential JSON parsing errors or other unexpected errors
    if (error instanceof SyntaxError) {
        return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
    }
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}
