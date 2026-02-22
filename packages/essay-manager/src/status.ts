import { readFileSync, writeFileSync } from 'node:fs';
import type { StatusMap, SectionStatus } from './types.js';

export function readStatus(path: string): StatusMap {
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as StatusMap;
  } catch {
    return {};
  }
}

export function writeStatus(path: string, status: StatusMap): void {
  writeFileSync(path, JSON.stringify(status, null, 2) + '\n');
}

export function updateSectionStatus(
  path: string,
  sectionId: string,
  newStatus: SectionStatus
): StatusMap {
  const status = readStatus(path);
  status[sectionId] = newStatus;
  writeStatus(path, status);
  return status;
}

/**
 * Initialize status.json from a list of section IDs, setting all to 'draft'.
 * Does not overwrite existing entries.
 */
export function initStatus(path: string, sectionIds: string[]): StatusMap {
  const status = readStatus(path);
  for (const id of sectionIds) {
    if (!(id in status)) {
      status[id] = 'draft';
    }
  }
  writeStatus(path, status);
  return status;
}
