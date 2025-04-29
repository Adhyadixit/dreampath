
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Edit } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Using the actual project interface from the Portfolio page
interface Project {
  id: string;
  title: string;
  category: "web" | "mobile" | "desktop";
  image: string;
  link: string;
  description: string;
  technologies: string[];
}

// Sample data from the Portfolio page
const initialProjects: Project[] = [
  {
    id: "petrosia",
    title: "Petrosia - Oil & Gas Solutions",
    category: "web",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=870&auto=format&fit=crop",
    link: "https://petrosia.in",
    description: "A comprehensive digital platform for an oil and gas company, featuring interactive dashboards and real-time data visualization tools for monitoring operations.",
    technologies: ["React", "Node.js", "D3.js", "MongoDB"]
  },
  {
    id: "nerdynuts",
    title: "NerdyNuts - Tech Blog",
    category: "web",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=872&auto=format&fit=crop",
    link: "https://nerdynuts.com",
    description: "A modern tech blog with a custom CMS, advanced search functionality, and optimized reading experience for tech enthusiasts and professionals.",
    technologies: ["WordPress", "PHP", "MySQL", "ElasticSearch"]
  },
  // ... more projects from Portfolio.tsx
];

export const PortfolioManager = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    id: "",
    title: "",
    category: "web",
    image: "",
    link: "",
    description: "",
    technologies: []
  });
  
  // Handle editing a project
  const startEditing = (project: Project) => {
    setEditingProject(project);
    setShowAddForm(false);
  };
  
  // Handle deleting a project
  const deleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== id));
      toast.success('Project deleted successfully');
    }
  };
  
  // Handle saving edited project
  const saveProject = () => {
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
      setEditingProject(null);
      toast.success('Project updated successfully');
    }
  };
  
  // Handle adding a new project
  const addProject = () => {
    const projectId = newProject.title?.toLowerCase().replace(/\s+/g, '-') || `project-${Date.now()}`;
    const techArray = typeof newProject.technologies === 'string' 
      ? (newProject.technologies as string).split(',').map(tech => tech.trim())
      : [];
      
    const projectToAdd: Project = {
      id: projectId,
      title: newProject.title || 'Untitled Project',
      category: (newProject.category as "web" | "mobile" | "desktop") || "web",
      image: newProject.image || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      link: newProject.link || '#',
      description: newProject.description || 'No description provided',
      technologies: techArray.length > 0 ? techArray : ['Not specified']
    };
    
    setProjects([...projects, projectToAdd]);
    setNewProject({
      id: "",
      title: "",
      category: "web",
      image: "",
      link: "",
      description: "",
      technologies: []
    });
    setShowAddForm(false);
    toast.success('Project added successfully');
  };
  
  // Handle technology input for new project
  const handleTechChange = (value: string) => {
    setNewProject({...newProject, technologies: value.split(',').map(tech => tech.trim())});
  };
  
  // Handle technology input for edited project
  const handleEditTechChange = (value: string) => {
    if (editingProject) {
      setEditingProject({
        ...editingProject,
        technologies: value.split(',').map(tech => tech.trim())
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio Projects</h2>
        <Button onClick={() => {
          setShowAddForm(!showAddForm);
          setEditingProject(null);
        }}>
          {showAddForm ? "Cancel" : "Add New Project"}
        </Button>
      </div>
      
      {/* Add New Project Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input 
                  id="title" 
                  value={newProject.title || ''} 
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  placeholder="Enter project title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newProject.category}
                  onValueChange={(value) => setNewProject({...newProject, category: value as "web" | "mobile" | "desktop"})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="desktop">Desktop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  value={newProject.image || ''} 
                  onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                  placeholder="Enter image URL"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="link">Project Link</Label>
                <Input 
                  id="link" 
                  value={newProject.link || ''} 
                  onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                  placeholder="Enter project URL"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={newProject.description || ''} 
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                placeholder="Enter project description"
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma separated)</Label>
              <Input 
                id="technologies" 
                value={Array.isArray(newProject.technologies) ? newProject.technologies.join(', ') : ''} 
                onChange={(e) => handleTechChange(e.target.value)}
                placeholder="React, Node.js, MongoDB, etc."
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={addProject}>Add Project</Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Edit Project Form */}
      {editingProject && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Project Title</Label>
                <Input 
                  id="edit-title" 
                  value={editingProject.title} 
                  onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editingProject.category}
                  onValueChange={(value) => setEditingProject({...editingProject, category: value as "web" | "mobile" | "desktop"})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="desktop">Desktop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input 
                  id="edit-image" 
                  value={editingProject.image} 
                  onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-link">Project Link</Label>
                <Input 
                  id="edit-link" 
                  value={editingProject.link} 
                  onChange={(e) => setEditingProject({...editingProject, link: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea 
                id="edit-description" 
                value={editingProject.description} 
                onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-technologies">Technologies (comma separated)</Label>
              <Input 
                id="edit-technologies" 
                value={editingProject.technologies.join(', ')} 
                onChange={(e) => handleEditTechChange(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setEditingProject(null)}>Cancel</Button>
            <Button onClick={saveProject}>Save Changes</Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Project List */}
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4 md:w-3/4 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{project.category}</p>
                  <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                  <div className="mb-2">
                    <span className="text-sm font-medium">Link: </span>
                    <a href={project.link} className="text-blue-600 hover:underline">{project.link}</a>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => startEditing(project)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => deleteProject(project.id)}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
