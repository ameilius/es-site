import { Business } from '@/types/business';
import fs from 'fs/promises';
import path from 'path';

export async function readBusinesses(): Promise<Business[]> {
  const filePath = path.join(process.cwd(), 'data', 'businesses.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data) as Business[];
} 