import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Edit } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { projectsApi } from "@/lib/api";
import type { Project } from "@/lib/types";

export const PortfolioManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // State for a new project form
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    category: "web",
    description: "",
    image: "",
    link: "",
    technologies: []
  });
  
  // Fetch projects from Supabase when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getAll();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again.');
        toast.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  const startEditing = (project: Project) => {
    setEditingProject({...project});
    setShowAddForm(false);
    
    setTimeout(() => {
      document.getElementById('edit-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const deleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsApi.delete(id);
        setProjects(projects.filter(project => project.id !== id));
        toast.success('Project deleted successfully');
      } catch (err) {
        console.error('Error deleting project:', err);
        toast.error('Failed to delete project');
      }
    }
  };
  
  const saveProject = async () => {
    if (editingProject) {
      // Validate required fields
      if (!editingProject.title || !editingProject.image) {
        toast.error('Title and image URL are required');
        return;
      }
      
      try {
        // Update project in Supabase
        const { id, created_at, updated_at, ...projectData } = editingProject;
        
        // Add detailed logging
        console.log('Project ID being updated:', id);
        console.log('Project data being sent:', projectData);
        
        // Make sure project data fields match the database schema
        const updatedProjectData = {
          title: projectData.title,
          category: projectData.category,
          image: projectData.image,
          link: projectData.link,
          description: projectData.description,
          technologies: projectData.technologies,
        };
        
        await projectsApi.update(id, updatedProjectData);
        
        // Update local state
        setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
        setEditingProject(null);
        toast.success('Project updated successfully');
        
        // Scroll back to the project list
        setTimeout(() => {
          document.getElementById('project-list')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } catch (err) {
        console.error('Error updating project:', err);
        // Show more detailed error message
        if (err instanceof Error) {
          toast.error(`Failed to update project: ${err.message}`);
        } else {
          toast.error('Failed to update project: unknown error');
        }
      }
    }
  };
  
  const addProject = async () => {
    try {
      if (!newProject.title || !newProject.image) {
        toast.error('Title and image URL are required');
        return;
      }
      
      const techArray = typeof newProject.technologies === 'string' 
        ? (newProject.technologies as string).split(',').map(tech => tech.trim())
        : (newProject.technologies || []);
      
      const projectToAdd = {
        title: newProject.title,
        category: newProject.category || 'web',
        description: newProject.description || '',
        image: newProject.image,
        link: newProject.link || '',
        technologies: techArray
      };
      
      const addedProject = await projectsApi.create(projectToAdd);
      
      setProjects([...projects, addedProject]);
      setNewProject({
        title: "",
        category: "web",
        description: "",
        image: "",
        link: "",
        technologies: []
      });
      setShowAddForm(false);
      toast.success('Project added successfully');
      
      setTimeout(() => {
        document.getElementById('project-list')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Error adding project:', err);
      toast.error('Failed to add project');
    }
  };
  
  const handleTechChange = (value: string) => {
    setNewProject({...newProject, technologies: value.split(',').map(tech => tech.trim())});
  };
  
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
      
      {loading && (
        <div className="text-center p-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600">Loading projects...</p>
        </div>
      )}
      
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {showAddForm && (
        <Card id="add-form" className="mb-6">
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-title">Project Title</Label>
              <Input 
                id="new-title" 
                value={newProject.title} 
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-category">Category</Label>
              <Select 
                value={newProject.category || 'web'} 
                onValueChange={(value) => setNewProject({...newProject, category: value})}
              >
                <SelectTrigger id="new-category">
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
              <Label htmlFor="new-image">Image URL</Label>
              <Input 
                id="new-image" 
                value={newProject.image} 
                onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-link">Project Link</Label>
              <Input 
                id="new-link" 
                value={newProject.link} 
                onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                placeholder="https://example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-description">Description</Label>
              <Textarea 
                id="new-description" 
                value={newProject.description} 
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-technologies">Technologies (comma separated)</Label>
              <Input 
                id="new-technologies" 
                value={typeof newProject.technologies === 'string' ? newProject.technologies : newProject.technologies?.join(', ')} 
                onChange={(e) => handleTechChange(e.target.value)}
                placeholder="React, Node.js, MongoDB"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button onClick={addProject}>Add Project</Button>
          </CardFooter>
        </Card>
      )}
      
      {editingProject && (
        <Card id="edit-form" className="mb-6">
          <CardHeader>
            <CardTitle>Edit Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Project Title</Label>
              <Input 
                id="edit-title" 
                value={editingProject.title} 
                onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select 
                value={editingProject.category} 
                onValueChange={(value) => setEditingProject({...editingProject, category: value})}
              >
                <SelectTrigger id="edit-category">
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
      {!loading && !error && projects.length > 0 && (
        <div className="grid grid-cols-1 gap-4" id="project-list">
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
                  <p className="text-sm text-gray-500 mb-2">Category: {project.category}</p>
                  <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                  <div className="mb-2">
                    <span className="text-sm font-medium">Project Link: </span>
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
      )}
      
      {/* Empty State */}
      {!loading && !error && projects.length === 0 && (
        <div className="text-center p-12 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No projects found</p>
          <Button onClick={() => setShowAddForm(true)} variant="outline">
            Add Your First Project
          </Button>
        </div>
      )}
    </div>
  );
};
