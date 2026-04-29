import { MessageCircle, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export type IssueCardProps = {
  repo: string;
  title: string;
  description: string;
  tags: string[];
  updated: string;
  comments: number;
};

const tagStyles: Record<string, string> = {
  'Good First Issue': 'bg-sky-500/15 text-sky-200 border-sky-500/30',
  TypeScript: 'bg-indigo-500/15 text-indigo-200 border-indigo-500/30',
  Rust: 'bg-orange-500/15 text-orange-200 border-orange-500/30',
  Bug: 'bg-rose-500/15 text-rose-200 border-rose-500/30',
  Docs: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30',
  'Help Wanted': 'bg-violet-500/15 text-violet-200 border-violet-500/30',
};

export function IssueCard({ repo, title, description, tags, updated, comments }: IssueCardProps) {
  return (
    <Card className="flex h-full flex-col font-[var(--font-readable)]">
      <CardHeader>
        <p className="text-muted-foreground text-xs">{repo}</p>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground text-sm">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} className={tagStyles[tag] ?? ''}>
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-xs">
        <span>{updated}</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            {comments}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5" />
            Save
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
