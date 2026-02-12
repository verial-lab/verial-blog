import type { MDXComponents } from 'mdx/types';
import defaultComponents from 'fumadocs-ui/mdx';
import { GlossaryTerm } from '@/components/GlossaryTerm';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    GlossaryTerm,
    ...components,
  };
}
