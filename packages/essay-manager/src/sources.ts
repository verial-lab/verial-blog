import { readFileSync, writeFileSync } from 'node:fs';
import type { Source, SourcesList } from './types.js';

export function readSources(path: string): SourcesList {
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as SourcesList;
  } catch {
    return [];
  }
}

export function writeSources(path: string, sources: SourcesList): void {
  writeFileSync(path, JSON.stringify(sources, null, 2) + '\n');
}

export function addSource(path: string, source: Source): SourcesList {
  const sources = readSources(path);
  const existing = sources.findIndex((s) => s.id === source.id);
  if (existing >= 0) {
    sources[existing] = source;
  } else {
    sources.push(source);
  }
  writeSources(path, sources);
  return sources;
}

export function updateSourceQuality(
  path: string,
  sourceId: string,
  quality: number
): SourcesList {
  const sources = readSources(path);
  const source = sources.find((s) => s.id === sourceId);
  if (source) {
    source.quality = Math.max(0, Math.min(10, quality));
    writeSources(path, sources);
  }
  return sources;
}

export function linkSourceToSection(
  path: string,
  sourceId: string,
  sectionId: string
): SourcesList {
  const sources = readSources(path);
  const source = sources.find((s) => s.id === sourceId);
  if (source && !source.usedInSections.includes(sectionId)) {
    source.usedInSections.push(sectionId);
    writeSources(path, sources);
  }
  return sources;
}
