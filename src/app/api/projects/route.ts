import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { Project, ProjectInput } from '@/types/project';
import { readProjectsFromFile, writeProjectsToFile } from '@/lib/serverProjectStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const projects = readProjectsFromFile();
    return NextResponse.json(
      { projects, source: 'server_file' },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read projects from server file' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ProjectInput = await request.json();

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    const projects = readProjectsFromFile();

    // Check if slug already exists
    const slugExists = projects.some(
      (p) => p.slug.toLowerCase() === body.slug.toLowerCase()
    );

    const cleanSlug = slugExists
      ? `${body.slug.toLowerCase()}-${Date.now().toString(36)}`
      : body.slug.toLowerCase();

    const newProject: Project = {
      ...body,
      id: crypto.randomUUID ? crypto.randomUUID() : `proj-${Date.now()}`,
      slug: cleanSlug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const updatedProjects = [newProject, ...projects];
    writeProjectsToFile(updatedProjects);

    try {
      revalidatePath('/');
      revalidatePath('/projects', 'layout');
    } catch {
      // ignore
    }

    return NextResponse.json({ project: newProject, success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project on server' },
      { status: 500 }
    );
  }
}
