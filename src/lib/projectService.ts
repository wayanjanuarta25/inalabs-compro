import { Project, ProjectInput } from '@/types/project';
import { INITIAL_PROJECTS } from '@/data/initialProjects';
import { supabase, isSupabaseConfigured } from './supabase';

const LOCAL_STORAGE_KEY = 'inalabs_projects_cache_v1';

// Helper to get local projects from browser storage or fallback
export function getLocalProjects(): Project[] {
  if (typeof window === 'undefined') {
    return INITIAL_PROJECTS;
  }

  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  return INITIAL_PROJECTS;
}

export function saveLocalProjects(projects: Project[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event('inalabs_projects_updated'));
  } catch {
    // ignore storage quota error
  }
}

// Fetch all projects with priority: Supabase -> Server File / API -> localStorage -> INITIAL_PROJECTS
export async function fetchAllProjects(): Promise<{ projects: Project[]; source: 'supabase' | 'server' | 'local' }> {
  // 1. Check Supabase if explicitly configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mappedProjects: Project[] = data.map((item) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          image: item.image,
          description: item.description,
          category: item.category,
          project_url: item.project_url || '',
          technologies: Array.isArray(item.technologies) ? item.technologies : [],
          featured: Boolean(item.featured),
          created_at: item.created_at,
          updated_at: item.updated_at,
          case_study: item.case_study || undefined
        }));

        saveLocalProjects(mappedProjects);
        return { projects: mappedProjects, source: 'supabase' };
      }
    } catch {
      // Continue to local file / API
    }
  }

  // 2. On server side (Node.js): read directly from src/data/projects.json
  if (typeof window === 'undefined') {
    try {
      const { readProjectsFromFile } = await import('@/lib/serverProjectStore');
      const serverProjects = readProjectsFromFile();
      return { projects: serverProjects, source: 'server' };
    } catch {
      return { projects: INITIAL_PROJECTS, source: 'local' };
    }
  }

  // 3. On client side: fetch from /api/projects
  try {
    const res = await fetch('/api/projects', { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.projects) && json.projects.length > 0) {
        saveLocalProjects(json.projects);
        return { projects: json.projects, source: 'server' };
      }
    }
  } catch {
    // Continue to localStorage
  }

  return { projects: getLocalProjects(), source: 'local' };
}

// Fetch single project by slug
export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  // 1. Check Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          image: data.image,
          description: data.description,
          category: data.category,
          project_url: data.project_url || '',
          technologies: Array.isArray(data.technologies) ? data.technologies : [],
          featured: Boolean(data.featured),
          created_at: data.created_at,
          updated_at: data.updated_at,
          case_study: data.case_study || undefined
        };
      }
    } catch {
      // Continue to local file lookup
    }
  }

  // 2. On server side: read directly from src/data/projects.json
  if (typeof window === 'undefined') {
    try {
      const { readProjectsFromFile } = await import('@/lib/serverProjectStore');
      const serverProjects = readProjectsFromFile();
      const found = serverProjects.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
      if (found) return found;
    } catch {
      // Continue to INITIAL_PROJECTS
    }
    return INITIAL_PROJECTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
  }

  // 3. On client side: check cache then fallback
  const local = getLocalProjects();
  return local.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
}

// Create new project
export async function createProject(input: ProjectInput): Promise<{ project: Project; success: boolean; error?: string }> {
  // 1. If in browser, save via API route to persist on server file
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.project) {
          const existing = getLocalProjects();
          const updated = [json.project, ...existing.filter((p) => p.id !== json.project.id && p.slug !== json.project.slug)];
          saveLocalProjects(updated);
          return { project: json.project, success: true };
        }
      }
    } catch (err) {
      console.warn('API POST /api/projects error, falling back to local cache', err);
    }
  }

  // 2. Direct server save (if executed in server environment)
  const newId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `proj-${Date.now()}`;
  const now = new Date().toISOString();

  const newProject: Project = {
    ...input,
    id: newId,
    created_at: now,
    updated_at: now
  };

  if (typeof window === 'undefined') {
    try {
      const { readProjectsFromFile, writeProjectsToFile } = await import('@/lib/serverProjectStore');
      const projects = readProjectsFromFile();
      writeProjectsToFile([newProject, ...projects]);
      return { project: newProject, success: true };
    } catch {
      // fallback
    }
  }

  // 3. Local storage fallback
  const existing = getLocalProjects();
  const updated = [newProject, ...existing.filter((p) => p.id !== newProject.id && p.slug !== newProject.slug)];
  saveLocalProjects(updated);

  return { project: newProject, success: true };
}

// Update existing project
export async function updateProject(id: string, input: Partial<ProjectInput>): Promise<{ project: Project | null; success: boolean }> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.project) {
          const existing = getLocalProjects();
          const idx = existing.findIndex((p) => p.id === id);
          if (idx !== -1) {
            existing[idx] = json.project;
            saveLocalProjects(existing);
          }
          return { project: json.project, success: true };
        }
      }
    } catch {
      // ignore
    }
  }

  const existing = getLocalProjects();
  const index = existing.findIndex((p) => p.id === id);
  if (index === -1) return { project: null, success: false };

  const updatedProject: Project = {
    ...existing[index],
    ...input,
    updated_at: new Date().toISOString()
  };

  existing[index] = updatedProject;
  saveLocalProjects(existing);

  return { project: updatedProject, success: true };
}

// Delete project
export async function deleteProject(id: string): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      });
    } catch {
      // ignore
    }
  }

  const existing = getLocalProjects();
  const filtered = existing.filter((p) => p.id !== id);
  saveLocalProjects(filtered);
  return true;
}

// Upload project image to server file storage or fallback
export async function uploadProjectImage(file: File): Promise<string> {
  // 1. Try local server upload endpoint /api/upload
  if (typeof window !== 'undefined') {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const json = await res.json();
        if (json.url) {
          return json.url;
        }
      }
    } catch (err) {
      console.warn('Local /api/upload failed, falling back to data URL', err);
    }
  }

  // 2. Fallback to Data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
