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
    // ignore json parse or localStorage issues
  }

  // initialize with initial projects
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
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

// Fetch all projects with priority: Supabase -> localStorage -> INITIAL_PROJECTS
export async function fetchAllProjects(): Promise<{ projects: Project[]; source: 'supabase' | 'local' }> {
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
      // Supabase fetch failed or table doesn't exist yet, continue to fallback
    }
  }

  return { projects: getLocalProjects(), source: 'local' };
}

// Fetch single project by slug
export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
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
      // fallback to local lookup
    }
  }

  const local = getLocalProjects();
  return local.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
}

// Create new project
export async function createProject(input: ProjectInput): Promise<{ project: Project; success: boolean; error?: string }> {
  const newId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `proj-${Date.now()}`;
  const now = new Date().toISOString();

  const newProject: Project = {
    ...input,
    id: newId,
    created_at: now,
    updated_at: now
  };

  let savedToSupabase = false;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            id: newProject.id,
            title: newProject.title,
            slug: newProject.slug,
            image: newProject.image,
            description: newProject.description,
            category: newProject.category,
            project_url: newProject.project_url,
            technologies: newProject.technologies,
            featured: newProject.featured,
            case_study: newProject.case_study,
            created_at: newProject.created_at,
            updated_at: newProject.updated_at
          }
        ])
        .select()
        .single();

      if (!error && data) {
        savedToSupabase = true;
      }
    } catch {
      // supabase insert error
    }
  }

  // Update local storage copy
  const existing = getLocalProjects();
  const updated = [newProject, ...existing.filter((p) => p.id !== newProject.id && p.slug !== newProject.slug)];
  saveLocalProjects(updated);

  return { project: newProject, success: true };
}

// Update existing project
export async function updateProject(id: string, input: Partial<ProjectInput>): Promise<{ project: Project | null; success: boolean }> {
  const existing = getLocalProjects();
  const index = existing.findIndex((p) => p.id === id);
  if (index === -1) return { project: null, success: false };

  const updatedProject: Project = {
    ...existing[index],
    ...input,
    updated_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('projects')
        .update({
          title: updatedProject.title,
          slug: updatedProject.slug,
          image: updatedProject.image,
          description: updatedProject.description,
          category: updatedProject.category,
          project_url: updatedProject.project_url,
          technologies: updatedProject.technologies,
          featured: updatedProject.featured,
          case_study: updatedProject.case_study,
          updated_at: updatedProject.updated_at
        })
        .eq('id', id);
    } catch {
      // ignore
    }
  }

  existing[index] = updatedProject;
  saveLocalProjects(existing);

  return { project: updatedProject, success: true };
}

// Delete project
export async function deleteProject(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch {
      // ignore
    }
  }

  const existing = getLocalProjects();
  const filtered = existing.filter((p) => p.id !== id);
  saveLocalProjects(filtered);
  return true;
}

// Upload project image to Supabase Storage bucket 'project-images' or convert to local data URL
export async function uploadProjectImage(file: File): Promise<string> {
  if (isSupabaseConfigured && supabase) {
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (!uploadError) {
        const { data } = supabase.storage
          .from('project-images')
          .getPublicUrl(filePath);

        if (data?.publicUrl) {
          return data.publicUrl;
        }
      }
    } catch {
      // fallback to reader
    }
  }

  // Fallback to Data URL for instant offline or preview support
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
