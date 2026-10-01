import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { ProjectInput } from '@/types/project';
import { readProjectsFromFile, writeProjectsToFile } from '@/lib/serverProjectStore';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body: Partial<ProjectInput> = await request.json();

    const projects = readProjectsFromFile();
    const index = projects.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const updatedProject = {
      ...projects[index],
      ...body,
      updated_at: new Date().toISOString()
    };

    projects[index] = updatedProject;
    writeProjectsToFile(projects);

    try {
      revalidatePath('/');
      revalidatePath(`/projects/${updatedProject.slug}`);
      revalidatePath('/projects', 'layout');
    } catch {
      // ignore
    }

    return NextResponse.json({ project: updatedProject, success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const projects = readProjectsFromFile();
    const filtered = projects.filter((p) => p.id !== id);

    writeProjectsToFile(filtered);

    try {
      revalidatePath('/');
      revalidatePath('/projects', 'layout');
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
