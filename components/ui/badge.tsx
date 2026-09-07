import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-navy-600 text-white",
        secondary: "border-transparent bg-slate-100 text-slate-700",
        outline: "border-slate-300 text-slate-700",
        required: "border-amber-200 bg-amber-50 text-amber-800",
        recommended: "border-teal-200 bg-teal-50 text-teal-700",
        notApplicable: "border-slate-200 bg-slate-50 text-slate-500",
        success: "border-teal-200 bg-teal-50 text-teal-700",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
