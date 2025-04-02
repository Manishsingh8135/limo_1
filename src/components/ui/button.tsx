'use client';

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/30 relative overflow-hidden font-serif tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:bg-primary/95 hover:-translate-y-[2px] active:translate-y-[1px] active:shadow-sm animate-royal-shine",
        destructive:
          "bg-destructive text-destructive-foreground shadow-md hover:shadow-lg hover:bg-destructive/95 hover:-translate-y-[2px] active:translate-y-[1px] active:shadow-sm",
        outline:
          "border-2 border-primary/80 bg-transparent text-primary shadow-sm hover:bg-primary/5 hover-regal-border hover:-translate-y-[2px] active:translate-y-[1px]",
        secondary:
          "border-2 border-primary/80 bg-transparent text-primary shadow-sm hover:bg-primary/5 hover-regal-border hover:-translate-y-[2px] active:translate-y-[1px]",
        ghost:
          "text-foreground hover:bg-accent/20 hover:text-accent-foreground hover:-translate-y-[2px] active:translate-y-[1px]",
        link: 
          "text-primary underline-offset-4 hover:underline",
        glass: 
          "bg-white/10 backdrop-blur-md text-foreground border border-white/20 shadow-md hover:shadow-lg hover:bg-white/15 hover-luxury-float hover:-translate-y-[2px] active:translate-y-[1px] active:shadow-sm",
        metallic: 
          "bg-gradient-to-r from-slate-300/90 via-slate-200 to-slate-300/90 text-slate-800 border border-slate-400/30 shadow-md hover:shadow-lg hover:brightness-105 hover-majestic-pulse hover:-translate-y-[2px] active:translate-y-[1px] active:shadow-sm",
        gold: 
          "bg-gradient-to-r from-amber-400/90 via-yellow-300 to-amber-400/90 text-amber-900 border border-amber-500/30 shadow-md hover:shadow-lg hover:brightness-105 hover-royal-shine hover:-translate-y-[2px] active:translate-y-[1px] active:shadow-sm",
        dark: 
          "bg-slate-900 text-slate-50 shadow-md hover:shadow-lg hover:bg-slate-800 hover:-translate-y-[2px] active:translate-y-[1px] active:shadow-sm animate-royal-shine",
      },
      size: {
        default: "h-11 px-6 py-2 text-sm",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-md px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  animate = true,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    animate?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  // If animation is disabled or it's a link variant, use regular component
  if (!animate || variant === "link" as any) {
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }

  // Use a regular button with classes for subtle animations instead of Framer Motion
  // This avoids TypeScript errors with motion components
  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        "transition-all ease-out active:scale-[0.98]"
      )}
      {...props}
    />
  )
}

// Animation variants for Framer Motion
const buttonAnimationVariants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.3, type: "spring", stiffness: 300 }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

export { Button, buttonVariants }
