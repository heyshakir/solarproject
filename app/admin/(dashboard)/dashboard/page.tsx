import { prisma } from "@/lib/prisma";
import DashboardView from "./DashboardView";

export default async function DashboardPage() {
    // 1. Fetch Total Blogs
    const totalBlogs = await prisma.post.count();

    // 2. Fetch Total Views
    const viewsAggregate = await prisma.post.aggregate({
        _sum: {
            views: true,
        },
    });
    const totalViews = viewsAggregate._sum.views || 0;

    // 3. Calculate Avg Read Time logic
    // We need to fetch content to estimate read time. 
    // For performance on large DB, we might want to store read time on the post model.
    // For now, fetching content length is acceptable for MVP.
    const allPosts = await prisma.post.findMany({
        select: { content: true },
        where: { published: true }
    });

    let totalReadTimeSeconds = 0;
    const wpm = 200;

    allPosts.forEach(post => {
        const words = post.content.trim().split(/\s+/).length;
        const readTimeMinutes = words / wpm;
        totalReadTimeSeconds += readTimeMinutes * 60;
    });

    const avgReadTimeSeconds = allPosts.length > 0 ? totalReadTimeSeconds / allPosts.length : 0;
    const avgMinutes = Math.floor(avgReadTimeSeconds / 60);
    const avgSeconds = Math.round(avgReadTimeSeconds % 60);

    const avgReadTime = `${avgMinutes}m ${avgSeconds}s`;

    const metrics = {
        totalBlogs,
        totalViews,
        subscribers: 0, // Placeholder
        avgReadTime,
    };

    return <DashboardView metrics={metrics} />;
}
