import type { MDXComponents } from 'mdx/types';
import defaultComponents from 'fumadocs-ui/mdx';
import { GlossaryTerm } from '@/components/GlossaryTerm';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    GlossaryTerm,
    a: ({ href, children, ...props }) => {
      const isExternal = typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://'));
      return (
        <a
          href={href}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...props}
        >
          {children}
        </a>
      );
    },
    ...components,
  };
}
