import fs from 'fs';
import path from 'path';
import { Project } from '@/types/project';
import { INITIAL_PROJECTS } from '@/data/initialProjects';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'projects.json');

export function readProjectsFromFile(): Project[] {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      const dir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(INITIAL_PROJECTS, null, 2), 'utf8');
      return INITIAL_PROJECTS;
    }
    const content = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.error('Error reading projects from local file storage:', error);
  }
  return INITIAL_PROJECTS;
}

export function writeProjectsToFile(projects: Project[]): void {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(projects, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing projects to local file storage:', error);
  }
}
