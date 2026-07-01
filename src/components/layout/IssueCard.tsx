import { MessageCircle, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export type IssueCardProps = {
  id: string;
  repo: string;
  title: string;
  description: string;
  tags: string[];
  updated: string;
  comments: number;
};

const tagStyles: Record<string, string> = {
  'Good First Issue': 'bg-ctp-teal/15 text-ctp-teal border-ctp-teal/30',
  TypeScript: 'bg-ctp-blue/15 text-ctp-blue border-ctp-blue/30',
  Rust: 'bg-ctp-peach/15 text-ctp-peach border-ctp-peach/30',
  Bug: 'bg-ctp-red/15 text-ctp-red border-ctp-red/30',
  Docs: 'bg-ctp-green/15 text-ctp-green border-ctp-green/30',
  'Help Wanted': 'bg-ctp-mauve/15 text-ctp-mauve border-ctp-mauve/30',
};

import { cn } from '@/lib/utils';

export function IssueCard({ repo, title, description, tags, updated, comments }: IssueCardProps) {
  return (
    <Card className="group flex h-full flex-col font-[var(--font-readable)]">
      <CardHeader>
        <p className="text-muted-foreground group-hover:text-ctp-mauve/80 text-xs font-semibold tracking-wide transition-colors">
          {repo}
        </p>
        <CardTitle className="group-hover:text-foreground transition-colors">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground/80 text-sm leading-relaxed">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className={cn(
                'cursor-default transition-all duration-300 hover:-translate-y-0.5 hover:scale-105',
                tagStyles[tag] ?? '',
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground/70 border-border/20 flex-wrap gap-2 border-t pt-4 text-xs">
        <span>{updated}</span>
        <div className="flex items-center gap-4">
          <span className="hover:text-ctp-mauve flex cursor-pointer items-center gap-1.5 transition-colors">
            <MessageCircle className="h-3.5 w-3.5 transition-transform duration-300 hover:scale-125" />
            {comments}
          </span>
          <span className="hover:text-ctp-yellow flex cursor-pointer items-center gap-1.5 transition-colors">
            <Star className="h-3.5 w-3.5 transition-transform duration-300 hover:scale-125" />
            Save
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
