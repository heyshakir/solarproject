import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const admin = await prisma.user.upsert({
            where: { email: 'admin@solarflow.com' },
            update: {},
            create: {
                email: 'admin@solarflow.com',
                name: 'Admin',
                password: 'password123',
            },
        });

        const categories = [
            { name: 'Technology', id: 'tech' },
            { name: 'Design', id: 'design' },
            { name: 'Business', id: 'business' },
            { name: 'Lifestyle', id: 'lifestyle' },
        ];

        for (const cat of categories) {
            await prisma.category.upsert({
                where: { name: cat.name },
                update: {},
                create: { name: cat.name, id: cat.id },
            });
        }

        // Solar Industry Blogs (Requested)
        const solarBlogs = [
            {
                title: "Solar Energy Industries Association",
                slug: "solar-energy-industries-association",
                category: "business",
                excerpt: "SEIA is the leading national trade association for the U.S. solar energy industry, driving policy and market growth since 1974.",
                image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1000",
                content: `
# Solar Energy Industries Association (SEIA)

The Solar Energy Industries Association (SEIA) is the leading national trade association for the U.S. solar energy industry. Founded in 1974, SEIA represents the interests of more than 1,000 member companies involved in solar manufacturing, installation, financing, and related services. It plays a central role in shaping solar policy, advocacy, and market growth across the United States.

## Key Facts
- **Founded:** 1974
- **Headquarters:** Washington, D.C., United States
- **Focus:** Solar energy advocacy, policy, and market development
- **Members:** Over 1,000 companies across the solar value chain
- **President and CEO:** Abigail Ross Hopper (as of 2024)

## Mission and Role
SEIA’s mission is to build a strong solar industry that powers America through advocacy, education, and innovation. It represents both large corporations and small installers, aiming to expand solar energy adoption and create fair market conditions. The association works closely with policymakers, regulators, and other stakeholders to promote clean energy growth and reduce carbon emissions.

## Policy and Advocacy
SEIA is a major voice for solar policy at the federal and state levels. It has been instrumental in promoting initiatives such as the Inflation Reduction Act, tax credits for renewable energy, and solar-friendly trade policies. The organization also supports efforts to modernize the electric grid, protect net metering policies, and encourage workforce development in the clean energy sector.

## Programs and Initiatives
SEIA leads numerous programs aimed at sustainability and inclusion, such as the Solar+ Decade campaign, which envisions solar powering 30% of U.S. electricity by 2030. It also emphasizes diversity, equity, and inclusion within the solar workforce, and promotes best practices for environmental stewardship across the industry.

## Industry Impact
Through research, data sharing, and industry collaboration, SEIA has helped make solar one of the fastest-growing energy sources in the United States. Its advocacy and market initiatives have contributed to record solar capacity installations, job creation, and declining solar costs nationwide.`
            },
            {
                title: "PV Magazine",
                slug: "pv-magazine",
                category: "tech",
                excerpt: "A global media platform focused on the photovoltaic (PV) and broader solar energy industries, providing news, analysis, and market insights.",
                image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000",
                content: `
# PV Magazine

PV Magazine is a global media platform focused on the photovoltaic (PV) and broader solar energy industries. It provides industry news, analysis, and market insights for professionals across the solar value chain, including manufacturers, project developers, investors, and policymakers. Its coverage emphasizes technological innovation, market trends, and renewable energy policy developments worldwide.

## Key Facts
- **Founded:** 2008
- **Headquarters:** Berlin, Germany
- **Focus:** Solar photovoltaics and renewable energy sector
- **Languages:** English, German, Spanish, Chinese
- **Publications:** PV Magazine Global, PV Magazine Deutschland, PV Magazine USA, PV Magazine España

## Content and Coverage
PV Magazine delivers daily online reporting, monthly print editions, and specialized newsletters. Its content spans solar technology advancements, energy storage, grid integration, and sustainable finance. Regular features include in-depth analyses of market data, opinion pieces from industry experts, and coverage of international solar trade fairs and research breakthroughs.

## Audience and Reach
The publication targets professionals in renewable energy, offering decision-making insights for stakeholders from manufacturers to financiers. It has developed a strong digital presence with regional editions addressing specific market contexts—such as the U.S., Europe, Latin America, and Asia-Pacific—while maintaining a unified editorial standard.

## Role in the Solar Industry
PV Magazine serves as a key information source and discussion forum for the rapidly evolving solar sector. It contributes to industry transparency by highlighting regulatory changes, project milestones, and technological progress. The platform also hosts conferences and roundtables, fostering dialogue on solar innovation, energy transition strategies, and sustainability practices.`
            },
            {
                title: "CleanTechnica",
                slug: "cleantechnica",
                category: "tech",
                excerpt: "A leading independent source for news and commentary on the global transition to renewable energy and decarbonization, with a focus on EVs and solar.",
                image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000",
                content: `
# CleanTechnica

CleanTechnica is an online media organization focused on reporting and analysis about clean energy, electric vehicles, and sustainable technology. It has become a leading independent source for news and commentary on the global transition to renewable energy and decarbonization.

## Key Facts
- **Founded:** 2008
- **Founder:** Scott Cooney
- **Editor-in-Chief:** Zachary Shahan
- **Headquarters:** Florida, United States
- **Primary Focus:** Renewable energy, electric mobility, cleantech innovation

## Focus and Coverage
CleanTechnica covers developments in solar and wind power, energy storage, policy, and corporate sustainability. It is best known for in-depth reporting on electric vehicles—particularly brands such as Tesla, Inc.—and analysis of industry trends influencing climate-friendly technologies.

## Editorial Approach
The site combines original journalism, expert analysis, and opinion pieces from industry contributors. It emphasizes accessible explanations of technical advances and data-driven evaluations of emerging clean technologies. Coverage often links clean-energy adoption to policy changes and market economics.

## Audience and Influence
CleanTechnica serves a global readership that includes policymakers, investors, engineers, and environmentally conscious consumers. Its reports and data visualizations are frequently cited by mainstream outlets and used to track renewable-energy cost trends and EV market growth.

## Operations and Outreach
Besides daily news posts, CleanTechnica hosts webinars, podcasts, and interviews with clean-tech leaders. It also produces research reports and market analyses, positioning itself as both a news source and a thought leader in sustainable innovation.`
            }
        ];

        for (const post of solarBlogs) {
            await prisma.post.upsert({
                where: { slug: post.slug },
                update: {
                    content: post.content,
                    excerpt: post.excerpt,
                    image: post.image,
                    categoryId: post.category
                },
                create: {
                    title: post.title,
                    slug: post.slug,
                    content: post.content,
                    excerpt: post.excerpt,
                    image: post.image,
                    published: true,
                    featured: true,
                    categoryId: post.category
                }
            });
        }

        return NextResponse.json({ success: true, admin });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
