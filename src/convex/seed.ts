import { mutation } from "./_generated/server";

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing projects
    const projects = await ctx.db.query("projects").collect();
    for (const project of projects) {
      await ctx.db.delete(project._id);
    }

    // Seed Projects
    await ctx.db.insert("projects", {
      title: "Myer's Engine",
      description: "All-In-One website generator. A Premium SaaS solution for building websites instantly.",
      tags: ["SaaS", "Premium", "In Development"],
      featured: true,
      link: "#",
      githubLink: "#",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    });

    await ctx.db.insert("projects", {
      title: "Coursa",
      description: "AI-powered Course generator. Create comprehensive courses in minutes.",
      tags: ["SaaS", "Education", "Demo"],
      featured: true,
      link: "#",
      githubLink: "#",
      imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    });

    await ctx.db.insert("projects", {
      title: "Mini store",
      description: "Drop shipping store specializing in mini phones and accessories.",
      tags: ["E-commerce", "Dropshipping", "Demo"],
      featured: true,
      link: "#",
      githubLink: "#",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&q=80",
    });

    // Check if skills exist
    const existingSkills = await ctx.db.query("skills").first();
    if (!existingSkills) {
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
    }

    // Check if experiences exist
    const existingExperiences = await ctx.db.query("experiences").first();
    if (!existingExperiences) {
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
    }
  },
});