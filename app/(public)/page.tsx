import Hero from "@/components/features/home/Hero";
import { FeaturedBlogs } from "@/components/features/home/FeaturedBlogs";
import { Categories } from "@/components/features/home/Categories";
import { Newsletter } from "@/components/features/home/Newsletter";
import type { Post } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const featuredPosts: Post[] = await prisma.post.findMany({
    where: { published: true, featured: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  }).catch((error) => {
    console.error("Failed to fetch featured posts:", error);
    return [];
  });

  const latestPost = await prisma.post.findFirst({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: { slug: true }
  });

  return (
    <>
      <Hero latestPostSlug={latestPost?.slug} />
      <FeaturedBlogs posts={featuredPosts} />
      <Categories />
      <Newsletter />
    </>
  );
}
