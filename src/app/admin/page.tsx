'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  Upload, 
  Search, 
  ExternalLink, 
  Check, 
  X, 
  RefreshCw, 
  Database, 
  ArrowLeft,
  Eye,
  Sliders
} from 'lucide-react';
import { Project, ProjectCategory, ProjectInput } from '@/types/project';
import { 
  fetchAllProjects, 
  createProject, 
  updateProject, 
  deleteProject, 
  uploadProjectImage 
} from '@/lib/projectService';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [dataSource, setDataSource] = useState<'supabase' | 'local'>('local');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Form State
  const [formData, setFormData] = useState<ProjectInput>({
    title: '',
    slug: '',
    image: '',
    description: '',
    category: 'AI Solution',
    project_url: '',
    technologies: [],
    featured: false,
    case_study: {
      client: '',
      timeline: '',
      challenge: '',
      solution: '',
      results: [],
      metrics: [],
      isDemo: true
    }
  });

  const [techInput, setTechInput] = useState('');
  const [resultsInput, setResultsInput] = useState('');

  const validPin = process.env.NEXT_PUBLIC_ADMIN_PIN || 'inalabs2026';

  // Check existing session
  useEffect(() => {
    const session = sessionStorage.getItem('inalabs_admin_auth');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchAllProjects();
      setProjects(res.projects);
      setDataSource(res.source);
    } catch {
      // error handled
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === validPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('inalabs_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid Admin Access Passcode. Default: inalabs2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('inalabs_admin_auth');
  };

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
      description: '',
      category: 'AI Solution',
      project_url: 'https://inalabs.id',
      technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS'],
      featured: false,
      case_study: {
        client: 'Inalabs Enterprise Partner',
        timeline: '8 Weeks',
        challenge: 'Legacy system performance constraints and slow operational turnaround.',
        solution: 'Modernized architecture with microservices and automated workflows.',
        results: ['70% faster query processing', 'Sub-second page loads'],
        metrics: [
          { label: 'Latency', value: '-70%' },
          { label: 'Uptime', value: '99.9%' }
        ],
        isDemo: true
      }
    });
    setTechInput('Next.js 15, TypeScript, Tailwind CSS');
    setResultsInput('70% faster query processing\nSub-second page loads');
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (proj: Project) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      slug: proj.slug,
      image: proj.image,
      description: proj.description,
      category: proj.category,
      project_url: proj.project_url || '',
      technologies: proj.technologies,
      featured: proj.featured,
      case_study: proj.case_study || {
        client: '',
        timeline: '',
        challenge: '',
        solution: '',
        results: [],
        metrics: [],
        isDemo: true
      }
    });
    setTechInput(proj.technologies.join(', '));
    setResultsInput(proj.case_study?.results.join('\n') || '');
    setIsModalOpen(true);
  };

  // Title change with auto slug generator
  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingProject ? prev.slug : slug
    }));
  };

  // Image Upload handler
  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadProjectImage(file);
      setFormData((prev) => ({ ...prev, image: url }));
    } catch {
      alert('Failed to upload image. Please enter an image URL manually.');
    } finally {
      setIsUploading(false);
    }
  };

  // Submit Create or Edit
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();

    const techs = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const results = resultsInput
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const finalPayload: ProjectInput = {
      ...formData,
      technologies: techs,
      case_study: {
        ...formData.case_study!,
        results: results
      }
    };

    if (editingProject) {
      await updateProject(editingProject.id, finalPayload);
      setActionSuccess(`Updated "${finalPayload.title}" successfully!`);
    } else {
      await createProject(finalPayload);
      setActionSuccess(`Created "${finalPayload.title}" successfully!`);
    }

    setIsModalOpen(false);
    loadData();
    setTimeout(() => setActionSuccess(''), 4000);
  };

  // Delete project
  const handleDelete = async (proj: Project) => {
    if (confirm(`Are you sure you want to delete "${proj.title}"?`)) {
      await deleteProject(proj.id);
      loadData();
      setActionSuccess(`Project "${proj.title}" deleted.`);
      setTimeout(() => setActionSuccess(''), 4000);
    }
  };

  // Toggle Featured
  const handleToggleFeatured = async (proj: Project) => {
    await updateProject(proj.id, { featured: !proj.featured });
    loadData();
  };

  // Filtered List
  const filtered = projects.filter((p) => {
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchQuery =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  // If not authenticated, render login gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pt-24 relative">
        <div className="w-full max-w-md rounded-2xl p-[1px] bg-gradient-to-b from-blue-500/40 via-purple-500/20 to-transparent shadow-2xl">
          <div className="rounded-[15px] bg-[#090912]/95 backdrop-blur-2xl p-8 border border-white/[0.08]">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 text-cyan-400 flex items-center justify-center mb-6 mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <h2 className="text-2xl font-bold text-white text-center font-display mb-2">
              Inalabs CMS Portal
            </h2>

            <p className="text-xs text-gray-400 text-center mb-8">
              Authenticate with administrative credentials to manage dynamic projects and media storage.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">
                  Admin Passcode (Default: inalabs2026)
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-cyan-500 focus:outline-none text-white text-sm"
                  autoFocus
                />
              </div>

              {authError && (
                <p className="text-xs text-red-400 font-mono">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all"
              >
                Access CMS Portal
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/[0.06] text-center">
              <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">
                &larr; Return to Public Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>AUTHENTICATED CMS CONTROL ROOM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Inalabs Project Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs text-gray-300 hover:text-white border border-white/[0.08]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </Link>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-semibold text-white shadow-lg shadow-blue-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-xl border border-white/[0.08] text-xs text-gray-400 hover:text-red-400"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {actionSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess('')} className="text-gray-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-xl glass-panel border border-white/[0.06]">
          <p className="text-xs font-mono text-gray-400">Total Projects</p>
          <p className="text-2xl font-bold text-white font-display mt-1">{projects.length}</p>
        </div>
        <div className="p-5 rounded-xl glass-panel border border-white/[0.06]">
          <p className="text-xs font-mono text-gray-400">Featured Showcase</p>
          <p className="text-2xl font-bold text-cyan-400 font-display mt-1">
            {projects.filter((p) => p.featured).length}
          </p>
        </div>
        <div className="p-5 rounded-xl glass-panel border border-white/[0.06]">
          <p className="text-xs font-mono text-gray-400">Database Engine</p>
          <p className="text-sm font-bold text-emerald-400 font-mono mt-2 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5" />
            <span>{dataSource === 'supabase' ? 'Supabase Live' : 'Local / Offline Sync'}</span>
          </p>
        </div>
        <div className="p-5 rounded-xl glass-panel border border-white/[0.06]">
          <p className="text-xs font-mono text-gray-400">Storage Bucket</p>
          <p className="text-sm font-bold text-purple-400 font-mono mt-2">
            {isSupabaseConfigured ? 'project-images' : 'DataURI / Local'}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#0d0d18] border border-white/[0.08] text-xs text-white focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Tools Automation">Tools Automation</option>
            <option value="Web Company Profile">Web Company Profile</option>
            <option value="Design Graphic">Design Graphic</option>
            <option value="Content AI">Content AI</option>
            <option value="AI Systems">AI Systems</option>
            <option value="AI Solution">AI Solution</option>
            <option value="Website Development">Website Development</option>
            <option value="Mobile Application">Mobile Application</option>
            <option value="Custom Software">Custom Software</option>
            <option value="Digital Platform">Digital Platform</option>
            <option value="Engineering">Engineering</option>
            <option value="Branding">Branding</option>
          </select>

          <button
            onClick={loadData}
            className="p-2 rounded-xl bg-white/[0.04] text-gray-300 hover:text-white border border-white/[0.08]"
            title="Reload projects"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl glass-panel border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/[0.06] text-gray-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Image</th>
                <th className="py-3.5 px-4">Title & Slug</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Tech Stack</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((proj) => (
                <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-[#0e0e18]">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <p className="font-semibold text-white font-display line-clamp-1">{proj.title}</p>
                    <p className="font-mono text-[10px] text-gray-400 line-clamp-1">/{proj.slug}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40 text-cyan-300 font-mono text-[10px]">
                      {proj.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-[200px]">
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.slice(0, 2).map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-white/[0.03] text-gray-300 text-[10px] font-mono">
                          {t}
                        </span>
                      ))}
                      {proj.technologies.length > 2 && (
                        <span className="text-[10px] text-gray-500 font-mono">+{proj.technologies.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggleFeatured(proj)}
                      className={`p-1.5 rounded-lg border ${
                        proj.featured
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                          : 'bg-white/[0.02] border-white/[0.06] text-gray-600 hover:text-gray-400'
                      }`}
                      title={proj.featured ? 'Remove featured' : 'Mark featured'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/projects/${proj.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg hover:bg-white/[0.06] text-gray-400 hover:text-white"
                        title="View case study page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 rounded-lg hover:bg-white/[0.06] text-cyan-400 hover:text-cyan-300"
                        title="Edit project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj)}
                        className="p-1.5 rounded-lg hover:bg-white/[0.06] text-red-400 hover:text-red-300"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 rounded-2xl glass-panel border border-cyan-500/30 p-6 sm:p-8 bg-[#090914] shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <h3 className="text-xl font-bold text-white font-display">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Inalabs AI Orchestrator"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">
                    Slug (URL identifier) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="inalabs-ai-orchestrator"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0d0d18] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Tools Automation">Tools Automation</option>
                    <option value="Web Company Profile">Web Company Profile</option>
                    <option value="Design Graphic">Design Graphic</option>
                    <option value="Content AI">Content AI</option>
                    <option value="AI Systems">AI Systems</option>
                    <option value="AI Solution">AI Solution</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Mobile Application">Mobile Application</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="Digital Platform">Digital Platform</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Branding">Branding</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">
                    External / Live URL
                  </label>
                  <input
                    type="url"
                    value={formData.project_url}
                    onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                    placeholder="https://client-domain.com"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Image Upload / 1:1 Aspect Ratio Preview */}
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">
                  1:1 Square Project Image (Storage or URL) *
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/10 bg-[#0c0c16] shrink-0">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-600 font-mono">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-cyan-300 cursor-pointer border border-white/[0.08]">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? 'Uploading to Bucket...' : 'Upload Image File'}</span>
                      <input type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">
                  Overview Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of the project..."
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">
                  Technologies (Comma Separated)
                </label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Next.js 15, Python, PostgreSQL, Docker"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Case Study Details Section */}
              <div className="pt-4 border-t border-white/[0.08] space-y-4">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Case Study Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">Client Name / Partner</label>
                    <input
                      type="text"
                      value={formData.case_study?.client || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          case_study: { ...formData.case_study!, client: e.target.value }
                        })
                      }
                      placeholder="e.g. Inalabs Showcase"
                      className="w-full px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">Timeline</label>
                    <input
                      type="text"
                      value={formData.case_study?.timeline || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          case_study: { ...formData.case_study!, timeline: e.target.value }
                        })
                      }
                      placeholder="e.g. 10 Weeks"
                      className="w-full px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">The Challenge</label>
                  <textarea
                    rows={2}
                    value={formData.case_study?.challenge || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        case_study: { ...formData.case_study!, challenge: e.target.value }
                      })
                    }
                    placeholder="Describe problem statement..."
                    className="w-full px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">The Solution</label>
                  <textarea
                    rows={2}
                    value={formData.case_study?.solution || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        case_study: { ...formData.case_study!, solution: e.target.value }
                      })
                    }
                    placeholder="Describe technical implementation..."
                    className="w-full px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Results (One per line)</label>
                  <textarea
                    rows={2}
                    value={resultsInput}
                    onChange={(e) => setResultsInput(e.target.value)}
                    placeholder="Metric 1&#10;Metric 2"
                    className="w-full px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-transparent border-gray-600"
                />
                <label htmlFor="featured-checkbox" className="text-xs text-gray-300 font-mono">
                  Highlight as Featured Project on Homepage banner
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30"
                >
                  {editingProject ? 'Save Changes' : 'Publish Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
