import { z } from "zod";

export const CreateProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
});

export const CreateReviewSchema = z.object({
  customer_name: z.string().min(1).max(100),
  customer_email: z.string().email().optional(),
  customer_whatsapp: z.string().min(1).max(20).optional(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

export const UpdateProjectSettingsSchema = z.object({
  color: z.string().regex(/^#[0-9a-f]{6}$/i).optional(),
  show_branding: z.boolean().optional(),
  auto_approve_status: z.enum(["pending", "approved"]).optional(),
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;
export type UpdateProjectSettingsInput = z.infer<
  typeof UpdateProjectSettingsSchema
>;
