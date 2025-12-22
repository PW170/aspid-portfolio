import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Helper to check if user is admin (for now, we'll just check if they are logged in, 
// but in a real app you'd check roles)
async function checkAuth(ctx: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await ctx.db.get(userId);
  // In a real app: if (user?.role !== "admin") throw new Error("Unauthorized");
  return user;
}

// Projects
export const createProject = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    link: v.optional(v.string()),
    githubLink: v.optional(v.string()),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    await checkAuth(ctx);
    await ctx.db.insert("projects", args);
  },
});

export const updateProject = mutation({
  args: {
    id: v.id("projects"),
    title: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    link: v.optional(v.string()),
    githubLink: v.optional(v.string()),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    await checkAuth(ctx);
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await checkAuth(ctx);
    await ctx.db.delete(args.id);
  },
});

// Skills
export const createSkill = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    level: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await checkAuth(ctx);
    await ctx.db.insert("skills", args);
  },
});

export const deleteSkill = mutation({
  args: { id: v.id("skills") },
  handler: async (ctx, args) => {
    await checkAuth(ctx);
    await ctx.db.delete(args.id);
  },
});

// Experiences
export const createExperience = mutation({
  args: {
    title: v.string(),
    company: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    description: v.string(),
    current: v.boolean(),
  },
  handler: async (ctx, args) => {
    await checkAuth(ctx);
    await ctx.db.insert("experiences", args);
  },
});

export const deleteExperience = mutation({
  args: { id: v.id("experiences") },
  handler: async (ctx, args) => {
    await checkAuth(ctx);
    await ctx.db.delete(args.id);
  },
});

// Messages
export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    await checkAuth(ctx);
    return await ctx.db.query("messages").order("desc").collect();
  },
});

export const markMessageRead = mutation({
  args: { id: v.id("messages"), read: v.boolean() },
  handler: async (ctx, args) => {
    await checkAuth(ctx);
    await ctx.db.patch(args.id, { read: args.read });
  },
});
