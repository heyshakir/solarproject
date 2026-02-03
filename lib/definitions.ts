import { z } from 'zod';

export const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
    password: z.string().min(1, { message: 'Password field must not be empty.' }),
});

export const SignupFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).optional(),
    email: z.string().email({ message: 'Please enter a valid email.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export const CategoryFormSchema = z.object({
    name: z.string()
        .min(2, { message: 'Name must be at least 2 characters.' })
        .max(50, { message: 'Name cannot exceed 50 characters.' }),
    description: z.string()
        .max(500, { message: 'Description cannot exceed 500 characters.' })
        .optional(),
});

export const PostFormSchema = z.object({
    title: z.string()
        .min(3, { message: 'Title must be at least 3 characters.' })
        .max(100, { message: 'Title cannot exceed 100 characters.' }),
    content: z.string()
        .min(10, { message: 'Content must be at least 10 characters.' }),
    excerpt: z.string()
        .max(300, { message: 'Excerpt cannot exceed 300 characters.' })
        .optional(),
    image: z.string().url({ message: 'Invalid image URL.' }).optional().or(z.literal('')),
    categoryId: z.string().optional(),
    published: z.boolean().optional(),
    featured: z.boolean().optional(),
});

export type PostFormValues = z.infer<typeof PostFormSchema>;
export type CategoryFormValues = z.infer<typeof CategoryFormSchema>;
