import Hero from "@/components/features/home/Hero";
import { FeaturedBlogs } from "@/components/features/home/FeaturedBlogs";
import { Categories } from "@/components/features/home/Categories";
import { Newsletter } from "@/components/features/home/Newsletter";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  let featuredPosts = [];
  try {
    featuredPosts = await prisma.post.findMany({
      where: { published: true, featured: true },
      include: { category: true },
      take: 3,
    });
  } catch (error) {
    console.error("Failed to fetch featured posts:", error);
  }

  return (
    <>
      <Hero />
      <FeaturedBlogs posts={featuredPosts} />
      <Categories />
      <Newsletter />
    </>
  );
}
