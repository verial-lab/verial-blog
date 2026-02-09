import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { noteSource } from '@/lib/source';

export default function NotesLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={noteSource.pageTree}>
      {children}
    </DocsLayout>
  );
}
