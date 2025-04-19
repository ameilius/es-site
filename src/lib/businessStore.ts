'use server';

import { Business } from '@/types/business';
import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src/data');

const ensureUniqueBusiness = async (business: Business) => {
  const businesses = await getBusinesses();
  if (!business.id) {
    business.id = Date.now().toString();
  }
  return business;
};

export const addBusiness = async (business: Business) => {
  const validatedBusiness = await ensureUniqueBusiness(business);
  const businesses = await getBusinesses();
  businesses.push(validatedBusiness);
  await fs.writeFile(
    path.join(dataDir, 'businesses.json'),
    JSON.stringify(businesses, null, 2)
  );
  return validatedBusiness;
};

export const getBusinesses = async (): Promise<Business[]> => {
  try {
    const data = await fs.readFile(path.join(dataDir, 'businesses.json'), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const clearBusinesses = async () => {
  await fs.writeFile(path.join(dataDir, 'businesses.json'), '[]');
};
const dataFilePath = path.join(dataDir, 'businesses.json');

// Initialize businesses array
let businesses: Business[] = [];

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Load businesses from file
async function loadBusinesses() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(dataFilePath, 'utf-8');
    businesses = JSON.parse(data);
    console.log('Loaded businesses from file:', businesses);
  } catch (error) {
    console.error('Error loading businesses from file:', error);
    // If file doesn't exist, create it with empty array
    await fs.writeFile(dataFilePath, '[]');
  }
}

// Save businesses to file
async function saveBusinesses() {
  try {
    await ensureDataDir();
    await fs.writeFile(dataFilePath, JSON.stringify(businesses, null, 2));
    console.log('Saved businesses to file');
  } catch (error) {
    console.error('Error saving businesses to file:', error);
  }
}

// Load businesses on module initialization
loadBusinesses();

export async function getBusinesses(): Promise<Business[]> {
  await loadBusinesses();
  return businesses;
}

export async function addBusiness(business: Business): Promise<void> {
  await loadBusinesses();
  businesses.push(business);
  await saveBusinesses();
}

export async function clearBusinesses(): Promise<void> {
  businesses = [];
  await saveBusinesses();
} 