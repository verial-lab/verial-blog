import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { frameworkSource } from '@/lib/source';

export default function FrameworkLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={frameworkSource.pageTree}>
      {children}
    </DocsLayout>
  );
}
