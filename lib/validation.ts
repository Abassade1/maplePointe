import { z } from "zod";

/* ------------------------------- primitives ------------------------------ */

const email = z.string().trim().toLowerCase().email("Must be a valid email address");

const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(200, "Password must be at most 200 characters");

const provinceCode = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]{2}$/, "Province code must be two letters, e.g. ON");

/* --------------------------------- auth ---------------------------------- */

export const signupSchema = z.object({
  email,
  password,
  company: z.object({
    name: z.string().trim().min(1, "Company name is required").max(200),
    industry: z.string().trim().min(1, "Industry is required").max(120),
    homeCountry: z.string().trim().min(1, "Home country is required").max(120),
    companySize: z.string().trim().min(1, "Company size is required").max(60),
  }),
});

export const loginSchema = z.object({ email, password: z.string().min(1, "Password is required") });

/* -------------------------------- company -------------------------------- */

export const updateCompanySchema = z
  .object({
    name: z.string().trim().min(1).max(200).optional(),
    industry: z.string().trim().min(1).max(120).optional(),
    homeCountry: z.string().trim().min(1).max(120).optional(),
    companySize: z.string().trim().min(1).max(60).optional(),
    productDescription: z.string().trim().max(5000).optional(),
    productCategory: z.string().trim().max(120).optional(),
    targetProvinces: z.array(provinceCode).max(13).optional(),
    goals: z.array(z.string().trim().min(1).max(120)).max(20).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update",
  });

/* ------------------------------- checklist ------------------------------- */

export const toggleChecklistSchema = z.object({
  // Omit to flip the current value; pass a boolean to set it explicitly.
  completed: z.boolean().optional(),
});

/* -------------------------------- partners ------------------------------- */

export const partnerQuerySchema = z.object({
  province: provinceCode.optional(),
  type: z
    .enum(["distributor", "legal_advisor", "logistics", "local_agent"])
    .optional(),
});

/* ------------------------------- assistant ------------------------------- */

export const assistantSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(4000, "Message must be at most 4000 characters"),
});

/* -------------------------------- helpers -------------------------------- */

export type FieldErrors = Record<string, string>;

/** Flattens a ZodError into the { field: message } shape the API returns. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const fields: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_";
    if (!fields[key]) fields[key] = issue.message;
  }
  return fields;
}
