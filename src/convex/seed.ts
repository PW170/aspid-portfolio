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
      title: "Coursa",
      description: "An AI powered course generator",
      tags: ["AI", "Generative"],
      status: "Unfinished / Abandonded",
      featured: true,
      link: "https://coursa-app.netlify.app/",
      githubLink: "#",
      imageUrl: "https://iili.io/fVc9VLB.png",
    });

    await ctx.db.insert("projects", {
      title: "Qodex",
      description: "Built with AI",
      tags: ["AI", "Generative"],
      status: "Finished",
      featured: true,
      link: "https://qodex.vly.site/",
      githubLink: "#",
      imageUrl: "https://iili.io/fVc1lix.md.png",
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

    // Clear existing experiences
    const experiences = await ctx.db.query("experiences").collect();
    for (const exp of experiences) {
      await ctx.db.delete(exp._id);
    }
  },
});
