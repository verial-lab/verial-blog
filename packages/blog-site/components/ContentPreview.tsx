import Link from 'next/link';

interface ContentPreviewProps {
  title: string;
  description: string;
  href: string;
  badge?: string;
}

export function ContentPreview({ title, description, href, badge }: ContentPreviewProps) {
  return (
    <Link href={href} className="group">
      <div className="border border-border rounded-lg p-6 h-full hover:border-border/50 transition-all duration-200 bg-muted/10 hover:bg-muted/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-serif font-semibold group-hover:text-primary transition-colors">
            {title}
          </h3>
          {badge && (
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
              {badge}
            </span>
          )}
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {description}
        </p>
        <span className="text-sm text-primary group-hover:text-primary/80 transition-colors">
          Explore {title.toLowerCase()} →
        </span>
      </div>
    </Link>
  );
}
