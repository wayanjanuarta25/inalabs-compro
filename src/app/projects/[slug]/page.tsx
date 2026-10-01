import React from 'react';
import type { Metadata } from 'next';
import { fetchProjectBySlug, fetchAllProjects } from '@/lib/projectService';
import { INITIAL_PROJECTS } from '@/data/initialProjects';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';
import ProjectClientFallback from '@/components/projects/ProjectClientFallback';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for existing demo projects
export async function generateStaticParams() {
  return INITIAL_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

// Generate dynamic SEO metadata for each project
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Case Study | Inalabs Indonesia',
      description: 'Detail case study digital project Inalabs Indonesia.',
    };
  }

  return {
    title: `${project.title} - Case Study | Inalabs Indonesia`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Inalabs Indonesia Case Study`,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  // If not in server initial data or Supabase, resolve via client fallback (localStorage)
  if (!project) {
    return <ProjectClientFallback slug={slug} />;
  }

  // Fetch all projects for related suggestions
  const { projects: allProjects } = await fetchAllProjects();
  const relatedProjects = allProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <ProjectDetailClient
      project={project}
      relatedProjects={relatedProjects}
    />
  );
}
