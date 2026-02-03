"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CategoryFormSchema, PostFormSchema } from "./definitions";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", {
            ...Object.fromEntries(formData),
            redirect: false,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return "Invalid credentials.";
        }
        throw error;
    }

    redirect("/admin/dashboard");
}

export async function createPost(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    // Convert checkbox values to boolean
    const dataToValidate = {
        ...rawData,
        published: rawData.published === 'on' || rawData.published === 'true',
        featured: rawData.featured === 'on' || rawData.featured === 'true',
    };

    const validatedFields = PostFormSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields",
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    const { title, content, excerpt, image, categoryId, published, featured } = validatedFields.data;

    let slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    // Ensure uniqueness by checking DB
    let uniqueSlug = slug;
    let counter = 1;
    while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
    }
    slug = uniqueSlug;

    try {
        await prisma.post.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                image,
                published: published || false,
                featured: featured || false,
                categoryId: categoryId || null,
            },
        });
    } catch (error) {
        console.error("Failed to create post:", error);
        return { error: "Failed to create post. Slug might be non-unique." };
    }

    revalidatePath("/admin/blogs");
    redirect("/admin/blogs");
}

export async function updatePost(id: string, prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const dataToValidate = {
        ...rawData,
        published: rawData.published === 'on' || rawData.published === 'true',
        featured: rawData.featured === 'on' || rawData.featured === 'true',
    };

    const validatedFields = PostFormSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields",
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    const { title, content, excerpt, image, categoryId, published, featured } = validatedFields.data;

    try {
        await prisma.post.update({
            where: { id },
            data: {
                title,
                content,
                excerpt,
                image,
                published: published || false,
                featured: featured || false,
                categoryId: categoryId || null,
            },
        });
    } catch (error) {
        console.error("Failed to update post:", error);
        return { error: "Failed to update post." };
    }

    revalidatePath("/admin/blogs");
    redirect("/admin/blogs");
}

export async function deletePost(id: string) {
    try {
        await prisma.post.delete({
            where: { id },
        });
    } catch (error) {
        console.error("Failed to delete post:", error);
        return { error: "Failed to delete post." };
    }

    revalidatePath("/admin/blogs");
}

/* 
  CATEGORY ACTIONS 
*/

export async function createCategory(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = CategoryFormSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields",
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    const { name, description } = validatedFields.data;

    try {
        await prisma.category.create({
            data: { name, description },
        });
    } catch (error) {
        console.error("Failed to create category:", error);
        return { error: "Failed to create category. Name might be non-unique." };
    }

    revalidatePath("/admin/categories");
    redirect("/admin/categories");
}

export async function updateCategory(id: string, prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = CategoryFormSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields",
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    const { name, description } = validatedFields.data;

    try {
        await prisma.category.update({
            where: { id },
            data: { name, description },
        });
    } catch (error) {
        console.error("Failed to update category:", error);
        return { error: "Failed to update category." };
    }

    revalidatePath("/admin/categories");
    redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
    try {
        await prisma.category.delete({
            where: { id },
        });
    } catch (error) {
        console.error("Failed to delete category:", error);
        return { error: "Failed to delete category. It might contain posts." };
    }

    revalidatePath("/admin/categories");
}
