import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { essaySource } from '@/lib/source';

export default function EssaysLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={essaySource.pageTree}>
      {children}
    </DocsLayout>
  );
}
