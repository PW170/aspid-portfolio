import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQuery } from "convex/react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Data
  const projects = useQuery(api.portfolio.getProjects);
  const skills = useQuery(api.portfolio.getSkills);
  const experiences = useQuery(api.portfolio.getExperiences);
  const messages = useQuery(api.admin.getMessages);

  // Mutations
  const createProject = useMutation(api.admin.createProject);
  const deleteProject = useMutation(api.admin.deleteProject);
  const createSkill = useMutation(api.admin.createSkill);
  const deleteSkill = useMutation(api.admin.deleteSkill);
  const createExperience = useMutation(api.admin.createExperience);
  const deleteExperience = useMutation(api.admin.deleteExperience);
  const markMessageRead = useMutation(api.admin.markMessageRead);

  // Forms state
  const [projectForm, setProjectForm] = useState({ title: "", description: "", imageUrl: "", tags: "", link: "", githubLink: "", featured: false });
  const [skillForm, setSkillForm] = useState({ name: "", category: "Frontend", level: 50 });
  const [expForm, setExpForm] = useState({ title: "", company: "", startDate: "", endDate: "", description: "", current: false });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  const handleCreateProject = async () => {
    try {
      await createProject({
        ...projectForm,
        tags: projectForm.tags.split(",").map(t => t.trim()),
      });
      toast.success("Project created");
      setProjectForm({ title: "", description: "", imageUrl: "", tags: "", link: "", githubLink: "", featured: false });
    } catch (e) {
      toast.error("Failed to create project");
    }
  };

  const handleCreateSkill = async () => {
    try {
      await createSkill(skillForm);
      toast.success("Skill created");
      setSkillForm({ name: "", category: "Frontend", level: 50 });
    } catch (e) {
      toast.error("Failed to create skill");
    }
  };

  const handleCreateExperience = async () => {
    try {
      await createExperience(expForm);
      toast.success("Experience created");
      setExpForm({ title: "", company: "", startDate: "", endDate: "", description: "", current: false });
    } catch (e) {
      toast.error("Failed to create experience");
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="outline" onClick={() => navigate("/")}>Back to Site</Button>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="glass p-1">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button><Plus className="mr-2 h-4 w-4" /> Add Project</Button>
                </DialogTrigger>
                <DialogContent className="glass-panel">
                  <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                    <DialogDescription>Add a new project to your portfolio.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input value={projectForm.imageUrl} onChange={e => setProjectForm({...projectForm, imageUrl: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Tags (comma separated)</Label>
                      <Input value={projectForm.tags} onChange={e => setProjectForm({...projectForm, tags: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Demo Link</Label>
                        <Input value={projectForm.link} onChange={e => setProjectForm({...projectForm, link: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <Label>GitHub Link</Label>
                        <Input value={projectForm.githubLink} onChange={e => setProjectForm({...projectForm, githubLink: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={projectForm.featured} 
                        onChange={e => setProjectForm({...projectForm, featured: e.target.checked})}
                        className="rounded border-gray-300"
                      />
                      <Label>Featured</Label>
                    </div>
                    <Button onClick={handleCreateProject} className="w-full">Create Project</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects?.map(project => (
                <GlassCard key={project._id} className="relative">
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 z-10 h-8 w-8"
                    onClick={() => deleteProject({ id: project._id })}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button><Plus className="mr-2 h-4 w-4" /> Add Skill</Button>
                </DialogTrigger>
                <DialogContent className="glass-panel">
                  <DialogHeader>
                    <DialogTitle>Add New Skill</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={skillForm.category}
                        onChange={e => setSkillForm({...skillForm, category: e.target.value})}
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Design">Design</option>
                        <option value="Tools">Tools</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Level (0-100)</Label>
                      <Input type="number" value={skillForm.level} onChange={e => setSkillForm({...skillForm, level: parseInt(e.target.value)})} />
                    </div>
                    <Button onClick={handleCreateSkill} className="w-full">Create Skill</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills?.map(skill => (
                <GlassCard key={skill._id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground">{skill.category}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => deleteSkill({ id: skill._id })}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <div className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button><Plus className="mr-2 h-4 w-4" /> Add Experience</Button>
                </DialogTrigger>
                <DialogContent className="glass-panel">
                  <DialogHeader>
                    <DialogTitle>Add Experience</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input value={expForm.title} onChange={e => setExpForm({...expForm, title: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input value={expForm.startDate} onChange={e => setExpForm({...expForm, startDate: e.target.value})} placeholder="YYYY-MM" />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input value={expForm.endDate} onChange={e => setExpForm({...expForm, endDate: e.target.value})} placeholder="YYYY-MM" disabled={expForm.current} />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={expForm.current} 
                        onChange={e => setExpForm({...expForm, current: e.target.checked})}
                        className="rounded border-gray-300"
                      />
                      <Label>Current Position</Label>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={expForm.description} onChange={e => setExpForm({...expForm, description: e.target.value})} />
                    </div>
                    <Button onClick={handleCreateExperience} className="w-full">Add Experience</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {experiences?.map(exp => (
                <GlassCard key={exp._id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{exp.title}</h3>
                    <p className="text-primary">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteExperience({ id: exp._id })}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="space-y-4">
              {messages?.map(msg => (
                <GlassCard key={msg._id} className={`relative ${!msg.read ? 'border-primary/50' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">{msg.name}</h3>
                      <p className="text-sm text-muted-foreground">{msg.email}</p>
                    </div>
                    {!msg.read && (
                      <Button size="sm" variant="outline" onClick={() => markMessageRead({ id: msg._id, read: true })}>
                        Mark Read
                      </Button>
                    )}
                  </div>
                  <p className="mt-2">{msg.message}</p>
                </GlassCard>
              ))}
              {messages?.length === 0 && (
                <div className="text-center text-muted-foreground py-8">No messages yet</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
