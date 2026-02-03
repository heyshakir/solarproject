"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

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
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const image = formData.get("image") as string;
    const categoryId = formData.get("categoryId") as string;
    const published = formData.get("published") === "true";

    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    try {
        await prisma.post.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                image,
                published,
                categoryId: categoryId || null,
            },
        });
    } catch (error) {
        console.error("Failed to create post:", error);
        return { error: "Failed to create post." };
    }

    redirect("/admin/blogs");
}
