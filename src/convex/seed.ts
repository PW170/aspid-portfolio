import { mutation } from "./_generated/server";

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data exists
    const existingProjects = await ctx.db.query("projects").first();
    if (existingProjects) return;

    // Seed Projects
    await ctx.db.insert("projects", {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management and secure payments.",
      tags: ["React", "Node.js", "Stripe", "MongoDB"],
      featured: true,
      link: "https://example.com",
      githubLink: "https://github.com",
      imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    });

    await ctx.db.insert("projects", {
      title: "AI Task Manager",
      description: "Smart task management app that uses AI to prioritize and categorize your daily workflow.",
      tags: ["Next.js", "OpenAI", "Tailwind"],
      featured: true,
      link: "https://example.com",
      githubLink: "https://github.com",
      imageUrl: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
    });

    await ctx.db.insert("projects", {
      title: "Social Dashboard",
      description: "Analytics dashboard for social media management with real-time data visualization.",
      tags: ["Vue", "D3.js", "Firebase"],
      featured: false,
      link: "https://example.com",
      githubLink: "https://github.com",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    });

    // Seed Skills
    const skills = [
      { name: "React", category: "Frontend", level: 95 },
      { name: "TypeScript", category: "Frontend", level: 90 },
      { name: "Tailwind CSS", category: "Frontend", level: 95 },
      { name: "Node.js", category: "Backend", level: 85 },
      { name: "Python", category: "Backend", level: 80 },
      { name: "PostgreSQL", category: "Backend", level: 75 },
      { name: "Figma", category: "Design", level: 85 },
      { name: "Git", category: "Tools", level: 90 },
    ];

    for (const skill of skills) {
      await ctx.db.insert("skills", skill);
    }

    // Seed Experience
    await ctx.db.insert("experiences", {
      title: "Senior Frontend Engineer",
      company: "Tech Corp",
      startDate: "2022-01",
      current: true,
      description: "Leading the frontend team in building scalable web applications using React and TypeScript.",
    });

    await ctx.db.insert("experiences", {
      title: "Full Stack Developer",
      company: "StartUp Inc",
      startDate: "2020-03",
      endDate: "2021-12",
      current: false,
      description: "Developed and maintained multiple client projects using the MERN stack.",
    });
  },
});
